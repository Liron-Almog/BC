var express = require('express');
var router = express.Router();

/* GET users listing. */
const registerController = require('../controller/user');
router.get('/', registerController.getUser);
router.post('/', registerController.postUser);
//add putUser to update password when user forgot password

module.exports = router;
