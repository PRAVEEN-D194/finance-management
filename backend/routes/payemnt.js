const express = require("express");
const {getpayment} = require("../components/payment");
const router = express.Router();


router.get('/payment/:id', getpayment);
// router.put('/payment/:id', updatepayment);
// router.post('/payment/:id', addpayment);

module.exports = router;