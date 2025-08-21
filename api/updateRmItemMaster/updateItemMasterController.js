const express = require('express');
const router = express.Router();
const updateRmItemMaster = require('../../service/updateRmItemMasterService');


router.put('/updatevalue', (req, res) => {
    console.log("Update item group API hit correctly");
    updateRmItemMaster.updatermItemMaster(req, res);
});

module.exports = router;

