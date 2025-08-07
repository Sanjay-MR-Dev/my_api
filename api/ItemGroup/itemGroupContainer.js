const express = require('express');
const router = express.Router();
const itemgroupService = require('../../service/rmItemGroupService');


router.post('/list', (req, res) => {
    console.log("item group API hit correctly");
    itemgroupService.rmItemGroup(req, res);
});

module.exports = router;

