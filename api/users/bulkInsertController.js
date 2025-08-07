const express = require('express');
const router = express.Router();
const bulkInsertBills = require('../../service/bulkInsertService')


router.post('/bulk-insert', (req, res) => {
    console.log("bill api hit correctly")
    bulkInsertBills.bulkInsertBills(req,res)
    } 
);

module.exports = router;

