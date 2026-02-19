const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
mongoose.connect(global.config.mongoURI, {});

mongoose.connection.on('connected', async () => {
    console.log(`[SYSTEM] MongoDB connected!`);
});