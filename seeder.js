// seed.js
const runAllSeeders = require("./seeder/index"); // index.js is auto-resolved
require("dotenv").config();

(async () => {
    try {
        await runAllSeeders(); // This already handles DB connection and exit
    } catch (err) {
        console.error("❌ Seeder failed in seed.js:", err);
        process.exit(1);
    }
})();
