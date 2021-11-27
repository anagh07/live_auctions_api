const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/room');

const router = express.Router();

const isAuth = require('../middlewares/isAuth');

// TODO:
// @route   POST /room
// @desc    Add user to a room
// @access  protected

// TODO:
// @route   delete /room/:roomId/:userId
// @desc    Remove user from room
// @access  protected

module.exports = router;
