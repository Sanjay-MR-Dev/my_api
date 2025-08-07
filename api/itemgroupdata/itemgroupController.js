const express = require('express');
const router = express.Router();
const itemgroupService = require('../../service/rmItemGroupDataService');


router.post('/AllItemGroupList', (req, res) => {
    console.log("item group API hit correctly");
    itemgroupService.itemGroup(req, res);
});

module.exports = router;

