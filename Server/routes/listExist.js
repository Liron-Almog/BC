var express = require('express');
var router = express.Router();

/* GET products listing. */
const listExistController = require('../controller/listExist');
router.get('/', listExistController.getListExist);


module.exports = router;
