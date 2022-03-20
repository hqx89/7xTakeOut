const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入users.js
const users = require("./routes/api/users");
// 引入merchants.js
const merchants = require("./routes/api/merchants");
// 引入orders.js
const orders = require("./routes/api/orders");

// DB config
const db = require("./config/keys").mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));

// 扩大请求内容
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);

// 使用routes
app.use("/api/users", users);
app.use("/api/merchants", merchants);
app.use("/api/orders", orders);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
