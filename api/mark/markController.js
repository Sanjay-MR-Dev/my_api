const express = require('express');
const router = express.Router();
const markService = require('../../service/markService');

router.post('/update', (req, res) => {
    console.log("update mark api hit correctly")
    markService.markUpdate(req,res)
    } 
);

module.exports = router;



