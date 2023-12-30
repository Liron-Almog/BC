var express = require('express');
var router = express.Router();

/* GET users listing. */
const carts = require('../controller/Carts');
router.post('/', carts.postAddCart);
router.get('/', carts.getCarts);
router.get('/items', carts.getCartItems);
router.delete('/deleteItem', carts.deleteItem);
router.delete('/deleteCart', carts.deleteCart);
//add putUser to update password when user forgot password

module.exports = router;
