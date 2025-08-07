const express = require('express');
const router = express.Router();
const itemgroupService = require('../../service/trn_rm_get_item_service');


router.post('/value', (req, res) => {
    console.log("item group API hit correctly");
    itemgroupService.getrmItemGroup(req, res);
});

module.exports = router;

