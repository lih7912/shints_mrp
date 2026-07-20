import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const Excel = require('exceljs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
} = require('../../../routes/s3');
const moment = require('moment');

// export default로 Query 내용 내보내기
// PRE_FLAG
const moduleQuery_S0708_EXCEL_TT_LIST = {
    Query: {
        mgrQueryS0708_EXCEL_TT_LIST: async (_, args, contextValue) => {
            var tUserInfo = AFLib.getUserInfo(contextValue);

            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('TT 입금리스트');

            // 1. 제목: TT 입금리스트
            worksheet.mergeCells('A1:H1');
            const titleCell = worksheet.getCell('A1');
            titleCell.value = 'TT 입금리스트';
            titleCell.font = { size: 16, bold: true };
            titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
            worksheet.getRow(1).height = 25;

            // 2. 헤더 정의 (2행)
            const headers = [
                'REF NO',
                'BUYER',
                'PAY DATE',
                'T/T AMOUNT',
                '수수료',
                'INVOICE NO',
                'S.DATE',
                'G.TOTAL',
            ];
            worksheet.addRow(headers);

            // 3. 헤더 스타일 설정
            const headerRow = worksheet.getRow(2);
            headerRow.font = { bold: true };
            headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
            headerRow.eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'DDEEFF' }, // 연한 하늘색
                };
            });

            // 4. 컬럼 너비 설정
            worksheet.columns = [
                { key: 'ref_no', width: 20 },
                { key: 'buyer', width: 30 },
                { key: 'pay_date', width: 15 },
                { key: 'tot_amt', width: 15 },
                { key: 'charge', width: 10 },
                { key: 'invoice_no', width: 25 },
                { key: 'bill_date', width: 15 },
                { key: 'bill_amt', width: 15 },
            ];

            // 데이터는 3행부터 시작
            let currentRow = 3;

            for (const element of args.data) {
                let refNo = element.REF_NO;
                console.log(refNo);

                let basicInfo = await prisma.$queryRaw(
                    Prisma.raw(`
                        SELECT
                            A.REF_NO,
                            D.BUYER_NAME,
                            A.BILL_DATE AS PAY_DATE,
                            ROUND(A.TOT_AMT, 2) AS TOT_AMT,
                            ROUND(A.CREDIT_AMT, 2) AS CREDIT_AMT,
                            ROUND(A.CHARGE, 2) AS CHARGE
                        FROM
                            KSV_INVOICE_PREBILL A,
                            KCD_BUYER D
                        WHERE
                            1 = 1
                            AND A.BUYER_CD is not null
                            and A.BUYER_CD <> ''
                            AND A.BUYER_CD = D.BUYER_CD
                            AND A.REF_NO = '${refNo}'
                    `),
                );

                let invoiceDebitInfo = await prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            (
                                case
                                    when a.invoice_no = 'DEBIT' then a.debit_cd
                                    else a.invoice_no
                                end
                            ) as INVOICE_NO,
                            a.BILL_DATE,
                            a.BILL_AMT,
                            a.CURRENCY_RATE,
                            a.REF_NO,
                            a.BILL_AMT_ORG,
                            a.END_DATE,
                            a.BUYER_CD,
                            a.PRE_FLAG
                        from
                            ksv_invoice_prebill a0,
                            ksv_invoice_bill a
                        where
                            a.ref_no = '${refNo}'
                            and a.pre_flag in ('0', '')
                            and a.ref_no = a0.ref_no
                            and a.pre_flag = a0.pre_flag
                            and a0.buyer_cd is not null
                            and a0.buyer_cd <> ''
                            --and a.bill_amt > 0.0
                    `),
                );

                let creditInfo = await prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            a.CREDIT_CD,
                            a.CREDIT_AMT
                        from
                            ksv_invoice_credit a
                        where
                            a.ref_no = '${refNo}'
                            and a.pre_flag in ('0', '')
                    `),
                );

                let isFirstRow = true;

                for (const invoice of invoiceDebitInfo) {
                    worksheet.addRow([
                        isFirstRow ? basicInfo[0]?.REF_NO || '' : '',
                        isFirstRow ? basicInfo[0]?.BUYER_NAME || '' : '',
                        isFirstRow
                            ? moment(basicInfo[0].PAY_DATE, 'YYYYMMDD').format(
                                  'YYYY-MM-DD',
                              )
                            : '',
                        isFirstRow ? basicInfo[0]?.TOT_AMT || 0 : '',
                        isFirstRow ? basicInfo[0]?.CHARGE || 0 : '',
                        invoice?.INVOICE_NO === '미정'
                            ? 'TOTAL'
                            : invoice?.INVOICE_NO || '',
                        isFirstRow
                            ? ''
                            : moment(invoice.BILL_DATE, 'YYYYMMDD').format(
                                  'YYYY-MM-DD',
                              ) || '',
                        isFirstRow
                            ? basicInfo[0].TOT_AMT + basicInfo[0].CHARGE
                            : Number(invoice.BILL_AMT.toFixed(2)),
                    ]);
                    isFirstRow = false;
                    currentRow++;
                }

                for (const credit of creditInfo) {
                    worksheet.addRow([
                        '',
                        '',
                        '',
                        '',
                        '',
                        credit?.CREDIT_CD || '',
                        '',
                        -Number(credit?.CREDIT_AMT.toFixed(2)) || '',
                    ]);
                    currentRow++;
                }
            }

            // 6. 테두리 적용
            worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                if (rowNumber >= 2) {
                    row.eachCell((cell) => {
                        cell.border = {
                            top: { style: 'thin' },
                            bottom: { style: 'thin' },
                            left: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    });
                }
            });

            // 7. 저장 또는 업로드
            return await upload('TT입금리스트.xlsx', workbook);
        },
    },
};

export default moduleQuery_S0708_EXCEL_TT_LIST;
