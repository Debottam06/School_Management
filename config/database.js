const mongoose = require("mongoose");
require("dotenv").config();

const connectWithDB = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connection Successfull");
    })
    .catch((err) => {
        console.log("DB facing issues");
        console.error(err);
        process.exit(1);
    });
};

module.exports = connectWithDB;