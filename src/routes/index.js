const router = require("express").Router();
const ImageController = require('../controllers/imageController');
const MulterConfig = require('../libs/multerConfig');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/images', MulterConfig.upload, ImageController.createImage);
router.get('/images', ImageController.getAllImages);
router.get('/images/:id', ImageController.getImage);
router.put('/images/:id', MulterConfig.upload, ImageController.updateImage);
router.delete('/images/:id', ImageController.deleteImage);

module.exports = router;