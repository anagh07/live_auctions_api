const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/room');

const router = express.Router();

const isAuth = require('../middlewares/isAuth');

// @route   POST /room
// @desc    Register user
// @access  public
router.post(
  '/',
  [
    body('username', 'Invalid name').trim().not().isEmpty(),
    body('email', 'Invalid email').trim().isEmail(),
    body('password', 'Enter valid password with min length of 6 char')
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.registerUser
);

module.exports = router;
