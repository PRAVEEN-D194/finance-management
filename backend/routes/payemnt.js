const express = require("express");
const {getpayment, addpayment,deletepayment, updatepayment, getsingle} = require("../components/payment");
const router = express.Router();


router.get('/payment/:id', getpayment);
router.get('/singlepay/:id', getsingle);
router.put('/payment/:id', updatepayment);
router.post('/payment/:id', addpayment);
router.delete('/payment/:id',deletepayment);
module.exports = router;