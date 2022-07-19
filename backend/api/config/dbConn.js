const mongoose = require("mongoose");
require("dotenv").config();

const dbConn = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = dbConn;
