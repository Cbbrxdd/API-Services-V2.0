const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getData = async url => await (await fetch(url, { method: "GET", headers: { 'Content-Type': "application/json" } })).json();

const tcknKontrol = (tc) => {

    try {

        if (!tc) return false;
        if (!Number(tc) && !isNaN(tc)) tc = parseInt(tc);
        if (tc === 0) return false;
        if (tc % 2 !== 0) return false;

        const mernisStr = String(tc);
        if (mernisStr.length !== 11) return false;
        if (mernisStr.startsWith("0")) return false;

        const d = mernisStr.split('');
        const ilk10basamakToplami = parseInt(d[0]) + parseInt(d[1]) + parseInt(d[2]) + parseInt(d[3]) + parseInt(d[4]) +
            parseInt(d[5]) + parseInt(d[6]) + parseInt(d[7]) + parseInt(d[8]) + parseInt(d[9]);
        const basamak11 = parseInt(d[10]);

        if (ilk10basamakToplami % 10 !== basamak11) return false;

        const tekHanelerinToplami = parseInt(d[0]) + parseInt(d[2]) + parseInt(d[4]) + parseInt(d[6]) + parseInt(d[8]);
        const ciftHanelerinToplami = parseInt(d[1]) + parseInt(d[3]) + parseInt(d[5]) + parseInt(d[7]);

        const basamak10 = parseInt(d[9]);

        if ((((((tekHanelerinToplami * 7) - (ciftHanelerinToplami)) % 10) + 10) % 10) !== basamak10) return false;

        return true;

    } catch (error) {
        console.log(error)
        return false;
    };

};

const limitDuzelt = async (db) => {

    try {

        await global.schema.findOneAndUpdate({ Auth: db.Auth }, { sorgular: db.sorgular }, { upsert: true })

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }

};

const limitKontrol = async (db, sorguname) => {

    try {

        if (!db || !sorguname) return false;

        if (config.ownerAuth.includes(db.Auth)) return true;

        let sorgu = db.sorgular.find(x => x.name === sorguname)
        if (!sorgu) return false;

        let index = db.sorgular.findIndex(x => x.name === sorguname)
        if (sorgu.usedLimit >= sorgu.totalLimit) return false;

        db.sorgular[index].usedLimit = sorgu.usedLimit + 1;

        limitDuzelt(db)

        return true;

    } catch (error) {
        console.log(error)
        return false;
    }

};

module.exports = { getData, tcknKontrol, limitKontrol }