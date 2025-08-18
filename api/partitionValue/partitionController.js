const express = require('express');
const router = express.Router();
const partitionService = require('../../service/partitionService');

router.post('/value', (req, res) => {
    console.log("Partition update mark api hit correctly")
    partitionService.partition(req,res)
    } 
);

module.exports = router;

