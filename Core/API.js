const customerSchema = global.schema = require("./Databases/Schemas/customerSchema");
const express = require('express'); const app = express();
const moment = require("moment"); moment.locale("tr");
const path = require("node:path");

app.set("json spaces", 2); app.use(express.json()); app.use((req, res, next) => {

    const { host, sifre, token } = req.headers

    if (host !== "localhost:" + global.config.port) {
        if (sifre !== global.config.sifre) return;
        if (token !== global.config.token) return;
    }
    if (["api.example.com", "localhost:" + global.config.port].includes(host)) { return next() } else return;

});

app.get("/api/:auth/:api", async (req, res) => {
    try {

        const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip.replace("::ffff:", ""); const { api, auth } = req.params;
        const cmd = global.apiler.get(api.toLowerCase()); if (!cmd) return res.json({ success: false, message: `Belirtilen (${api}) API bulunamadı.` });

        if (cmd.ownerOnly && !global.config.ownerAuth.includes(auth)) return res.json({ success: false, message: `Belirtilen (${api}) API sadece kurucular tarafından kullanılabilir.` });
        if (!cmd.active) return res.json({ success: false, message: `Belirtilen '${api}' API şu anda kullanıma kapalı.` });

        const mongoData = await customerSchema.findOne({ Auth: auth }); if (!mongoData) return res.json({ success: false, message: `Belirtilen (${auth}) Auth kodu veritabanında bulunamadı.` });
        const izin = await mongoData.izinKontrol(res, res, api.toLowerCase(), ip); if (!izin) return;
        const limit = await global.functions.limitKontrol(mongoData, izin["API İsmi"]); if (!limit) return res.json({ success: false, message: `Belirtilen (${api}) API için kullanım limitiniz doldu. Türkiye saati ile 00:00'da yenilenecektir.` });

        return cmd.execute(req, res, mongoData, ip, izin);

    } catch (e) { console.log("[SERVER] Error: " + e.message); return res.json({ success: false, message: "Sistemde bir sorun oluştu. Lütfen yöneticiye bildiriniz." }); }
})

app.get("/", (req, res) => { const filePath = path.join(__dirname, "./Views/index.html"); res.sendFile(filePath) });
app.get("*", (req, res) => { res.status(404).type("json").send(JSON.stringify({ success: false, status: 404, message: "Yanlış Dizindesiniz! Eğer bir sorun olduğunu düşünüyorsanız yöneticiler ile iletişime geçiniz." })) });
app.listen(global.config.port, "0.0.0.0", () => console.log(`[SERVER] ${config.port} Port connected!`));