// MGR_@@TNAME@@.mutations.js
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Mutation 내용 내보내기
const moduleMutation_S0200_KCD_STYLE_EDT_KCD_STYLE = {
    Mutation: {
        mgrDelete_KCD_STYLE: async (_, param, contextValue) => {
            var tSQLArray: any[] = [];

            var ret: any[] = await prisma.$queryRaw(
                Prisma.raw(
                    `
                        select
                            count(*) as count
                        from
                            ksv_order_mst
                        where
                            style_cd = '${param.STYLE_CD}'
                    `,
                ),
            );

            if (ret[0].count > 0) {
                return {
                    STYLE_CD: `ERROR:${param.STYLE_CD} is used in Order.`,
                };
            }

            tSQLArray.push(
                prisma.$queryRaw(
                    Prisma.raw(
                        `
                            delete from kcd_style
                            where
                                style_cd = '${param.STYLE_CD}'
                        `,
                    ),
                ),
            );

            tSQLArray.push(
                prisma.$queryRaw(
                    Prisma.raw(
                        `
                            delete from kcd_fileinfo
                            where
                                kind = 'STYLE'
                                and file_key = '${param.STYLE_CD}'
                        `,
                    ),
                ),
            );

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                return { STYLE_CD: 'DELETED' };
            } catch (e) {
                console.log(e);

                return { STYLE_CD: 'ERROR' };
            }
        },

        mgrDelete_KSV_PROD_MST: async (_, args, contextValue) => {
            var tInputs = [...args.datas];
            var tSQLArray: any[] = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInputs.length; tIdx++) {
                var tOne = { ...tInputs[tIdx] };

                var sql0 = `
                    select
                        count(*) as t_cnt
                    from
                        ksv_prod_mem
                    where
                        prod_cd = '${tOne.PROD_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0[0].t_cnt > 0) {
                    var tObj = {
                        STYLE_CD: 'ERROR',
                    };
                    return tObj;
                }

                var sql0 = `
                    select
                        count(*) as t_cnt
                    from
                        ksv_order_mst
                    where
                        style_cd = '${tOne.STYLE_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0[0].t_cnt > 0) {
                    var tObj = {
                        STYLE_CD: 'ERROR:This used in Order. ',
                    };
                    return tObj;
                }

                let tSQL99 = `
                    delete from ksv_prod_mst
                    where
                        prod_cd = '${tOne.PROD_CD}'
                        and style_cd = '${tOne.STYLE_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tObj = {};
                tObj.STYLE_CD = tNewStyleCd;
                return tObj;
            } catch (e) {
                var tObj = {
                    STYLE_CD: 'ERROR',
                };
                return tObj;
            }
        },
        mgrInsert_KCD_STYLE_SAVE: async (_, args, contextValue) => {
            //
            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd.toString();
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tYY0 = yyyy.toString().substring(2);
            var tYY = 'ST' + yyyy.toString().substring(2) + '-';

            var tUserInfo: any = AFLib.getUserInfo(contextValue);

            var tSQLArray: any[] = [];

            let tKCD_STYLE = args.datas.data;
            let tStyleCd = tKCD_STYLE.STYLE_CD.trim();

            if (tStyleCd === '') {
                if (
                    typeof tKCD_STYLE.BUYER_CD === 'undefined' ||
                    tKCD_STYLE.BUYER_CD === ''
                ) {
                    var tObj = {
                        STYLE_CD: `ERROR: 바이어는 필수 입력항목입니다 `,
                    };
                    return tObj;
                }

                var sql0 = `
                    select
                        *
                    from
                        kcd_style
                    where
                        style_name = '${tKCD_STYLE.STYLE_NAME.replace(/'/g, "''")}'
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    var tObj = {
                        STYLE_CD: `ERROR: 이미 등록된 스타일 이름입니다 `,
                    };
                    return tObj;
                }

                var sqlStr = `
                    SELECT
                        max(SEQ) as max_seq
                    from
                        KCD_STYLE
                    where
                        YY = ${yyyy}
                `;
                let tRetArray = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tMax0 = tRetArray[0];
                let tMax = Number(tMax0.max_seq ?? 0) + 1;

                let tNewStyleSuffix = '';
                if (tMax <= 9999) {
                    tNewStyleSuffix = tMax.toString();
                } else {
                    const tCodeSeq = tMax - 10000;
                    if (tCodeSeq > 25999) {
                        return {
                            STYLE_CD: `ERROR: STYLE code range exceeded (A000~Z999)`,
                        };
                    }

                    const tSeries = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    const tSeriesIndex = Math.floor(tCodeSeq / 1000);
                    const tNumberInSeries = tCodeSeq % 1000;
                    const tSeriesPrefix = tSeries.charAt(tSeriesIndex);
                    const tMaxStr = tNumberInSeries
                        .toString()
                        .padStart(3, '0');
                    tNewStyleSuffix = tSeriesPrefix + tMaxStr;
                }

                let tNewStyleCd = tYY + tNewStyleSuffix;

                var tInputArray: any = [];

                interface InObjType {
                    STYLE_CD: string;
                    STYLE_NAME: string;
                }
                var tInObj: InObjType = {
                    STYLE_CD: '',
                    STYLE_NAME: '',
                };
                tInObj.STYLE_CD = tNewStyleCd;
                tInObj.STYLE_NAME = tKCD_STYLE.STYLE_NAME;
                tInputArray.push(tInObj);

                if (tKCD_STYLE.DL === 'D/Z' || tKCD_STYLE.DL === 'D') {
                    var tInObj: InObjType = {
                        STYLE_CD: '',
                        STYLE_NAME: '',
                    };
                    tInObj.STYLE_CD = tNewStyleCd + '-DL';
                    tInObj.STYLE_NAME = tKCD_STYLE.STYLE_NAME + '-DL';
                    tInputArray.push(tInObj);
                }

                if (tKCD_STYLE.DL === 'D/Z' || tKCD_STYLE.DL === 'Z') {
                    var tInObj: InObjType = {
                        STYLE_CD: '',
                        STYLE_NAME: '',
                    };
                    tInObj.STYLE_CD = tNewStyleCd + '-ZL';
                    tInObj.STYLE_NAME = tKCD_STYLE.STYLE_NAME + '-ZL';
                    tInputArray.push(tInObj);
                }

                var tIdx = 0;

                for (tIdx = 0; tIdx < tInputArray.length; tIdx++) {
                    var tOne1 = { ...tInputArray[tIdx] };

                    let tSQL99 = `
                        insert into
                            KCD_STYLE (
                                STYLE_CD,
                                STYLE_NAME,
                                BUYER_CD,
                                MW,
                                EMBRO,
                                TP,
                                SP,
                                LTHR,
                                G,
                                W,
                                S,
                                FND,
                                DL,
                                DOWN,
                                CUT,
                                KIND,
                                BVT_KIND,
                                YY,
                                SEQ,
                                STATUS_CD,
                                REG_USER,
                                REG_DATETIME,
                                UPD_USER,
                                UPD_DATETIME,
                                TPR,
                                EMBOSSING,
                                WASHING,
                                FTP,
                                DTP,
                                LAZE,
                                STYLE_UNIT,
                                PURPOSE,
                                FABRIC
                            )
                        values
                            (
                                '${tOne1.STYLE_CD}',
                                '${tOne1.STYLE_NAME.replace(/'/g, "''")}',
                                '${tKCD_STYLE.BUYER_CD}',
                                '${tKCD_STYLE.MW}',
                                '${tKCD_STYLE.EMBRO}',
                                '${tKCD_STYLE.TP}',
                                '${tKCD_STYLE.SP}',
                                '${tKCD_STYLE.LTHR}',
                                '${tKCD_STYLE.G}',
                                '${tKCD_STYLE.W}',
                                '${tKCD_STYLE.S}',
                                '${tKCD_STYLE.FND}',
                                '${tKCD_STYLE.DL}',
                                '${tKCD_STYLE.DOWN}',
                                '${tKCD_STYLE.CUT}',
                                '${tKCD_STYLE.KIND}',
                                '${tKCD_STYLE.KIND}',
                                '${yyyy}',
                                '${tMax}',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${tKCD_STYLE.TPR}',
                                '${tKCD_STYLE.EMBOSSING}',
                                '${tKCD_STYLE.WASHING}',
                                '${tKCD_STYLE.FTP}',
                                '${tKCD_STYLE.DTP}',
                                '${tKCD_STYLE.LAZE}',
                                '${tKCD_STYLE.STYLE_UNIT}',
                                '${tKCD_STYLE.PURPOSE}',
                                '${tKCD_STYLE.FABRIC}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                //img upload

                let imgUpdSQL = '';
                if (tKCD_STYLE.imgURL != undefined) {
                    //console.log('img upload');

                    imgUpdSQL = `
                        Insert INTO
                            KCD_FILEINFO (
                                KIND,
                                FILE_KEY,
                                NAME,
                                URL,
                                OBJECT_NAME,
                                UPD_DATETIME
                            )
                        VALUES
                            (
                                'STYLE',
                                '${tNewStyleCd}',
                                '${tKCD_STYLE.fileName.replace(/'/g, "''")}',
                                '${tKCD_STYLE.imgURL}',
                                '${tKCD_STYLE.objectName}',
                                '${tRetDate}'
                            )
                    `;
                    const imgSaveSQL_1 = prisma.$queryRaw(
                        Prisma.raw(imgUpdSQL),
                    );
                    tSQLArray.push(imgSaveSQL_1);
                }
                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;

                    var tObj = {
                        STYLE_CD: tNewStyleCd,
                    };
                    return tObj;
                } catch (e) {
                    var tObj = {
                        STYLE_CD: `ERROR:${e.message}`,
                    };

                    return tObj;
                }
            } else {
                console.log('-------------update--------------');
                console.log(tKCD_STYLE);
                let sql101 = `
                    select
                        isnull(DL, '') as DL
                    from
                        kcd_style
                    where
                        style_cd = '${tKCD_STYLE.STYLE_CD}'
                `;
                let selectKCD_STYLE = await prisma.$queryRaw(
                    Prisma.raw(sql101),
                );

                let sql100 = `
                    select
                        isnull(count(*), 0) as c_cnt
                    from
                        ksv_order_mst
                    where
                        style_cd = '${tKCD_STYLE.STYLE_CD}'
                `;
                let tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
                if (tRet100.length > 0 && tRet100[0].c_cnt > 0) {
                    if (
                        tKCD_STYLE.DL !== selectKCD_STYLE[0].DL &&
                        selectKCD_STYLE[0].DL !== ''
                    ) {
                        let tObj = {
                            STYLE_CD: `ERROR:오더에 등록된 Style의 DL은 바꿀수 없습니다`,
                        };
                        return tObj;
                    }
                    // tKCD_STYLE.DL = selectKCD_STYLE[0].DL;
                }

                let sql999 = `
                    select
                        *
                    from
                        kcd_style
                    where
                        style_cd = '${tKCD_STYLE.STYLE_CD}'
                `;
                let ret999 = await prisma.$queryRaw(Prisma.raw(sql999));

                if (
                    ret999[0].STYLE_NAME.trim() !== tKCD_STYLE.STYLE_NAME.trim()
                ) {
                    let existCheckResult: any[] = await prisma.$queryRaw(
                        Prisma.raw(
                            `
                                select
                                    *
                                from
                                    kcd_style
                                where
                                    style_name = '${tKCD_STYLE.STYLE_NAME.trim().replace(/'/g, "''")}'
                            `,
                        ),
                    );
                    if (existCheckResult.length > 0) {
                        return {
                            STYLE_CD: `ERROR: 이미 등록된 스타일 이름입니다.(-2)`,
                        };
                    }
                }

                let checkImgUrl = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        FILE_KEY = '${tKCD_STYLE.STYLE_CD}'
                        and KIND = 'STYLE'
                `;
                let check = await prisma.$queryRaw(Prisma.raw(checkImgUrl));

                var tObjKCD_STYLE = {
                    STYLE_NAME: tKCD_STYLE.STYLE_NAME.replace(/'/g, "''"),
                    //BUYER_CD: tKCD_STYLE.BUYER_CD,
                    MW: tKCD_STYLE.MW,
                    EMBRO: tKCD_STYLE.EMBRO,
                    TP: tKCD_STYLE.TP,
                    DL: tKCD_STYLE.DL,
                    SP: tKCD_STYLE.SP,
                    LTHR: tKCD_STYLE.LTHR,
                    G: tKCD_STYLE.G,
                    W: tKCD_STYLE.W,
                    S: tKCD_STYLE.S,
                    FND: tKCD_STYLE.FND,
                    DOWN: tKCD_STYLE.DOWN,
                    CUT: tKCD_STYLE.CUT,
                    KIND: tKCD_STYLE.KIND,
                    BVT_KIND: tKCD_STYLE.KIND,
                    YY: parseInt(yyyy.toString()),
                    STATUS_CD: '0',
                    UPD_USER: tUserInfo.USER_ID,
                    UPD_DATETIME: tRetDate,
                    TPR: parseInt(tKCD_STYLE.TPR),
                    EMBOSSING: tKCD_STYLE.EMBOSSING,
                    WASHING: tKCD_STYLE.WASHING,
                    FTP: tKCD_STYLE.FTP,
                    DTP: tKCD_STYLE.DTP,
                    LAZE: tKCD_STYLE.LAZE,
                    STYLE_UNIT: tKCD_STYLE.STYLE_UNIT,
                    PURPOSE: tKCD_STYLE.PURPOSE,
                    FABRIC: tKCD_STYLE.FABRIC,
                };

                let tSQL99 = AFLib.updateTableSql('KCD_STYLE', tObjKCD_STYLE);
                tSQL99 += ` where style_cd = '${tKCD_STYLE.STYLE_CD}' `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let imgUpdSQL = '';
                if (tKCD_STYLE.imgURL != undefined) {
                    console.log('img upload');
                    if (check.length > 0) {
                        imgUpdSQL = `
                            update kcd_fileinfo
                            set
                                NAME = '${tKCD_STYLE.fileName.replace(/'/g, "''")}',
                                URL = '${tKCD_STYLE.imgURL}',
                                OBJECT_NAME = '${tKCD_STYLE.objectName}',
                                UPD_DATETIME = '${tRetDate}'
                            where
                                FILE_KEY = '${tKCD_STYLE.STYLE_CD}'
                        `;
                    } else {
                        imgUpdSQL = `
                            Insert INTO
                                KCD_FILEINFO (
                                    KIND,
                                    FILE_KEY,
                                    NAME,
                                    URL,
                                    OBJECT_NAME,
                                    UPD_DATETIME
                                )
                            VALUES
                                (
                                    'STYLE',
                                    '${tKCD_STYLE.STYLE_CD}',
                                    '${tKCD_STYLE.fileName.replace(/'/g, "''")}',
                                    '${tKCD_STYLE.imgURL}',
                                    '${tKCD_STYLE.objectName}',
                                    '${tRetDate}'
                                )
                        `;
                    }

                    const imgSaveSQL_1 = prisma.$queryRaw(
                        Prisma.raw(imgUpdSQL),
                    );
                    tSQLArray.push(imgSaveSQL_1);
                }

                // CAPABOOK Update
                var tObjKCD_STYLE1 = {
                    JOB_CD: 'U',
                    MW: tKCD_STYLE.MW,
                    EMBRO: tKCD_STYLE.EMBRO,
                    TP: tKCD_STYLE.TP,
                    SP: tKCD_STYLE.SP,
                    LTHR: tKCD_STYLE.LTHR,
                    G: tKCD_STYLE.G,
                    W: tKCD_STYLE.W,
                    S: tKCD_STYLE.S,
                    FND: tKCD_STYLE.FND,
                    DOWN: tKCD_STYLE.DOWN,
                    CUT: tKCD_STYLE.CUT,
                    KIND: tKCD_STYLE.KIND,
                    BVT_KIND: tKCD_STYLE.KIND,
                    TPR: parseInt(tKCD_STYLE.TPR),
                    EMBOSSING: tKCD_STYLE.EMBOSSING,
                    WASHING: tKCD_STYLE.WASHING,
                    FTP: tKCD_STYLE.FTP,
                    DTP: tKCD_STYLE.DTP,
                    LAZE: tKCD_STYLE.LAZE,
                };

                var tObjKCD_STYLE2 = {
                    JOB_CD: 'U',
                    MW: tKCD_STYLE.MW,
                    EMBRO: tKCD_STYLE.EMBRO,
                    TP: tKCD_STYLE.TP,
                    SP: tKCD_STYLE.SP,
                    LTHR: tKCD_STYLE.LTHR,
                    G: tKCD_STYLE.G,
                    W: tKCD_STYLE.W,
                    S: tKCD_STYLE.S,
                    FND: tKCD_STYLE.FND,
                    CUT: tKCD_STYLE.CUT,
                    KIND: tKCD_STYLE.KIND,
                    BVT_KIND: tKCD_STYLE.KIND,
                    TPR: parseInt(tKCD_STYLE.TPR),
                    EMBOSSING: tKCD_STYLE.EMBOSSING,
                    WASHING: tKCD_STYLE.WASHING,
                    FTP: tKCD_STYLE.FTP,
                    DTP: tKCD_STYLE.DTP,
                    LAZE: tKCD_STYLE.LAZE,
                };

                var sqlStr9_1 = `
                    SELECT
                        order_cd,
                        job_cd,
                        book_date
                    from
                        ksv_capabook_mem
                    where
                        style_cd = '${tKCD_STYLE.STYLE_CD}'
                        and job_cd in ('0', 'U', 'I')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                style_cd = '${tKCD_STYLE.STYLE_CD}'
                        )
                `;
                let tRet9_1 = await prisma.$queryRaw(Prisma.raw(sqlStr9_1));
                var tIdx9_1 = 0;
                for (tIdx9_1 = 0; tIdx9_1 < tRet9_1.length; tIdx9_1++) {
                    var tOne = { ...tRet9_1[tIdx9_1] };
                    if (tOne.job_cd === 'I') tObjKCD_STYLE1.JOB_CD = 'I';
                    let tSQL99 = AFLib.updateTableSql(
                        'KSV_CAPABOOK_MEM',
                        tObjKCD_STYLE1,
                    );
                    tSQL99 += ` where order_cd = '${tOne.order_cd}' `;
                    tSQL99 += ` and   book_date = '${tOne.book_date}' `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var sqlStr9_2 = `
                    SELECT
                        order_cd,
                        job_cd,
                        book_date
                    from
                        ksv_capabook_mem_ethiopia
                    where
                        style_cd = '${tKCD_STYLE.STYLE_CD}'
                        and job_cd in ('0', 'U', 'I')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem_ethiopia
                            where
                                style_cd = '${tKCD_STYLE.STYLE_CD}'
                        )
                `;
                let tRet9_2 = await prisma.$queryRaw(Prisma.raw(sqlStr9_2));
                var tIdx9_2 = 0;
                for (tIdx9_2 = 0; tIdx9_2 < tRet9_2.length; tIdx9_2++) {
                    var tOne = { ...tRet9_2[tIdx9_2] };
                    if (tOne.job_cd === 'I') tObjKCD_STYLE1.JOB_CD = 'I';
                    let tSQL99 = AFLib.updateTableSql(
                        'KSV_CAPABOOK_MEM_ETHIOPIA',
                        tObjKCD_STYLE1,
                    );
                    tSQL99 += ` where order_cd = '${tOne.order_cd}' `;
                    tSQL99 += ` and   book_date = '${tOne.book_date}' `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var sqlStr9_1_1 = `
                    SELECT
                        order_cd,
                        job_cd,
                        book_date
                    from
                        ksv_capasample_mem
                    where
                        style_cd = '${tKCD_STYLE.STYLE_CD}'
                        and job_cd in ('0', 'U', 'I')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capasample_mem
                            where
                                style_cd = '${tKCD_STYLE.STYLE_CD}'
                        )
                `;
                let tRet9_1_1 = await prisma.$queryRaw(Prisma.raw(sqlStr9_1_1));
                var tIdx9_1_1 = 0;
                for (tIdx9_1_1 = 0; tIdx9_1_1 < tRet9_1_1.length; tIdx9_1_1++) {
                    var tOne = { ...tRet9_1_1[tIdx9_1_1] };
                    if (tOne.job_cd === 'I') tObjKCD_STYLE2.JOB_CD = 'I';
                    let tSQL99 = AFLib.updateTableSql(
                        'KSV_CAPASAMPLE_MEM',
                        tObjKCD_STYLE2,
                    );
                    tSQL99 += ` where order_cd = '${tOne.order_cd}' `;
                    tSQL99 += ` and   book_date = '${tOne.book_date}' `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var sqlStr9_2_1 = `
                    SELECT
                        order_cd,
                        job_cd,
                        book_date
                    from
                        ksv_capasample_mem_ethiopia
                    where
                        style_cd = '${tKCD_STYLE.STYLE_CD}'
                        and job_cd in ('0', 'U', 'I')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capasample_mem_ethiopia
                            where
                                style_cd = '${tKCD_STYLE.STYLE_CD}'
                        )
                `;
                let tRet9_2_1 = await prisma.$queryRaw(Prisma.raw(sqlStr9_2_1));
                var tIdx9_2_1 = 0;
                for (tIdx9_2_1 = 0; tIdx9_2_1 < tRet9_2_1.length; tIdx9_2_1++) {
                    var tOne = { ...tRet9_2_1[tIdx9_2_1] };
                    if (tOne.job_cd === 'I') tObjKCD_STYLE2.JOB_CD = 'I';
                    let tSQL99 = AFLib.updateTableSql(
                        'KSV_CAPASAMPLE_MEM_ETHIOPIA',
                        tObjKCD_STYLE2,
                    );
                    tSQL99 += ` where order_cd = '${tOne.order_cd}' `;
                    tSQL99 += ` and   book_date = '${tOne.book_date}' `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                    let tObj = {
                        STYLE_CD: tKCD_STYLE.STYLE_CD,
                    };
                    return tObj;
                } catch (e) {
                    let tObj = {
                        STYLE_CD: `ERROR:${e.message}`,
                    };
                    return tObj;
                }
            }
        },

        mgrInsert_KSV_PROD_MST_SAVE: async (_, args, contextValue) => {
            //
            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tYY0 = yyyy.toString().substring(2);
            var tPrefix = args.BUYER_CD + yyyy.toString().substring(2) + '-';
            var tYY = tPrefix;

            //
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            let tStyle0 = args.datas[0];
            var sqlStyle = `
                SELECT
                    *
                from
                    KCD_STYLE
                where
                    STYLE_CD = '${tStyle0.STYLE_CD}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStyle));
            let tStyleObj = tRet0[0];

            if (args.opmode === 'DELETE') {
                var tDeleteArray1 = [];
                var tIdx0 = 0;
                for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                    var tObj = { ...args.datas[tIdx0] };
                    var sqlStyle2 = `
                        SELECT
                            isnull(count(*), 0) as cnt
                        from
                            KSV_ORDER_MEM
                        where
                            PROD_CD = '${tObj.PROD_CD}'
                    `;
                    let tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStyle2));
                    if (tRet2[0].cnt <= 0) {
                        let tSQL99 = `
                            delete from ksv_prod_mst
                            where
                                prod_cd = '${tObj.PROD_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            delete from ksv_prod_mem
                            where
                                prod_cd = '${tObj.PROD_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        var tObj = {};
                        tObj.STYLE_CD =
                            'ERROR:Can not delete in order process!';
                        return tObj;
                    }
                }
            }

            if (args.opmode === 'UPDATE') {
                var tIdx = 0;
                let tMax = 0;
                for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                    let tKSV_PROD_MST = args.datas[tIdx];
                    let tProdCd = tKSV_PROD_MST.PROD_CD;
                    console.log(
                        'mgr1KsvProdMst Insert: ' +
                            args.datas.length +
                            ',' +
                            tIdx +
                            ',' +
                            tProdCd,
                    );

                    var tObjKSV_PROD_MST = {};
                    tObjKSV_PROD_MST.COLOR = tKSV_PROD_MST.COLOR;
                    tObjKSV_PROD_MST.PROD_TYPE = tKSV_PROD_MST.PROD_TYPE;
                    tObjKSV_PROD_MST.SIZE_LOSS = tKSV_PROD_MST.SIZE_LOSS;

                    let tSQL99 = AFLib.updateTableSql(
                        'KSV_PROD_MST',
                        tObjKSV_PROD_MST,
                    );
                    tSQL99 += ` where prod_cd = '${tProdCd}' `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            if (args.opmode === 'ADD') {
                let tKSV_PROD_MST = args.datas[0];
                var sqlStr = `
                    SELECT
                        isnull(max(SEQ), 0) as max_seq
                    from
                        KSV_PROD_MST
                    where
                        PROD_CD like '${tPrefix}%%'
                `;

                let tRetArray = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tMax0 = tRetArray[0];
                var tMax = tMax0.max_seq + 1;
                let tMaxStr = '';
                if (tMax < 10) tMaxStr = '000' + tMax;
                else if (tMax < 100) tMaxStr = '00' + tMax;
                else if (tMax < 1000) tMaxStr = '0' + tMax;
                else tMaxStr = tMax;

                let tNewProdCd = tPrefix + 'P' + tMaxStr;

                var tObjKSV_PROD_MST = {};
                tObjKSV_PROD_MST.PROD_CD = tNewProdCd;
                tObjKSV_PROD_MST.STYLE_CD = tKSV_PROD_MST.STYLE_CD;
                tObjKSV_PROD_MST.PROD_TYPE = tKSV_PROD_MST.PROD_TYPE;
                tObjKSV_PROD_MST.COLOR = tKSV_PROD_MST.COLOR;
                tObjKSV_PROD_MST.YY = yyyy;
                tObjKSV_PROD_MST.SEQ = tMax;
                tObjKSV_PROD_MST.SIZE_LOSS = tKSV_PROD_MST.SIZE_LOSS;
                tObjKSV_PROD_MST.STATUS_CD = tKSV_PROD_MST.STATUS_CD;
                tObjKSV_PROD_MST.UPD_DATETIME = tRetDate;
                tObjKSV_PROD_MST.REG_DATETIME = tRetDate;
                tObjKSV_PROD_MST.REG_USER = tUserInfo.USER_ID;
                tObjKSV_PROD_MST.UPD_USER = tUserInfo.USER_ID;

                let tSQL99 = AFLib.createTableSql(
                    'KSV_PROD_MST',
                    tObjKSV_PROD_MST,
                );
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tObj = {};
                tObj.STYLE_CD = tStyle0.STYLE_CD;
                return tObj;
            } catch (e) {
                var tObj = {};
                tObj.STYLE_CD = `ERROR:${e.message}`;
                return tObj;
            }
        },
    },
};

export default moduleMutation_S0200_KCD_STYLE_EDT_KCD_STYLE;
