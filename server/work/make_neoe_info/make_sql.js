const fs = require('fs');

var tFileName = process.argv[2];

var tTableName = '';
if (tFileName === 'file1.txt') tTableName = 'NEOE_MA_CODEDTL';
if (tFileName === 'file2.txt') tTableName = 'NEOE_MA_EXCHANGE';
if (tFileName === 'file3.txt') tTableName = 'NEOE_FI_MNGD';

var tArray = JSON.parse(fs.readFileSync(tFileName).toString());

tArray.forEach((col, i) => {
    var tKeyArray = Object.keys(col);
    var tCol = '';
    var tValue = '';
    tKeyArray.forEach((col1, i1) => {
        var tVal = col[`${col1}`];
        if (i1 === 0) {
            tCol += `${col1}`;
            tValue += `'${tVal}'`;
        } else {
            tCol += `,${col1}`;
            tValue += `,'${tVal}'`;
        }
    });

    var tSQL = `insert into ${tTableName} (${tCol}) values (${tValue});\r\n`;
    tSQL += 'go\r\n';
    console.log(tSQL);
});
