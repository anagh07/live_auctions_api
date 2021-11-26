const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middlewares/isAuth');
const authController = require('../controllers/auth');

const router = express.Router();

// @route   POST /auth
// @desc    Login with credentials
// @access  public
router.post(
  '/',
  [
    body('email', 'Invalid credentials').isEmail().trim(),
    body('password', 'Invalid credentials').exists().trim(),
  ],
  authController.login
);

module.exports = router;
