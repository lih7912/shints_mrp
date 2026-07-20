const router = require('express').Router;
const userInfo = router();
const mssqlExec = require('./mssqlExec').mssqlExec;

userInfo.all('/auth', async (req, res) => {
    let userId = req.body.userId;
    let authCd = req.body.authCd;
    let menuName = req.body.menuName;

    let authClause = '';
    if (authCd >= 0) authClause = `and auth_cd = ${authCd}`;

    let query = `
        select
            *
        from
            AF_AUTH
        where
            part_cd = (
                select
                    part
                from
                    kcd_user
                where
                    user_id = '${userId}'
            ) ${authClause}
            and menu_name like '%${menuName}%'
    `;

    let afAuthPart = await mssqlExec(query);

    if (menuName !== '') {
        query = `
            select
                *
            from
                AF_AUTH_USER
            where
                user_id = '${userId}'
                and menu_name = '${menuName}'
        `;
    } else {
        query = `
            select
                *
            from
                AF_AUTH_USER
            where
                user_id = '${userId}'
        `;
    }
    

    let afAuthUser = await mssqlExec(query);

    res.send(JSON.stringify({ afAuthPart, afAuthUser }));
});

userInfo.all('/auth/user_info', async (req, res) => {
    let userId = req.body.userId;
    let query = `
        select
            a.*,
            b.cd_name as rank_name
        from
            kcd_user a,
            kcd_code b
        where
            1 = 1
            and a.user_id = '${userId}'
            and a.rank = b.cd_code
            and b.cd_group = 'RANK'
    `;
    res.send(JSON.stringify(await mssqlExec(query)));
});

userInfo.all('/auth/basic_info', async (req, res) => {
    let searchClause =
        'select distinct c.cd_name as part_name, c.cd_code as part_cd';
    let query = `${searchClause}
                from AF_AUTH a, kcd_code c
                where 1=1
                and c.cd_group = 'part'
                and a.part_cd = c.cd_code
                and a.part_cd not in ('S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S12')
                order by part_name`;

    let partCdList = await mssqlExec(query);
    partCdList.unshift({ part_name: '영업팀-내수포함', part_cd: 'S01' });

    searchClause = 'select distinct b.user_id, b.part, c.cd_name';
    query = `${searchClause}
                from AF_AUTH a, KCD_USER b, kcd_code c
                where 1=1
                and a.part_cd = b.part
                and c.cd_group = 'part'
                and a.part_cd = c.cd_code
                order by user_id`;
    let userIdList = await mssqlExec(query);

    searchClause = 'select distinct b.user_name, b.part, c.cd_name';
    query = `${searchClause}
                from AF_AUTH a, KCD_USER b, kcd_code c
                where 1=1
                and a.part_cd = b.part
                and c.cd_group = 'part'
                and a.part_cd = c.cd_code
                order by user_name`;
    let userNameList = await mssqlExec(query);

    res.send(JSON.stringify({ partCdList, userIdList, userNameList }));
});

userInfo.all('/auth/list', async (req, res) => {
    let whereClause = '';
    let query = '';
    let partName = req.body.partName;
    let partCd = req.body.partName;
    let userId = req.body.userId;
    let userName = req.body.userName;

    if (partCd !== 'null') {
        whereClause = `c.cd_code like '${partCd}'`;
        query = `
            select
                a.menu_name,
                a.part_cd,
                c.cd_name as part_name,
                a.AUTH_CD
            from
                AF_AUTH a,
                kcd_code c
            where
                1 = 1
                and c.cd_group = 'part'
                and a.part_cd = c.cd_code
                and ${whereClause}
            order by
                a.menu_name
        `;
    }

    if (userId !== null) {
        query = `
            select
                a.menu_name,
                b.AUTH_CD
            from
                (
                    select distinct
                        menu_name
                    from
                        AF_AUTH
                ) a
                left join AF_AUTH_USER b on a.menu_name = b.menu_name
                and b.user_id = '${userId}'
            order by
                a.menu_name
        `;
    }

    if (userName !== null) {
        query = `
            select
                a.menu_name,
                b.AUTH_CD
            from
                (
                    select distinct
                        menu_name
                    from
                        AF_AUTH
                ) a
                left join AF_AUTH_USER b on a.menu_name = b.menu_name
                and b.user_id in (
                    select
                        user_id
                    from
                        KCD_USER
                    where
                        user_name = '${userName}'
                )
            order by
                a.menu_name
        `;
    }

    console.log(query);

    res.send(JSON.stringify(await mssqlExec(query)));
});

userInfo.all('/auth/update', async (req, res) => {
    let editMode = req.body.editMode;
    let menuName = req.body.menuName;
    let target = req.body.target;
    let authCd = req.body.authCd;
    let query = '';

    if (editMode == 'part') {
        query = `
            update af_auth
            set
                auth_cd = ${authCd}
            where
                menu_name = '${menuName}'
                and part_cd = '${target}'
        `;

        if (target == 'S01') {
            query = `
                update af_auth
                set
                    auth_cd = ${authCd}
                where
                    menu_name = '${menuName}'
                    and part_cd in ('S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S12')
            `;
        }

        res.send(JSON.stringify(await mssqlExec(query)));
    } else {
        let userId = target;
        if (editMode == 'userName') {
            query = `
                select
                    user_id
                from
                    kcd_user
                where
                    user_name = '${target}'
            `;
            userId = (await mssqlExec(query))[0].user_id;
        }

        if (Number(authCd) === 0) {
            query = `
                delete from
                    af_auth_user
                where
                    menu_name = '${menuName}'
                    and user_id = '${userId}'
            `;
            res.send(JSON.stringify(await mssqlExec(query)));
            return;
        }

        query = `
            insert into
                af_auth_user
            values
                ('${menuName}', '${userId}', ${authCd})
        `;

        let result = await mssqlExec(query);

        if (result.error) {
            query = `
                update af_auth_user
                set
                    auth_cd = ${authCd}
                where
                    1 = 1
                    and menu_name = '${menuName}'
                    and user_id = '${userId}'
            `;
            res.send(JSON.stringify(await mssqlExec(query)));
        } else {
            res.send(JSON.stringify(result));
        }
    }
});

userInfo.all('/login_record', async (req, res) => {
    let userId = req.body.userId;
    let query = `
        insert into
            AF_LOGIN_RECORD
        values
            ('${userId}', GETDATE())
    `;
    res.send(JSON.stringify(await mssqlExec(query)));
});

userInfo.all('/change_password', async (req, res) => {
    let userId = req.body.userId;
    let currentPassword = req.body.currentPassword;
    let newPassword = req.body.newPassword;
    let query = `
        update KCD_USER
        set
            passwd = '${newPassword}'
        where
            user_id = '${userId}'
            and passwd = '${currentPassword}'
    `;
    res.send(JSON.stringify(await mssqlExec(query)));
});

userInfo.all('/get_password', async (req, res) => {
    let userId = req.body.userId;
    let query = `
        select
            passwd
        from
            KCD_USER
        where
            user_id = '${userId}'
    `;
    res.send(JSON.stringify(await mssqlExec(query)));
});

module.exports = userInfo;
