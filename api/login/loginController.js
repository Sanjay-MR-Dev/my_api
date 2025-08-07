const express = require('express');
const router = express.Router();
const userService = require('../../service/userService');

router.post('/',(req,res) =>
{
    console.log("Api Login Hit");
    userService.login(req,res);
});


module.exports = router;
















