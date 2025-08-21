const express = require('express');
const router = express.Router();
const updateRmitemGroup = require('../../service/updateRmItemGroupService');


router.put('/updatevalue', (req, res) => {
    console.log("item group Delete API hit correctly");
    updateRmitemGroup.updatermItemGroup(req, res);
});

module.exports = router;

