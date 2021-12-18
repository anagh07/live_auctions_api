const express = require('express');
const router = express.Router();
const multer = require('multer');
const isAuth = require('../middlewares/isAuth');
const { uploadFile, getFileStream } = require('../utils/s3');

const upload = multer({ dest: 'uploads' });

// @route   POST /upload/image
// @desc    Upload product images
// @access  protected
router.post('/image', isAuth, upload.single('image'), async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  res.status(200).json({ imagePath: `/upload/image/${result.Key}` });
});

// @route   GET /upload/image/:key
// @desc    Get image with key
// @access  protected
router.get('/image/:key', async (req, res) => {
  const readStream = getFileStream(req.params.key);
  readStream.pipe(res);
});

module.exports = router;
