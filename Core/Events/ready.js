const { CronJob } = require('cron');
const moment = require('moment'); moment.locale('TR-tr')
const fs = require('node:fs');

module.exports = {
    name: "ready",
    async execute(client) {

        console.warn(`[BOT] ${client.user.username} is ready!`)

        const dailyCheck = new CronJob("0 0 * * *", async () => {

            console.log("[SERVER] Günlük sorgu kontrolü başladı."); let data = await global.schema.find().lean() || null; if (!data) return;
            const tarih = moment().format('YYYY-MM-DD-HH-mm'); const backupData = JSON.stringify(data, null, 2); fs.writeFileSync(`./Core/Databases/Backup/${tarih}.json`, backupData, 'utf-8'); console.log('[SERVER] Yedekleme tamamlandı');
            await Promise.all(data.map(async (db) => {

                try {

                    if (!db.sorgular || !db.sorgular.length > 0) return;
                    await Promise.all(db.sorgular.map(async (sorgu, i) => { if (!sorgu?.active) return; if (sorgu.endTimestamp - Date.now() <= 0) { db.sorgular.splice(i, 1) } else return }));
                    if (db.sorgular.length > 0) db.sorgular.map(x => x.usedLimit = 0);
                    await global.schema.findOneAndUpdate({ Auth: db.Auth }, { sorgular: db.sorgular });

                } catch { }

            })); console.log("[SERVER] Günlük sorgu kontrolü tamamlandı.");

        }, null, true, "Europe/Istanbul"); dailyCheck.start();

    }
}