const express = require('express');
const app = express();
const auth_router = require("./routes/auth_router")
const product_router = require("./routes/product_router");
const order_router = require('./routes/order_router')
app.use(express.json());
app.use("/auth", auth_router);
app.use("/product", product_router);
app.use("/order", order_router);
// app.use("/reservation", reservation_router);


module.exports = app;