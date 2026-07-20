const axios = require('axios');

console.log(process.argv.length);

if (process.argv.length < 4) {
    console.log('arguemnt 갯수가 적습니다:  cd_type appro_key return_code');
}

async function proc1() {
    var tCdType = process.argv[2];
    var tApproKey = process.argv[3];
    var tResultCode = process.argv[4];

    var tUrl = `http://localhost:3202/restapi/return_gw_result/${tCdType}/${tApproKey}/${tResultCode}`;
    const res = await axios.get(tUrl);
    console.log(res);
}

if (process.argv.length >= 4) proc1();
