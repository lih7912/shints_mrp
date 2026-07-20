const fs = require('fs');

var tObj = JSON.parse(fs.readFileSync('./data.json').toString());

fs.writeFileSync(
    'file1.txt',
    JSON.stringify(tObj.data.mgrQuery_neoe_info.MA_CODEDTL, null, 4),
);
fs.writeFileSync(
    'file2.txt',
    JSON.stringify(tObj.data.mgrQuery_neoe_info.MA_EXCHANGE, null, 4),
);
fs.writeFileSync(
    'file3.txt',
    JSON.stringify(tObj.data.mgrQuery_neoe_info.FI_MNGD, null, 4),
);
