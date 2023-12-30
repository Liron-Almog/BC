var express = require('express');
var router = express.Router();

/* GET products listing. */
const productsController = require('../controller/products');
router.get('/', productsController.getProducts);
//router.post('/', productsController.postUser);
//add putUser to update password when user forgot password

module.exports = router;
