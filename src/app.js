const express = require('express');
const app = express();
const auth_router = require("./routes/auth_router")

app.use(express.json());
app.use("/auth", auth_router);


module.exports = app;