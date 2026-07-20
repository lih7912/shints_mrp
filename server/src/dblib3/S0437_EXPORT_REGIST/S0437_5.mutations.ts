// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0437_5 = {
    Mutation: {
        mgrInsert_S0437_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = [...args.datas];
            var tInput1 = { ...args.datas1 };

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas.length; tIdx1++) {
                var col = { ...args.datas[tIdx1] };

                var tSQLArray = [];

                if (col.LICENSE_NO !== '') continue;

                // TRADE_TYPE : 1/Export. TRADE_KIND: 2/Import
                var tTradeType = '1';
                var tPaymentType = '1';
                if (tInput1.PAYMENT_TYPE !== '')
                    tPaymentType = tInput1.PAYMENT_TYPE;

                let sql0 = `
                    select
                        *
                    from
                        ksv_invoice_matl
                    where
                        invoice_no = '${col.INVOICE_NO}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    let tSQL99 = `
                        update ksv_invoice_matl
                        set
                            license_no = '${tInput1.LICENSE_NO}',
                            license_date = '${tInput1.LICENSE_DATE}',
                            payment_type = '${tPaymentType}'
                        where
                            invoice_no = '${col.INVOICE_NO}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        insert into
                            ksv_invoice_matl (
                                invoice_no,
                                pack_cd,
                                out_date,
                                delivery_amt,
                                delivery_won,
                                curr_date,
                                docu_no,
                                payment_type,
                                trade_type,
                                status_cd,
                                reg_user,
                                reg_datetime,
                                curr_cd,
                                trade_kind,
                                license_no,
                                license_date,
                                buyer_cd
                            )
                        values
                            (
                                '${col.INVOICE_NO}',
                                '${col.STSOUT_CD}',
                                '${col.OUT_DATE}',
                                '${col.S_AMT}',
                                '',
                                '${tRetDate1}',
                                '',
                                '${tPaymentType}',
                                '${tTradeType}',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${col.IN_CURR_CD}',
                                '0',
                                '${tInput1.LICENSE_NO}',
                                '${tInput1.LICENSE_DATE}',
                                ''
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let sql0 = `
                    select
                        a.PO_CD,
                        sum(b.IN_QTY * b.IN_PRICE) as PO_AMT,
                        sum(a.OUT_QTY * b.IN_PRICE) as DELIVERY_AMT
                    from
                        ksv_stock_out a,
                        ksv_stock_in b
                    where
                        a.stsout_cd = '${col.STSOUT_CD}'
                        and a.in_datetime = b.in_datetime
                    group by
                        a.PO_CD
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                let tSQL99 = `
                    delete from ksv_invoice_matlmem
                    where
                        invoice_no = '${col.INVOICE_NO}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < nRet0.length; tIdx2++) {
                    var col1 = { ...nRet0[tIdx2] };

                    let tSQL99 = `
                        insert into
                            ksv_invoice_matlmem (
                                invoice_no,
                                pack_cd,
                                po_cd,
                                po_amt,
                                delivery_amt,
                                delivery_won
                            )
                        values
                            (
                                '${col.INVOICE_NO}',
                                '${col.STSOUT_CD}',
                                '${col1.PO_CD}',
                                '${col1.PO_AMT}',
                                '${col1.DELIVERY_AMT}',
                                '0'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let tSQL99 = `
                    update ksv_shipment_mst
                    set
                        export_license_no = '${tInput1.LICENSE_NO}'
                    where
                        shipment_cd = '${col.SHIPMENT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Update License No';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update License No';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },
    },
};

export default moduleMutation_S0437_5;
