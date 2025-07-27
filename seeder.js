// seed.js
const runAllSeeders = require("./seeder/index");
require("dotenv").config();

(async () => {
    try {
        await runAllSeeders();
    } catch (err) {
        console.error("❌ Seeder failed in seed.js:", err);
        process.exit(1);
    }
})();
