const express = require('express');
const router = express.Router();
const app = express();
const {loginForm , registerForm ,loginUser , registerUser} = require("../controllers/UserController.js");

router.route('/').get(loginForm);
router.route('/').post(loginUser);
router.route('/register').get(registerForm);
router.route('/register').post(registerUser);

module.exports = router;
