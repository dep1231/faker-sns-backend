const express = require("express");
const serverlessExpress = require("@vendia/serverless-express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv").config();
const { readdirSync } = require("fs");
const userRouter = require("./routes/User");
const postRouter = require("./routes/Post");
const uploadRouter = require("./routes/Upload");
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors("http://localhost:3000"));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/upload", uploadRouter);
app.use("/", (req, res) => res.send(`root`));
app.use("/hello", (req, res) => res.send(`hello`));

// routes

// readdirSync("./routes").map((route) =>
//   app.use("/", require("./routes/" + route))
// );

// database

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoDB接続完了"))
  .catch((error) => console.log("mongoDB接続エラー"));

app.listen(PORT, () => {
  console.log("server起動");
});

module.exports = app;
