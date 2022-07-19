const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConn = require("./config/dbConn");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

dotenv.config();
app.use(express.json());
dbConn();

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Listening on port " + process.env.SERVER_PORT);
});
