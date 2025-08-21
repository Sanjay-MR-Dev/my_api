const express = require('express');
const router = express.Router();
const deleteRmitemGroup = require('../../service/deleteRmItemGroupService');


router.delete('/delete', (req, res) => {
    console.log("item group Delete API hit correctly");
    deleteRmitemGroup.deletermItemGroup(req, res);
});

module.exports = router;

