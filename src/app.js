const express = require('express');
const app = express();
const auth_router = require("./routes/auth_router")
const product_router = require("./routes/product_router");
const order_router = require('./routes/order_router')
const delivey_router = require('./routes/delivery_router')
const feedback_router = require('./routes/feedback_router')
const reservations_router = require('./routes/reservation_router')
app.use(express.json());
app.use("/auth", auth_router);
app.use("/product", product_router);
app.use("/order", order_router);
app.use("/delivery", delivey_router);
app.use("/feedback", feedback_router);
app.use("/reservations", reservations_router);



module.exports = app;