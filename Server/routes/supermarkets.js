var express = require('express');
var router = express.Router();

/* GET products listing. */
const supermarketsController = require('../controller/supermarkets');
router.get('/', supermarketsController.getSupermarkets);
//router.post('/', productsController.postUser);
//add putUser to update password when user forgot password

module.exports = router;
