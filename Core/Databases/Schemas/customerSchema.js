const mongoose = require("mongoose");
const moment = require("moment");
moment.locale("tr");

const customerSchema = new mongoose.Schema({

    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, default: null },
    RegisterDate: { type: Number, default: Date.now() },
    Subscription: {
        Type: { type: String, default: "Müşteri" },
        StartTimestamp: { type: Number, default: Date.now() },
        GlobalLimit: { type: Number, default: 0 },
        LimitedQuery: { type: Array, default: [] }
    },
    Auth: { type: String, required: true },
    IP: { type: String, required: true },
    sorgular: { type: Array, default: [] },

});  

customerSchema.methods.izinKontrol = async function (req, res, apiName, ip) {

    try {

        if (ip !== this.IP) return res.json({ success: false, message: `IP'niz (${ip}) veritabanında kullanılan IP ile eşleşmemektedir.` });

        const api = global.apiler.get(apiName);
        if (!api) return res.json({ success: false, message: `Belirtilen (${apiName}) API bulunamadı.` });

        if (global.config.adminRole.includes(this.Subscription.Type)) 
        return { "API İsmi": apiName.toUpperCase(), "Başlangıç Tarihi": "Sınırsız", "Bitiş Tarihi": "Sınırsız", "Toplam Limit": "Sınırsız", "Kalan Limit": "Sınırsız" }

        const sorgu = this.sorgular.find(sorgu => api.names.some(name => name.toUpperCase() === sorgu.name));
        if (!sorgu) return res.json({ success: false, message: `Belirtilen (${apiName}) API için kullanma izni bulunamadı.` });
        if (!sorgu.active) return res.json({ success: false, message: `Belirtilen (${apiName}) API dondurulmuş kullanmak için tekrar aktif etmeniz gerekmekte.` });
        if (sorgu.endTimestamp - Date.now() <= 0) return res.json({ success: false, message: `Belirtilen (${apiName}) API için süreniz doldu.` });
        if (sorgu.usedLimit > sorgu.totalLimit) return res.json({ success: false, message: `Belirtilen (${apiName}) API için kullanım limitiniz doldu. Türkiye saati ile 00:00'da yenilenecektir.` });

        return {
            "API İsmi": sorgu.name,
            "Başlangıç Tarihi": `${moment(sorgu.startTimestamp).format("L")} (${moment(sorgu.startTimestamp).fromNow()})`,
            "Bitiş Tarihi": `${moment(sorgu.endTimestamp).format("L")} (${moment(sorgu.endTimestamp).fromNow()})`,
            "Toplam Limit": sorgu.totalLimit,
            "Kalan Limit": sorgu.totalLimit - sorgu.usedLimit - 1,
        };

    } catch (err) { console.log(err); return false; }

};

module.exports = mongoose.model("customer", customerSchema);