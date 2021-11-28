const express = require('express');
const { body } = require('express-validator');
const roomController = require('../controllers/room');

const router = express.Router();

const isAuth = require('../middlewares/isAuth');

// @route   POST /room/join/:roomId
// @desc    Add user to a room
// @access  protected
router.post('/join/:roomId', isAuth, roomController.joinRoom);

// @route   GET /room/:roomId
// @desc    Get room details
// @access  protected
router.get('/:roomId', isAuth, roomController.getRoom);

module.exports = router;
