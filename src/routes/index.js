const router = require("express").Router();
const ImageController = require('../controllers/imageController');
const MulterConfig = require('../libs/multerConfig');

router.post('/images', MulterConfig.upload, ImageController.createImage);

module.exports = router;