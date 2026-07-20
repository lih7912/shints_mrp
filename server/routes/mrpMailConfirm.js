const router = require('express').Router;
const mrpMailConfirm = router();
const axios = require('axios');
const mssql = require('./mssqlExec');

mrpMailConfirm.get('/mrp_mail_confirm', async (req, res) => {
    const { userId, poCd, poSeq, fileName, fileUrl } = req.query;

    if (!userId || !poCd || !poSeq || !fileName || !fileUrl) {
        return res.status(400).send('Missing required query parameters.');
    }

    try {
        const response = await axios.get(fileUrl, {
            responseType: 'stream',
        });

        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${fileName}"`,
        );
        res.setHeader('Content-Type', response.headers['content-type']);
        response.data.pipe(res);

        /*** KSV_PO_MST DB에 메일 수신기록 ***/

        // MRP_PACK_FLAG에 USER_ID가 있으면 기록하지 않고 SKIP
        let mrpPackFlag = (
            await mssql.mssqlExec(
                `
                    select
                        MRP_PACK_FLAG
                    from
                        KSV_PO_MST
                    where
                        po_cd = '${poCd}'
                `,
            )
        )[0];
        if (mrpPackFlag.MRP_PACK_FLAG === userId) {
            return;
        }

        let kcdBuyerTeamInfo = (
            await mssql.mssqlExec(`
                SELECT
                    a.*,
                    b.email
                from
                    KCD_BUYER_TEAM_INFO a,
                    KCD_USER b
                where
                    1 = 1
                    and a.user_id = b.USER_ID
                    and a.buyer_cd = (
                        select
                            top 1 left(ORDER_CD, 2)
                        from
                            ksv_po_mem
                        where
                            po_cd = '${poCd}'
                            and po_seq = '1'
                    )
                    and a.user_id = '${userId}'
            `)
        )[0];

        let jobColumn = null;
        if (
            kcdBuyerTeamInfo.FACTORY === '서울' &&
            kcdBuyerTeamInfo.TEAM === 'SMC'
        ) {
            jobColumn = 'DOMESTIC_FLAG';
        }

        if (
            kcdBuyerTeamInfo.FACTORY === 'BVT' &&
            kcdBuyerTeamInfo.TEAM === 'PUR'
        ) {
            jobColumn = 'IMPORT_FLAG';
        }

        if (
            kcdBuyerTeamInfo.FACTORY === 'BVT' &&
            kcdBuyerTeamInfo.TEAM === 'PUR1'
        ) {
            jobColumn = 'FACTORY_FLAG';
        }

        if (jobColumn) {
            await mssql.mssqlExec(`
                UPDATE KSV_PO_MST
                SET
                    ${jobColumn} = '${userId}'
                WHERE
                    PO_CD = '${poCd}'
            `);
        }
    } catch (error) {
        console.error('Error downloading file:', error.message);
        res.status(500).send('Error downloading the file.');
    }
});

module.exports = mrpMailConfirm;
