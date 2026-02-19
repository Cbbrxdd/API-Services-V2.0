const { } = global.functions;

module.exports = {
    names: ["test"],
    ownerOnly: false,
    free: false,
    active: true,
    async execute(req, res, mongoData, ip, apiData) {

        const startTime = performance.now();

        try {
            
            const endTime = performance.now();
            const ping = (endTime - startTime) / 1000;

            apiData["Gecikme Süresi"] = `${ping.toFixed(2)} saniye`;
            const jsonData = { success: true, message: "API Services", info: apiData, data: result }

            return res.json(jsonData)

        } catch (error) {

            const endTime = performance.now();
            const ping = (endTime - startTime) / 1000;

            console.log(error)
            apiData["Gecikme Süresi"] = `${ping.toFixed(2)} saniye`;
            return res.json({ success: false, message: "Bir hata oluştu.", info: apiData })

        }

    }
};