const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user');

const router = express.Router();

const isAuth = require('../middlewares/isAuth');

// @route   POST /user
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

// @route   GET /user/:id
// @desc    Get user by id
// @access  protected
router.get('/:id', isAuth, userController.getUserById);

// @route   GET /user/purchased
// @desc    Get products purchased by user
// @access  protected
router.get('/products/purchased', isAuth, userController.purchasedProducts);

// @route   GET /user/posted
// @desc    Get product ads posted by user
// @access  protected
router.get('/products/posted', isAuth, userController.postedProducts);

module.exports = router;
