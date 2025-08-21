const express = require('express');
const router = express.Router();
const deleteRmitemMaster = require('../../service/deleteRmItemMasterService');


router.delete('/delete', (req, res) => {
    console.log("item master Delete API hit correctly");
    deleteRmitemMaster.deletermItemMaster(req, res);
});

module.exports = router;

