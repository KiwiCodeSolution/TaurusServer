const express = require('express');
const app = express();
const auth_router = require("./routes/auth_router")
const product_router = require("./routes/product_router");
app.use(express.json());
app.use("/auth", auth_router);
app.use("/product", product_router);


module.exports = app;