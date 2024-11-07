const router = require("express").Router();
const ImageController = require('../controllers/imageController');
const MulterConfig = require('../libs/multerConfig');

router.post('/images', MulterConfig.upload, ImageController.createImage);
router.get('/images', ImageController.getAllImages);
router.get('/images/:id', ImageController.getImage);

module.exports = router;