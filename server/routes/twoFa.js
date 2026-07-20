const router = require('express').Router;
const axios = require('axios');
const twoFa = router();

/* 2차인증 관련 의존성 */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('./config');

// 미들웨어로 cookie-parser 추가
const cookieParser = require('cookie-parser');
twoFa.use(cookieParser());

const AFLib = require('../src/commlib').default;

/**** 2차 인증 ****/
const JWT_SECRET = 'SHITNSAFROBA';
const TRUSTED_IPS = [
    '112.216.124.138', //본사
    '112.216.62.6', //본사 (erp-test)
    '113.160.211.48', //베트남
    '113.160.211.11', //베트남
    '203.210.192.11', //베트남
    '197.156.72.246', //에티오피아
    '112.220.195.10', //NSR(예정)
    '14.36.163.187', //AFROBA
];
let codeExpireSec = 10; // 10분

const AUTH_CODES = {};
const generateAuthCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString(); // 랜덤 6자리 코드 생성

// JWT 검증 미들웨어
const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.json({ authenticated: false });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.json({ authenticated: false });
        req.user = decoded;
        next();
    });
};

// 클라이언트 IP 확인 후 인증 여부 결정
twoFa.post('/check-ip', async (req, res) => {
    //const clientIp = requestIp.getClientIp(req);
    const clientIp = req.body.clientIp;
    const email = req.body.email;
    console.log('---------- ClientIp', clientIp);

    if (!clientIp) return res.json({ error: 'clientIp is required' });
    if (!email) return res.json({ error: 'Email is required' });

    if (TRUSTED_IPS.includes(clientIp)) {
        // 신뢰할 수 있는 IP이면 바로 JWT 발급
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
        return res.json({ authenticated: true, token: token });
    } else {
        // 2차 인증 필요
        const code = generateAuthCode();
        AUTH_CODES[email] = {
            code,
            expiresAt: Date.now() + codeExpireSec * 60 * 1000,
        };
        sendAuthCode(email, code);
        console.log('---------- Verification code', code);
        return res.json({ requires2FA: true });
    }
});

// 2차 인증 코드 검증
twoFa.post('/verify-2fa', (req, res) => {
    const { email, code } = req.body;
    if (!AUTH_CODES[email] || AUTH_CODES[email].expiresAt < Date.now()) {
        return res.json({ error: 'Code expired or invalid' });
    }

    if (AUTH_CODES[email].code !== code) {
        return res.json({ error: 'Invalid code' });
    }

    delete AUTH_CODES[email];

    // JWT 발급 후 쿠키 저장
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ authenticated: true, token: token });
});

// JWT 인증 여부 확인
twoFa.get('/auth-status', verifyJWT, (req, res) => {
    res.json({ authenticated: true, email: req.user.email });
});

// 이메일로 인증 코드 전송 (pseudo code)
const sendAuthCode = async (email, code) => {
    // 이메일로 보내기
    const transporter = nodemailer.createTransport(config.mailParameter);

    console.log('---------- 2FA for ', email);
    const mailOptions = {
        from: config.mailParameter.auth.user,
        to: email,
        subject: 'Your Authentication Code From SHINTS',
        html: `Your authentication code is: ${code}. It will expire in 10 minutes.`,
    };
    try {
        console.log(mailOptions);
        await transporter.sendMail(mailOptions);
        await AFLib.afSendMailLog({
            ...mailOptions,
            success: '1',
            err_msg: 'SUCCESS',
        });
        console.log('---------- Mail send Success(2FA):', email);
    } catch (e) {
        await AFLib.afSendMailLog({
            ...mailOptions,
            success: '0',
            err_msg: `${e.message}`,
        });
        console.log('---------- Mail send error(2FA):', e.message);
    }

    // TEAMS로도 보내기
    try {
        const response = await axios.post(
            'https://insa.shints.com:4433/send',
            {
                recipientEmail: email.replaceAll(
                    'autostock.co.kr',
                    'shints.com',
                ),
                message: `Your Authentication Code From SHINTS. Your authentication code is: ${code}. It will expire in 10 minutes.`,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log('응답 결과:', response.data);
    } catch (error) {
        console.error(
            '에러 발생:',
            error.response ? error.response.data : error.message,
        );
    }
};

module.exports = twoFa;
