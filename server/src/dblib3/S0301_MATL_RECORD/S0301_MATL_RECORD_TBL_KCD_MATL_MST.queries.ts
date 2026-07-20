// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MST = {
    Query: {
        mgrQuery_S0301_QRY_VENDOR: async (_, args) => {
            var tValue = args.data.VENDOR_CD.replace(/\s/g, '');

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_VENDOR
                where
                    vendor_cd like '%${tValue}%'
                    or vendor_name like '%${tValue}%'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.VENDOR_CD = '';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);

            return tRet;
        },

        mgrQuery_S0301_QRY_STYLE_LIST: async (_, args) => {
            let sqlStr = `
                select
                    a.matl_cd,
                    a.prod_cd,
                    c.style_name,
                    a.net,
                    a.loss,
                    a.use_size,
                    a.remark,
                    d.order_cd
                from
                    ksv_prod_mem a,
                    ksv_prod_mst b
                    left join ksv_order_mem d on d.prod_cd = b.prod_cd
                    and len(d.order_cd) = 10,
                    kcd_style c
                where
                    a.matl_cd = '${args.data.MATL_CD}'
                    and b.prod_cd = a.prod_cd
                    and c.style_cd = b.style_cd
                order by
                    1,
                    2,
                    3
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQuery_S0301_QRY_REMARK_LIST: async (_, args) => {
            let sqlStr = `
                select
                    a.upd_user,
                    a.upd_datetime,
                    a.update_remark
                from
                    kcd_matl_update_remark a
                where
                    a.matl_cd = '${args.data.MATL_CD}'
                order by
                    2
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQuery_S0301_MATL_RECORD_CODE: async (_, args) => {
            var tWRet: any = {};

            var tSQL = '';

            let tRet: any[] = [];

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_VENDOR
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tObj_VENDOR_CD = {
                VENDOR_CD: '',
                VENDOR_NAME: ' ',
            };

            tRet.unshift(tObj_VENDOR_CD);
            tWRet.VENDOR_CD = tRet;

            let sqlStr_CURR_CD = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'CURR_CD'
            `;
            var tRet_CURR_CD = await prisma.$queryRaw(
                Prisma.raw(sqlStr_CURR_CD),
            );

            var tObj = {
                CD_CODE: '',
                CD_NAME: ' ',
            };

            //tRet_CURR_CD.unshift(tObj);

            tWRet.CURR_CD = tRet_CURR_CD;

            let sqlStr_COMP = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'COMPOSITION'
            `;
            var tRet_COMP = await prisma.$queryRaw(Prisma.raw(sqlStr_COMP));

            tRet_COMP.unshift(tObj);
            tWRet.COMP = tRet_COMP;

            let sqlStr_HS_CD = `
                select
                    HS_CD + '-' + HS_NAME as HS_NAME,
                    HS_NO,
                    HS_CD
                from
                    kcd_hscode
            `;
            let tRet_HS_CD = await prisma.$queryRaw(Prisma.raw(sqlStr_HS_CD));
            var tObj_HS_CD = {
                HS_NAME: ' ',
                HS_NO: '',
            };

            tRet_HS_CD.unshift(tObj_HS_CD);
            tWRet.HS_CD = tRet_HS_CD;

            let sqlStr_MATL_CONF_FLAG = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'MATL_CONF_FLAG'
            `;
            var tRet_MATL_CONF_FLAG = await prisma.$queryRaw(
                Prisma.raw(sqlStr_MATL_CONF_FLAG),
            );

            tRet_MATL_CONF_FLAG.unshift(tObj);
            tWRet.MATL_CONF_FLAG = tRet_MATL_CONF_FLAG;

            let sqlStr_PRICE_TYPE = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'PRICE_TYPE'
            `;
            var tRet_PRICE_TYPE = await prisma.$queryRaw(
                Prisma.raw(sqlStr_PRICE_TYPE),
            );

            tRet_PRICE_TYPE.unshift(tObj);
            tWRet.PRICE_TYPE = tRet_PRICE_TYPE;

            let sqlStr_STATUS_CD = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STATUS_CD'
            `;
            var tRet_STATUS_CD = await prisma.$queryRaw(
                Prisma.raw(sqlStr_STATUS_CD),
            );

            tRet_STATUS_CD.unshift(tObj);
            tWRet.STATUS_CD = tRet_STATUS_CD;

            let sqlStr_MATL_TYPE = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'MATL_TYPE'
            `;
            var tRet_MATL_TYPE = await prisma.$queryRaw(
                Prisma.raw(sqlStr_MATL_TYPE),
            );

            tRet_MATL_TYPE.unshift(tObj);
            tWRet.MATL_TYPE = tRet_MATL_TYPE;

            let sqlStr_MATL_UNIT = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'MATL_UNIT'
            `;
            var tRet_MATL_UNIT = await prisma.$queryRaw(
                Prisma.raw(sqlStr_MATL_UNIT),
            );

            tRet_MATL_UNIT.unshift(tObj);
            tWRet.MATL_UNIT = tRet_MATL_UNIT;

            let sqlStr_BOX_UNIT = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'BOX_UNIT'
            `;
            var tRet_BOX_UNIT = await prisma.$queryRaw(
                Prisma.raw(sqlStr_BOX_UNIT),
            );

            tRet_BOX_UNIT.unshift(tObj);
            tWRet.BOX_UNIT = tRet_BOX_UNIT;

            let sqlStr_KIND2 = `
                SELECT
                    SEQ,
                    MATL_TYPE2
                FROM
                    KCD_MATL_TYPE2
            `;
            let tRet_KIND2 = await prisma.$queryRaw(Prisma.raw(sqlStr_KIND2));
            var tObj_KIND2 = {
                MATL_TYPE2: ' ',
                SEQ: '',
            };

            tRet_KIND2.unshift(tObj_KIND2);
            tWRet.KIND2 = tRet_KIND2;

            return tWRet;
        },

        mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MST: async (
            _,
            args,
            contextValue,
        ) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tData = args.data ?? {};
            var tSearchText = (col) => (typeof col === 'string' ? col : '');

            var tSQL = '';
            var tSQL1 = '';
            var tSQL2 = '';
            var tFlag = 0;
            if (tSearchText(tData.MATL_CD) !== '') {
                var tMatlCd = tSearchText(tData.MATL_CD).replace(/\'/gi, "''");
                tSQL += `AND a.matl_cd like '%${tMatlCd}%' ESCAPE '[' `;
                tFlag = 1;
            }
            if (tSearchText(tData.MATL_NAME) !== '') {
                var tVal0 = tSearchText(tData.MATL_NAME).replace(/\'/gi, "''");
                tSQL1 = `AND (`;
                var tArray0 = tVal0.split(' ').filter((col) => col !== '');
                tArray0.forEach((col, i) => {
                    if (i === 0)
                        tSQL1 += `a.matl_name like '%${col}%' ESCAPE '[' `;
                    else tSQL1 += `and a.matl_name like '%${col}%' ESCAPE '[' `;
                });
                tSQL1 += `)`;
                tFlag = 1;
            }
            if (tSearchText(tData.VENDOR_CD) !== '') {
                var tVendorCd = tSearchText(tData.VENDOR_CD).replace(/\'/gi, "''");
                tSQL += `AND (e.vendor_cd like '%${tVendorCd}%' ESCAPE '[' OR e.vendor_name like '%${tVendorCd}%' ESCAPE '[') `;
                tFlag = 1;
            }
            if (tSearchText(tData.VENDOR_NAME) !== '') {
                var tVendorName = tSearchText(tData.VENDOR_NAME).replace(/\'/gi, "''");
                tSQL += `AND (e.vendor_cd like '%${tVendorName}%' ESCAPE '[' OR e.vendor_name like '%${tVendorName}%' ESCAPE '[') `;
                tFlag = 1;
            }
            if (tSearchText(tData.COLOR) !== '') {
                var tColor = tSearchText(tData.COLOR).replace(/\'/gi, "''");
                tSQL += `AND a.color like '%${tColor}%' ESCAPE '[' `;
                tFlag = 1;
            }
            if (tSearchText(tData.SPEC) !== '') {
                var tVal0 = tSearchText(tData.SPEC).replace(/\'/gi, "''");
                tSQL2 = `AND (`;
                var tArray0 = tVal0.split(' ').filter((col) => col !== '');
                tArray0.forEach((col, i) => {
                    if (i === 0) tSQL2 += `a.spec like '%${col}%' ESCAPE '[' `;
                    else tSQL2 += `and a.spec like '%${col}%' ESCAPE '[' `;
                });
                tSQL2 += `)`;
                tFlag = 1;
            }
            if (tSearchText(tData.STATUS_CD) !== '' && tSearchText(tData.STATUS_CD) !== ' ') {
                var tStatusCd = tSearchText(tData.STATUS_CD).replace(/\'/gi, "''");
                tSQL += `AND a.status_cd <> '${tStatusCd}' `;
                tSQL += `AND e.status_cd <> '${tStatusCd}' `;
                tFlag = 1;
            }
            if (tSearchText(tData.MATL_TYPE) !== '' && tSearchText(tData.MATL_TYPE) !== ' ') {
                var tMatlType = tSearchText(tData.MATL_TYPE).replace(/\'/gi, "''");
                tSQL += `AND a.matl_type = '${tMatlType}' `;
                tFlag = 1;
            }
            if (
                typeof tData.MATL_TYPE2 !== 'undefined' &&
                tSearchText(tData.MATL_TYPE2) !== '' &&
                tSearchText(tData.MATL_TYPE2) !== ' '
            ) {
                var tMatlType2 = tSearchText(tData.MATL_TYPE2).replace(/\'/gi, "''");
                tSQL += `AND a.matl_type2 = '${tMatlType2}' `;
                tFlag = 1;
            }
            var tMessage = ``;
            if (tFlag === 0) {
                tMessage = `검색 조건을 미입력시 당해년도에 등록된 것만 조회됨.<br><br>If you do not enter search conditions, only those registered in the current year will be retrieved.`;
                var tDate1 = '';
                if (tRetDate1.substring(4, 6) === '01') {
                    tDate1 = `${parseInt(tRetDate1.substring(0, 4)) - 1}0601`;
                } else {
                    tDate1 = `${tRetDate1.substring(0, 4)}0101`;
                }
                var tDate2 = `${tRetDate1}`;
                tSQL += `AND a.reg_datetime >= '${tDate1}' AND a.reg_datetime <= '${tDate2}999999' `;
            }

            let sqlStr = `
                select top 1000
                    i.MATL_TYPE2 as MATL_TYPE2_NAME,
                    a.*, 
                    lm.MATL_PRICE,
                    lm.UPD_USER_1,
                    lm.CURR_CD,
                    lm.REG_DATETIME_1,
                    lm.MATL_SEQ,
                    lm.PRICE_TYPE,
                    c.cd_name as MATL_TYPE_NAME,
                    e.VENDOR_NAME,
                    d.cd_name as MATL_UNIT_NAME,
                    isnull(ls.S_MATL_PRICE, 0) as S_MATL_PRICE,
                    isnull(ls.S_CURR_CD, '') as S_CURR_CD,
                    h.cd_name as BOX_UNIT_NAME,
                    g.cd_name as STATUS_CD_NAME,
                    e.VENDOR_TYPE,
                    e.STATUS_CD as VENDOR_STATUS_CD,
                    lm.MATL_SEQ AS MATL_SEQ_MAX,
                    isnull(comp.COMP1, '') as COMP1,
                    isnull(comp.COMP1_PERCENT, '0') as COMP1_P,
                    isnull(comp.COMP2, '') as COMP2,
                    isnull(comp.COMP2_PERCENT, '0') as COMP2_P,
                    isnull(comp.COMP3, '') as COMP3,
                    isnull(comp.COMP3_PERCENT, '0') as COMP3_P,
                    isnull(comp.COMP4, '') as COMP4,
                    isnull(comp.COMP4_PERCENT, '0') as COMP4_P,
                    isnull(vcomp.comp1, '') as V_COMP,
                    isnull(os.offer_spec, '') as OFFER_SPEC
                from
                    kcd_matl_mst a
                    outer apply (
                        select top 1
                            m.matl_price,
                            m.upd_user as UPD_USER_1,
                            m.curr_cd,
                            m.reg_datetime as REG_DATETIME_1,
                            m.matl_seq,
                            m.price_type
                        from
                            kcd_matl_mem m
                        where
                            m.matl_cd = a.matl_cd
                        order by
                            m.matl_seq desc
                    ) lm
                    join kcd_vendor e on a.vendor_cd = e.vendor_cd
                    outer apply (
                        select top 1
                            s.matl_price as S_MATL_PRICE,
                            s.curr_cd as S_CURR_CD
                        from
                            kcd_matl_sale s
                        where
                            s.matl_cd = a.matl_cd
                        order by
                            s.matl_seq desc
                    ) ls
                    left join kcd_code c on a.MATL_TYPE = c.cd_code
                    and c.cd_group = 'MATL_TYPE'
                    left join kcd_code d on a.UNIT = d.cd_code
                    and d.cd_group = 'MATL_UNIT'
                    left join kcd_code g on a.STATUS_CD = g.cd_code
                    and g.cd_group = 'STATUS_CD'
                    left join kcd_code h on a.BOX_UNIT = h.cd_code
                    and h.cd_group = 'BOX_UNIT'
                    left join kcd_matl_type2 i on a.MATL_TYPE2 = i.seq
                    left join (
                        select
                            matl_name,
                            max(COMP1) as COMP1,
                            max(COMP1_PERCENT) as COMP1_PERCENT,
                            max(COMP2) as COMP2,
                            max(COMP2_PERCENT) as COMP2_PERCENT,
                            max(COMP3) as COMP3,
                            max(COMP3_PERCENT) as COMP3_PERCENT,
                            max(COMP4) as COMP4,
                            max(COMP4_PERCENT) as COMP4_PERCENT
                        from
                            kcd_composition
                        group by
                            matl_name
                    ) comp on comp.matl_name = REPLACE(a.matl_name, '''', '')
                    left join (
                        select
                            matl_name,
                            max(comp1) as comp1
                        from
                            kcd_composition_v
                        group by
                            matl_name
                    ) vcomp on vcomp.matl_name = REPLACE(a.matl_name, '''', '')
                    left join (
                        select
                            matl_name,
                            vendor_cd,
                            max(offer_spec) as offer_spec
                        from
                            kcd_offer_spec
                        group by
                            matl_name,
                            vendor_cd
                    ) os on os.matl_name = REPLACE(a.matl_name, '''', '')
                    and os.vendor_cd = a.vendor_cd
                where
                    len(a.matl_type) = 1
                    and lm.matl_seq is not null
                    ${tSQL} ${tSQL1} ${tSQL2}
                order by
                    e.vendor_name, a.matl_name, a.color, a.spec, a.id ASC
            `;

            var tRet = [];
            try {
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                console.log(tRet.length);
            } catch (e) {
                console.log(e);
            }

            if (tRet.length === 0) {
                return { message: '검색결과 없음', datas: [] };
            }
            const tRetArray = tRet.map((row) => ({
                ...row,
                HS_CD: row.HS_CD ?? '',
                ADD_LOSS: row.add_loss ?? '0',
                ADD_AMT: row.ADD_AMT ?? '0',
            }));

            const limitNotice =
                tRetArray.length >= 1000
                    ? `<br><br>최대 1000건까지만 조회됩니다.<br><br>Up to 1000 rows are returned.`
                    : ``;

            const tWObj = {
                message:
                    tRetArray.length <= 0
                        ? `검색결과 없음`
                        : `${tMessage}<br><br>${tRetArray.length}개가 조회됨.<br><br>${tRetArray.length} items are retrieved.${limitNotice}`,
                datas: tRetArray,
            };

            return tWObj;
        },

        mgrQuery_S0301_QRY_BATCH_SAVE: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                select
                    i.MATL_TYPE2 as MATL_TYPE2_NAME,
                    a1.*,
                    c.cd_name as MATL_TYPE_NAME,
                    e.VENDOR_NAME,
                    d.cd_name as MATL_UNIT_NAME,
                    isnull(j.matl_price, 0) as MATL_PRICE,
                    j.CURR_CD,
                    h.cd_name as BOX_UNIT_NAME,
                    g.cd_name as STATUS_CD_NAME,
                    e.VENDOR_TYPE,
                    e.STATUS_CD as VENDOR_STATUS_CD,
                    j.MATL_SEQ AS MATL_SEQ_MAX
                from
                    (
                        select
                            top 100 a.*,
                            b.MATL_PRICE,
                            b.upd_user AS UPD_USER_1,
                            b.CURR_CD,
                            b.REG_DATETIME AS REG_DATETIME_1,
                            b.MATL_SEQ,
                            b.PRICE_TYPE
                        from
                            kcd_matl_mst a,
                            kcd_matl_mem b
                        where
                            a.matl_cd = b.matl_cd
                            and b.matl_seq = (
                                select
                                    max(matl_seq)
                                from
                                    kcd_matl_mem
                                where
                                    matl_cd = a.matl_cd
                            )
                            and len(a.matl_type) = 1
                            and a.reg_user = '${args.data.reg_user}'
                            and a.reg_datetime = '${args.data.reg_datetime}'
                        order by
                            a.matl_cd
                            -- offset 0 rows fetch next 100 rows only
                    ) a1
                    left join kcd_code c on a1.MATL_TYPE = c.cd_code
                    and c.cd_group = 'MATL_TYPE'
                    left join kcd_code d on a1.UNIT = c.cd_code
                    and c.cd_group = 'MATL_UNIT'
                    left join kcd_vendor e on a1.VENDOR_CD = e.vendor_cd
                    left join kcd_code g on a1.STATUS_CD = g.cd_code
                    and g.cd_group = 'STATUS_CD'
                    left join kcd_code h on a1.BOX_UNIT = h.cd_code
                    and h.cd_group = 'BOX_UNIT'
                    left join kcd_matl_type2 i on a1.MATL_TYPE2 = i.seq
                    left join kcd_matl_sale j on a1.MATL_CD = j.matl_cd
                    and j.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_sale
                        where
                            matl_cd = a1.MATL_CD
                    )
                where
                    a1.id > 0
                order by
                    a1.MATL_CD
                    -- offset 0 rows fetch next 100 rows only
            `;
            var tRet = [];
            try {
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                console.log(tRet.length);
            } catch (e) {
                console.log(e);
            }
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MST;
