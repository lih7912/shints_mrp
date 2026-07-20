import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0110_1 = {
    Query: {
        mgrQueryS0110_CODE: async (_, args) => {
            try {
                interface tWObjType {
                    QRY_STATUS_CD: any;
                    STATUS_CD: any;
                    BANK_TYPE1: any;
                }
                var tWObj: tWObjType = {
                    QRY_STATUS_CD: undefined,
                    STATUS_CD: undefined,
                    BANK_TYPE1: undefined,
                };

                interface tObjType {
                    CD_CODE: string;
                    CD_NAME: string;
                }

                let sqlStr_QRY_STATUS_CD = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'STATUS_CD'
                `;
                let tRet_QRY_STATUS_CD = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_QRY_STATUS_CD),
                );
                var tObj_QRY_STATUS_CD: tObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj_QRY_STATUS_CD.CD_CODE = '';
                tObj_QRY_STATUS_CD.CD_NAME = 'All';
                tRet_QRY_STATUS_CD.unshift(tObj_QRY_STATUS_CD);
                tWObj.QRY_STATUS_CD = tRet_QRY_STATUS_CD;

                let sqlStr_STATUS_CD = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'STATUS_CD'
                `;
                let tRet_STATUS_CD = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_STATUS_CD),
                );
                var tObj_QRY_STATUS_CD: tObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj_QRY_STATUS_CD.CD_CODE = '';
                tObj_QRY_STATUS_CD.CD_NAME = ' ';
                tRet_STATUS_CD.unshift(tObj_QRY_STATUS_CD);
                tWObj.STATUS_CD = tRet_STATUS_CD;

                let sqlStr_BANK_TYPE1 = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'BANK_TYPE1'
                        and CD_CODE != ''
                `;
                let tRet_BANK_TYPE1 = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_BANK_TYPE1),
                );
                var tObj_BANK_TYPE1: tObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj_BANK_TYPE1.CD_CODE = '';
                tObj_BANK_TYPE1.CD_NAME = ' ';
                tRet_BANK_TYPE1.unshift(tObj_BANK_TYPE1);
                tWObj.BANK_TYPE1 = tRet_BANK_TYPE1;

                return tWObj;
            } catch (err) {
                console.log(err);
            }
        },

        mgrQueryS0110_1: async (_, args) => {
            try {
                let sqlStr = `
                    select
                        a.*,
                        isnull(b.cd_name, '') as STATUS_CD_N,
                        isnull(c.name, '') as fileName,
                        isnull(c.URL, '') as fileUrl,
                        isnull(c.OBJECT_NAME, '') as objectName,
                        isnull(d.cd_name, '') as bank_typeName
                    from
                        kcd_bank a
                        left join kcd_code b on a.status_cd = b.cd_code
                        and b.cd_group = 'STATUS_CD'
                        left join kcd_code d on a.BANK_TYPE1 = d.cd_code
                        and d.cd_group = 'BANK_TYPE1'
                        left join kcd_fileinfo c on a.bank_cd = c.file_key
                    where
                        a.status_cd like '%${args.data.STATUS_CD}%'
                        and (a.bank_name like '%${args.data.BANK_NAME}%')
                        and (
                            a.account_name like '%${args.data.ACCOUNT_NAME}%'
                            or a.account_no like '%${args.data.ACCOUNT_NAME}%'
                            or a.chk_account_no like '%${args.data.ACCOUNT_NAME}%'
                        )
                        and (a.bank_type1 like '%${args.data.BANK_TYPE}%')
                    order by
                        a.reg_datetime desc
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

                var tArray = tRet.map((col, i) => {
                    var tObj = { ...col };
                    // var tPath = `/workspace_2020/workspace_2023_mrp/shints_mssql_server/upload/file_info_bank_${tObj.BANK_CD}.json`;

                    const tCols = __dirname.split('/');
                    var tPath0 = '';
                    var tIdx = 0;
                    for (tIdx = 0; tIdx < tCols.length - 3; tIdx++) {
                        tPath0 += tCols[tIdx] + '/';
                    }
                    var tPath = `${tPath0}upload/file_info_bank_${tObj.BANK_CD}.json`;

                    tObj.FILE_NAME = '';
                    if (fs.existsSync(tPath)) {
                        var tFileObj = JSON.parse(
                            fs.readFileSync(tPath).toString(),
                        );
                        tObj.FILE_NAME = tFileObj.filename;
                    }
                    return tObj;
                });
                return tArray;
            } catch (err) {
                console.log(err);
            }
        },

        mgrQueryS0110_2: async (_, args) => {
            interface ObjType {
                VENDOR_CD: string;
                VENDOR_NAME: string;
            }

            var tObj: ObjType = {
                VENDOR_CD: '',
                VENDOR_NAME: ' ',
            };

            let sqlStr = `
                select
                    *
                from
                    kcd_vendor
                where
                    (
                        vendor_cd like '%${args.data.VENDOR_CD}%'
                        or vendor_name like '%${args.data.VENDOR_CD}%'
                    )
                    and status_cd = '0'
                order by
                    reg_datetime desc,
                    vendor_name
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet.unshift(tObj);
            return tRet;
        },
        mgrQueryS0110_3: async (_, args) => {
            /*
       let sqlStr  = `
           select
               a.*,
               b.cd_name as VENDOR_TYPE_N,
               isnull(c.cd_name, '') as GW_N
           from
               kcd_vendor a
               left join kcd_code c on a.gw = c.cd_code
               and c.cd_group = 'GW_STATUS',
               kcd_code b
           where
               a.bank_cd = '${args.data.BANK_CD}'
               and a.vendor_type = b.cd_code
               and b.cd_group = 'VENDOR_TYPE'
       `;
*/
            /*
       let sqlStr  = `
           select
               top 200 a.*,
               b.cd_name as VENDOR_TYPE_N,
               c.cd_name as GW_N
           from
               kcd_vendor a,
               kcd_code b,
               kcd_code c
           where
               a.bank_cd = '${args.data.BANK_CD}'
               and a.vendor_type = b.cd_code
               and b.cd_group = 'VENDOR_TYPE'
               and a.gw = c.cd_code
               and c.cd_group = 'GW_STATUS'
       `;
*/
            let sqlStr = `
                select
                    a.*,
                    a1.gw as bank_gw,
                    b.cd_name as VENDOR_TYPE_N,
                    isnull(c.cd_name, '') as GW_N
                from
                    kcd_vendor a,
                    kcd_vendor_bank a1
                    left join kcd_code c on a1.gw = c.cd_code
                    and c.cd_group = 'GW_STATUS',
                    kcd_code b
                where
                    a1.bank_cd = '${args.data.BANK_CD}'
                    and a1.vendor_cd = a.vendor_cd
                    and a.vendor_type = b.cd_code
                    and b.cd_group = 'VENDOR_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (col.bank_gw === '') {
                    tObj.GW = '0';
                    tObj.GW_N = 'New';
                } else tObj.GW = col.bank_gw;
                tRetArray.push(tObj);
            });
            return tRet;
        },
    },
};

export default moduleQuery_S0110_1;
