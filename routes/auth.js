const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const isAuth = require('../middlewares/isAuth');

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

// @route   GET /auth
// @desc    Get logged in user from token
// @access  protected
router.get('/', isAuth, authController.getUser);

module.exports = router;
