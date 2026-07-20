const router = require('express').Router;
const mrpWorkStatus = router();
const mssqlExec = require('./mssqlExec').mssqlExec;

// MRP 작업상태
mrpWorkStatus.all('/mrp/working_status', async (req, res) => {
    let userId = req.body.userId;
    let query = `
        select
            count(*) as count
        from
            KCD_JOBMONITOR
        where
            user_id = '${userId}'
    `;

    let result = await mssqlExec(query);

    if (result[0].count) {
        res.send(true); //작업중
    } else {
        res.send(false); //작업없음
    }
});

// MRP 작업상태 플래그 해제
mrpWorkStatus.all('/mrp/working_status/init', async (req, res) => {
    let userId = req.body.userId;
    let poCd = req.body.poCd;

    await mssqlExec(`
        delete from KCD_JOBMONITOR
        where
            user_id = '${userId}'
    `);
    await mssqlExec(
        `
            update KSV_PO_MST
            set
                work_status = ''
            where
                po_cd = '${poCd}'
        `,
    );

    res.send(true);
});

module.exports = mrpWorkStatus;
