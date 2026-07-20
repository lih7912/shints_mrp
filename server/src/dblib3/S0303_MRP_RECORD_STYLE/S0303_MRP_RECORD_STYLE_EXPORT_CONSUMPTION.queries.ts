// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib';
const { generateUploadURL, upload } = require('../../../routes/s3');
const moment = require('moment');
const path = require('path');
const Excel = require('exceljs');

const rgb = (r, g, b) =>
    `FF${[r, g, b].map((v) => v.toString(16).padStart(2, '0').toUpperCase()).join('')}`;
const BLACK = rgb(0, 0, 0);
const borderThin = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' },
    bottom: { style: 'thin' },
};

function setCell(ws, r, c, val, { align, numFmt, font, border } = {}) {
    const cell = ws.getCell(r, c);
    cell.value = val;
    if (align === 'center')
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
    if (align === 'right')
        cell.alignment = { vertical: 'middle', horizontal: 'right' };
    if (align === 'left')
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
    if (numFmt) cell.numFmt = numFmt;
    if (font) cell.font = font;
    if (border) cell.border = border;
    return cell;
}

function cloneRowStyle(ws, srcRowNum, dstRowNum) {
    const src = ws.getRow(srcRowNum);
    const dst = ws.getRow(dstRowNum);
    dst.height = src.height;
    src.eachCell({ includeEmpty: true }, (sCell, col) => {
        const dCell = ws.getCell(dstRowNum, col);
        // 스타일 deep copy
        dCell.style = JSON.parse(JSON.stringify(sCell.style || {}));
    });
}

const moduleQuery_S0303_EXPORT_CONSUMPTION = {
    Query: {
        mgrQuery_S0303_EXPORT_CONSUMPTION: async (_, args, contextValue) => {
            let styleName = args.data.STYLE_NAME;
            let selectedColor = args.data.COLOR;
            let userInfo = AFLib.getUserInfo(contextValue);
            let styleInfo = await prisma.$queryRaw(
                Prisma.raw(
                    `
                        select
                            a.style_name,
                            c.cd_name,
                            a.bvt_flag,
                            a.style_cd,
                            b.buyer_name,
                            a.buyer_cd
                        from
                            kcd_style a,
                            kcd_buyer b,
                            kcd_code c
                        where
                            a.style_name like '%${styleName}%' escape '['
                            and a.status_cd = '0'
                            and b.buyer_cd = a.buyer_cd
                            and c.cd_group = 'BVT_FLAG'
                            and c.cd_code = a.bvt_flag
                        order by
                            a.style_name
                    `,
                ),
            );

            // 1) 템플릿 로드
            const templatePath = path.join(
                process.cwd(),
                'upload',
                'excel_template',
                'Consumption_request.xlsx',
            );
            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(templatePath);
            const ws = wb.worksheets[0];

            // 2) 헤더 채우기
            const userId = userInfo.USER_ID;
            const buyer = styleInfo[0].buyer_name;
            const style = styleName;
            const color = selectedColor;

            // D6: user, E6: print date(날짜), F4: buyer, G6: color, G2: style
            setCell(ws, 4, 6, userId, {
                align: 'left',
                font: { name: 'Dotum', size: 10, color: { argb: BLACK } },
            });
            setCell(ws, 5, 6, new Date(), {
                align: 'left',
                numFmt: 'yyyy-mm-dd',
            }); // 날짜형식
            setCell(ws, 6, 4, buyer, { align: 'left' });
            ws.getCell('F7').value = color;
            setCell(ws, 7, 2, style, { align: 'left' });

            // 3) 본문 작성
            const startRow = 9;
            let rowIndex = 0;

            // 템플릿의 9행 서식을 샘플로 사용 (첫 데이터 전에 한 번 확보)
            const sampleRowNum = 9;

            const rows = args.grid;
            for (const r of rows) {
                console.log(r);

                const outRow = startRow + rowIndex;

                // 새 데이터 행을 쓰기 전에 템플릿 9행의 스타일을 복제
                if (outRow !== sampleRowNum) {
                    // 행 삽입 (count=0 → 삭제 없음, [] 하나를 넘기면 "빈 행 1개" 삽입)
                    ws.spliceRows(outRow, 0, []);

                    // 방금 삽입된 행(outRow)에 템플릿 9행 스타일을 복제
                    cloneRowStyle(ws, sampleRowNum, outRow);
                }

                // 컬럼 매핑 — 원본 C++:
                //  B: 자재명, C: Color, D: Spec, E: Unit, F: Usage(=Remark)
                const matlName =
                    r.C_COL_MATL_NAME ?? r.MATL_NAME ?? r.matl_name ?? '';
                const mColor = r.C_COL_COLOR ?? r.COLOR ?? r.color ?? '';
                const spec = r.C_COL_SPEC ?? r.SPEC ?? r.spec ?? '';
                const unit = r.C_COL_UNIT ?? r.UNIT ?? r.unit ?? '';
                const usage =
                    r.C_COL_REMARK ?? r.REMARK ?? r.remark ?? r.USAGE ?? '';

                setCell(ws, outRow, 2, matlName, { align: 'left' });
                setCell(ws, outRow, 3, mColor, { align: 'left' });
                setCell(ws, outRow, 4, spec, { align: 'left' });
                setCell(ws, outRow, 5, unit, { align: 'center' });
                setCell(ws, outRow, 6, usage, { align: 'left' });

                // B~F 얇은 테두리
                for (let c = 2; c <= 6; c++)
                    ws.getCell(outRow, c).border = borderThin;

                rowIndex++;
            }

            // 5) 업로드(파일명: 스타일-Consumption_request-USERID-YYYYMMDDHHmmss)
            const nowStr = moment().format('YYYYMMDDHHmmss');
            const tWExcelFile = `${style}-Consumption_request-${userId}-${nowStr}`;

            // 업로드 URL 확보(환경에 따라 프로퍼티명이 다를 수 있어 둘 다 시도)
            const tFileObj = await generateUploadURL();
            const fileURL = tFileObj?.url || tFileObj?.uploadURL;

            return await upload(`${tWExcelFile}.xlsx`, wb, fileURL);
        },
    },
};

export default moduleQuery_S0303_EXPORT_CONSUMPTION;
