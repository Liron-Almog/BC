var express = require('express');
var router = express.Router();

/* GET users listing. */
const feedbackController = require('../controller/feedback');
router.post('/', feedbackController.postFeedback);
//add putUser to update password when user forgot password

module.exports = router;
