const express = require('express');
const router = express.Router();
const {getpdf} = require("../components/pdf");


router.get('/pdf/:id', getpdf);

module.exports = router;