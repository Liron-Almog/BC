var express = require('express');
var router = express.Router();

/* GET products listing. */
const chainsController = require('../controller/chains');
router.get('/', chainsController.getChains);
//router.post('/', productsController.postUser);
//add putUser to update password when user forgot password

module.exports = router;
