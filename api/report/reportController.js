const express = require('express');
const router = express.Router();
const reportService = require('../../service/reportService')

router.post('/billsummary', (req, res) => {
    console.log("bill api hit correctly")
    reportService.getDayAnalyse(req,res)
    } 
);

module.exports = router;



