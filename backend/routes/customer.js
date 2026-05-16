//this for customer router
const express = require("express");
const router = express.Router();
const {getallcustomer, postcustomer, deletecustomer} = require("../components/customer");

router.get('/customer', getallcustomer);
router.post('/customer', postcustomer);
router.delete('/customer/:id', deletecustomer);

module.exports = router;