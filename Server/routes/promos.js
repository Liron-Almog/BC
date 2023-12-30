var express = require('express');
var router = express.Router();

/* GET products listing. */
const promosController = require('../controller/promos');
router.get('/', promosController.getPromos);
//router.post('/', productsController.postUser);
//add putUser to update password when user forgot password

module.exports = router;
