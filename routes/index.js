const express = require('express');
const router = express.Router();
const loginRoute = require('../api/login/loginController');
const reportRoute = require('../api/report/reportController');
const bulkInsertRoute = require('../api/users/bulkInsertController');
const validateSchema = require('../middleware/joiSchemaValidation');
const {billSchema, loginSchema} =  require('../middleware/validation');
const markRoute = require('../api/mark/markController');
const partitionValue = require('../api/partitionValue/partitionController');
const rmItemMaster = require('../api/rmItemMasterdata/itemgroupController');
const getrmItemMaster = require('../api/getRmItemMaster/itemGroupContainer');
const rmitemgroup = require ('../api/rmItemGroupdata/rmitemgroup');
const getrmitemgroup =require('../api/GetRmItemGroup/getrmitemgroup');
const deletermItemGroup = require('../api/deleteRmitemGroup/deleteItemGroupController');
const deletermItemMaster = require('../api/deleteRmItemMaster/deleteItemMasterController');
const updatermItemGroup = require('../api/updateRmItemGroup/updateItemGroupController')
const updatermItemMaster = require('../api/updateRmItemMaster/updateItemMasterController')

router.use('/login',validateSchema(loginSchema),loginRoute);
router.use('/report', reportRoute);
router.use('/bill',validateSchema(billSchema),bulkInsertRoute)
router.use('/mark',markRoute);
router.use('/insert',partitionValue);

router.use('/itemgroup',rmitemgroup);
router.use('/getitemgroup',getrmitemgroup);
router.use('/updateitemgroup',updatermItemGroup);
router.use('/deleteitemgroup',deletermItemGroup);

router.use('/itemmaster',rmItemMaster);
router.use('/getitemmaster',getrmItemMaster);
router.use('/updateitemmaster',updatermItemMaster);
router.use('/deleteitemmaster',deletermItemMaster);

module.exports = router;
