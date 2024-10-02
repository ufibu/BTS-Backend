const express = require('express');
const validate = require('../../middlewares/validate');
const AuthValidation = require('../../validations/auth.validation')
const AuthController = require('../../controllers/auth.controller');
const router = express.Router();

router.post('/login', validate(AuthValidation.login), AuthController.loginAccount);
router.post('/register', validate(AuthValidation.register), AuthController.registerAccount);
router.get('/logout', AuthController.logoutAccount);

module.exports = router;