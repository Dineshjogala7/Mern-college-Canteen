const express = require("express");

const router = express.Router();
const {getMonthlySales} = require("../Controllers/sales")

router.get("/getsales",getMonthlySales);

module.exports = router;