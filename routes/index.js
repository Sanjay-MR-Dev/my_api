const express = require('express');
const router = express.Router();
const loginRoute = require('../api/login/loginController');
const reportRoute = require('../api/report/reportController');
const bulkInsertRoute = require('../api/users/bulkInsertController');
const validateSchema = require('../middleware/joiSchemaValidation');
const {billSchema, loginSchema} =  require('../middleware/validation');
const markRoute = require('../api/mark/markController');
const partitionValue = require('../api/partitionValue/partitionController');
const itemgroupValue = require('../api/itemgroupdata/itemgroupController');
const getItemgroupValue = require('../api/ItemGroup/itemGroupContainer');
const rmitemgroup = require ('../api/RmItemGroup/rmitemgroup');
const getrmitemgroup =require('../api/GetRmItemGroup/getrmitemgroup');

router.use('/login',validateSchema(loginSchema),loginRoute);
router.use('/report', reportRoute);
router.use('/bill',validateSchema(billSchema),bulkInsertRoute)
router.use('/mark',markRoute);
router.use('/insert',partitionValue);
router.use('/itemmaster',itemgroupValue);
router.use('/getitemmaster',getItemgroupValue);
router.use('/itemgroup',rmitemgroup)
router.use('/getitemgroup',getrmitemgroup)

module.exports = router;



//router.use('/login',validateSchema(loginSchema),loginRoute);