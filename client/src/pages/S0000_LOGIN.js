/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0000_LOGIN } from "../service/service_biz/ServiceS0000_LOGIN";
import apolloOption from "../assets/env_graphql";
import { loginRecord } from "../loginRecord";
import axios from "axios";

import "./page_common.scss";
import $ from "jquery";

let userInfo = {};
let tokenExpireDate = 1;
let codeExpireSec = 600;

const isSupportedBrowser = () => {
    const ua = window.navigator.userAgent;
    // 크롬 또는 크로미움 기반 엣지
    const isChrome = /Chrome/.test(ua) && !/Edg|OPR/.test(ua);
    const isEdge = /Edg/.test(ua);
    return isChrome || isEdge;
};

const S0000_LOGIN = () => {
    const [password, setPassword] = useState("");
    const [userid, setUserid] = useState("");
    const [checked, setChecked] = useState(false);
    const passwordInputRef = useRef(null);
    const isLoginInProgressRef = useRef(false);
    const containerClassName = classNames(
        "loginBackground surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
        { "p-input-filled": "filled" },
    );

    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) serviceLibRef.current = new ServiceLib();
    const serviceLib = serviceLibRef.current;
    const serviceS0000_LOGINRef = useRef(null);
    if (!serviceS0000_LOGINRef.current) serviceS0000_LOGINRef.current = new ServiceS0000_LOGIN();
    const serviceS0000_LOGIN = serviceS0000_LOGINRef.current;

    /* 2차 인증 관련 변수 */
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [show2FADialog, setShow2FADialog] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [timeLeft, setTimeLeft] = useState(codeExpireSec);
    const toast = React.useRef(null);
    const apiUrl = `${window.location.protocol}//${window.location.hostname}:${apolloOption.server_port}/restapi`;
    const [menuUrl, setMenuUrl] = useState("");

    const [isBrowserSupported, setIsBrowserSupported] = useState(true);
    const [showBrowserWarning, setShowBrowserWarning] = useState(false);

    async function getPublicIP() {
        const services = [
            {
                url: "https://api64.ipify.org?format=json",
                parser: (res) => res.data.ip,
            },
            {
                url: "https://api.ipify.org?format=json",
                parser: (res) => res.data.ip,
            },
            {
                url: "https://ifconfig.me/all.json",
                parser: (res) => res.data.ip_addr,
            },
            {
                url: "https://ipinfo.io/json",
                parser: (res) => res.data.ip,
            },
            {
                url: "https://checkip.amazonaws.com",
                parser: (res) => res.data.trim(),
            },
        ];

        for (const service of services) {
            try {
                const response = await axios.get(service.url, {
                    timeout: 3000,
                });
                const ip = service.parser(response);

                if (ip) {
                    return ip;
                }
            } catch (err) {}
        }

        console.error("공인 IP 조회 실패");
        return null;
    }
    /********************/

    useEffect(() => {
        // JWT 검증 (로그인 유지)
        axios
            .get(`${apiUrl}/auth-status`, { withCredentials: true })
            .then((res) => setIsAuthenticated(res.data.authenticated))
            .catch(() => setIsAuthenticated(false));

        if (!isSupportedBrowser()) {
            setIsBrowserSupported(false);
            setShowBrowserWarning(true);
        }
    }, []);

    useEffect(() => {
        if (!show2FADialog) {
            setTimeLeft(codeExpireSec); // 다이얼로그가 닫힐 때 초기화
            setCode("");
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup
    }, [show2FADialog]);

    // 초를 MM:SS 형식으로 변환
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    const handleLogin = async (email, tUserInfo) => {
        if (isAuthenticated) {
            console.log("-----------isAuthenticated", isAuthenticated);
            goMenu();
            return;
        }

        const res = await axios.post(
            `${apiUrl}/check-ip`,
            { email, clientIp: await getPublicIP() },
            { withCredentials: true },
        );

        if (res.data.error) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: `${res.data.error}. Please contact system Admin.`,
            });
            return;
        }

        if (res.data.authenticated) {
            setIsAuthenticated(true);
            // 클라이언트 IP 확인 후 신뢰할 수 있는 IP이면 토큰발급후 바로 삭제 및 메뉴로 이동
            serviceLib.setCookie("token", res.data.token, -1);
            goMenu();
        } else if (res.data.requires2FA) {
            setCode("");
            setShow2FADialog(true);
        }
    };

    const handleVerify2FA = async () => {
        try {
            const res = await axios.post(
                `${apiUrl}/verify-2fa`,
                { email, code },
                { withCredentials: true },
            );
            if (res.data.authenticated) {
                setIsAuthenticated(true);
                serviceLib.setCookie("token", res.data.token, tokenExpireDate);
                setCode("");
                setShow2FADialog(false);
                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "2FA Verified",
                });
                goMenu();
            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Invalid Code",
                });
            }
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Invalid Code",
            });
        }
    };

    const goMenu = () => {
        loginRecord(window, apolloOption, userInfo.USER_ID);
        window.location.href = `${window.location.protocol}//${window.location.hostname}:${apolloOption.menu_port}/#/?userId=${userInfo.USER_ID}`;
    };

    const searchTBL_KCD_USER = async () => {
        if (isLoginInProgressRef.current) return;
        isLoginInProgressRef.current = true;

        var tInObj = {};
        tInObj.USER_ID = userid;
        tInObj.PASSWD = password;

        try {
            const data = await serviceS0000_LOGIN.mgrQuery_USER_CHECK(tInObj);

            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    window.sessionStorage.setItem(
                        "AF_ERP_USERINFO",
                        JSON.stringify(data[0], null, 4),
                    );
                    serviceLib.setCookie(
                        `AF_ERP_USERINFO_${data[0].USER_ID}`,
                        JSON.stringify({
                            USER_ID: data[0].USER_ID,
                            USER_NAME: data[0].USER_NAME,
                        }),
                        7,
                    );

                    let tUserInfo = { ...data[0] };
                    console.log("tUserInfo => ", tUserInfo);
                    userInfo = tUserInfo;
                    setEmail(tUserInfo.EMAIL);

                    // 2차인증
                    if (userid === "won21kr" || userid === "chibumy") {
                        goMenu();
                    } else {
                        await handleLogin(tUserInfo.EMAIL);
                    }
                } else {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Login failed",
                    });
                }
            } else {
                console.log(
                    "ServiceNawooAll.mgrQueryTBL_KCD_USER()error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        } finally {
            isLoginInProgressRef.current = false;
        }
    };

    const onPasswordKeyDown = (e) => {
        if (e.key === "Enter" && isBrowserSupported) {
            e.preventDefault();
            e.stopPropagation();
            searchTBL_KCD_USER();
        }
    };

    const onUserIdKeyDown = (e) => {
        if (e.key !== "Enter") return;

        e.preventDefault();
        e.stopPropagation();

        if (!isBrowserSupported) return;

        if ((password || "").trim() !== "") {
            searchTBL_KCD_USER();
            return;
        }

        if (passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
    };

    return (
        <div className={containerClassName} style={{ flexDirection: "column" }}>
            <Toast ref={toast} />
            <div className="loginDialog flex flex-column align-items-center justify-content-center">
                <img
                    src={`/images/shints_logo.svg`}
                    className="mb-2 flex-shrink-0"
                    style={{ width: "100px" }}
                />
                <div style={{ padding: "0.3rem" }}>
                    <div
                        className="w-full surface-card py-6 px-5 sm:px-8"
                        style={{}}
                    >
                        <div>
                            <label
                                htmlFor="email1"
                                className="block text-900 text-xl font-medium mb-2"
                            >
                                ID
                            </label>
                            <InputText
                                inputid="email1"
                                type="text"
                                value={userid}
                                onChange={(e) => setUserid(e.target.value)}
                                onKeyDown={onUserIdKeyDown}
                                placeholder="user id"
                                className="w-full md:w-30rem mb-5 text-lg"
                                style={{ padding: "1rem" }}
                            />

                            <label
                                htmlFor="password1"
                                className="block font-medium text-xl mb-2"
                            >
                                PASSWORD
                            </label>
                            <Password
                                inputid="password1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={onPasswordKeyDown}
                                inputRef={passwordInputRef}
                                placeholder="Password"
                                toggleMask
                                className="w-full mb-5"
                                inputClassName="w-full p-3 md:w-30rem text-lg"
                                feedback={false}
                            />
                            <div className="flex align-items-center justify-content-center mb-5 gap-5">
                                <Tooltip
                                    target=".tooltip-span"
                                    style={{
                                        whiteSpace: "pre-line",
                                        textAlign: "center",
                                    }}
                                    content={
                                        "⚠ A 6-digit code for two-factor authentication\nwill be sent to the company email and TEAMS\nunless you have accessed it from outside the company."
                                    }
                                    escape={false}
                                />
                                <span
                                    className="text-center tooltip-span"
                                    style={{
                                        color: "#BF0000",
                                        cursor: "pointer",
                                    }}
                                    data-pr-position="bottom"
                                >
                                    ⚠ 사내에서 접속한 경우가 아니면
                                    <br />
                                    2차 인증을 위한 6자리 코드가 회사메일과
                                    TEAMS로 발송됩니다.
                                </span>
                            </div>
                            <Button
                                disabled={!isBrowserSupported}
                                label="Login"
                                style={{ height: "35px" }}
                                className="loginBtn w-full p-3 text-xl"
                                onClick={searchTBL_KCD_USER}
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
            <p style={{ color: "gray", marginTop: "30px", paddingTop: "10px" }}>
                Copyright © 2025 Shin Textile Solutions Co., Ltd. All Rights
                Reserved.
            </p>

            <Dialog
                header="2FA Required"
                visible={show2FADialog}
                onHide={() => setShow2FADialog(false)}
                style={{ width: "250px" }}
            >
                <div className="text-center">
                    <p className="text-center">Enter the 6-digit code sent to your email</p>
                    <InputText
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={timeLeft === 0} // 시간이 끝나면 입력 불가능
                        style={{
                            width: "50%",
                            marginBottom: "1rem",
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: "600",
                        }}
                    />
                    <p
                        className="text-center"
                        style={{
                            fontSize: "14px",
                            color: timeLeft <= 10 ? "#BF0000" : "black",
                        }}
                    >Time remaining: {formatTime(timeLeft)}</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            label="Verify"
                            onClick={handleVerify2FA}
                            disabled={timeLeft === 0 || code.length !== 6} // 시간이 끝나거나 코드가 6자리가 아닐 때 비활성화
                            style={{ padding: "10px 20px", width: "80%" }}
                        />
                    </div>
                    {timeLeft === 0 && (
                        <p
                            className="text-center mt-3"
                            style={{ fontSize: "12px" }}
                        >Time expired. Please request a new code.</p>
                    )}
                </div>
            </Dialog>

            <Dialog
                header="브라우저 지원 안내"
                visible={showBrowserWarning}
                closable={false}
                draggable={false}
                style={{ width: "400px" }}
                footer={
                    <Button
                        style={{ width: "100px" }}
                        label="확인"
                        onClick={() => setShowBrowserWarning(false)}
                        autoFocus
                    />
                }
            >
                <div
                    className="text-center"
                    style={{
                        fontSize: "12px",
                        color: "#BF0000",
                        lineHeight: "1.6",
                    }}
                >
                    본 시스템은 <b>Chrome</b> 또는 <b>Edge</b> 브라우저만
                    지원합니다.
                    <br />
                    <span style={{ fontSize: "12px", color: "gray" }}>
                        최신 버전의 Chrome 또는 Edge로 접속해 주세요.
                    </span>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0000_LOGIN, comparisonFn);
