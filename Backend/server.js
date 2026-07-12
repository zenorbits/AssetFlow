const connectToDb = require('./src/db/db');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

connectToDb()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.log("Failed to connect err", err);
        process.exit(1);
    });