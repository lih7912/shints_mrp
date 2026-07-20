const router = require('express').Router;
const dbNameRouter = router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

dbNameRouter.get('/db-name', async (req, res) => {
    try {
        const dbName = await prisma.$queryRaw`SELECT DB_NAME() AS name`;
        res.json({ dbName: dbName[0].name });
    } catch (e) {
        res.status(500).json({ error: 'DB명 조회 실패', detail: String(e) });
    }
});

module.exports = dbNameRouter;
