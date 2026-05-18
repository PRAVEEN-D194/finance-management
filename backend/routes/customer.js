//this for customer router
const express = require("express");
const router = express.Router();
const {getallcustomer, postcustomer, deletecustomer, getsinglecustomer, updatecustomer} = require("../components/customer");

router.get('/customer', getallcustomer);
router.get('/customer/:id', getsinglecustomer);
router.post('/customer', postcustomer);
router.put('/customer/:id', updatecustomer);
router.delete('/customer/:id', deletecustomer);

module.exports = router;