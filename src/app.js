const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const multer = require("multer");

const auth_router = require("./routes/auth_router")
const product_router = require("./routes/product_router");
const order_router = require('./routes/order_router')
const delivey_router = require('./routes/delivery_router')
const feedback_router = require('./routes/feedback_router')
const reservations_router = require('./routes/reservation_router')
const promotions_router = require('./routes/promotions_router')
const upload_router = require("./routes/upload_router");
app.use(cors());
app.use(express.json());

app.use("/uploads", upload_router);
app.use("/auth", auth_router);
app.use("/product", product_router);
app.use("/order", order_router);
app.use("/delivery", delivey_router);
app.use("/feedback", feedback_router);
app.use("/reservations", reservations_router);
app.use("/sale", reservations_router);
app.use("/promotions", promotions_router);

app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});
app.use(async (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		err.status = 400;
	}

	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});
module.exports = app;