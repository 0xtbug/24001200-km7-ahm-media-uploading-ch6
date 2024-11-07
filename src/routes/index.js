const router = require("express").Router();
const ImageController = require('../controllers/imageController');
const MulterConfig = require('../libs/multerConfig');

router.get('/', (req, res) => {
    res.render('index');
});

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Uploads a new image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: file
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Bad request
 */
router.post('/images', MulterConfig.upload, ImageController.createImage);

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Retrieves all images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Images retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/images', ImageController.getAllImages);

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Retrieves an image by ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Image retrieved successfully
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
router.get('/images/:id', ImageController.getImage);

/**
 * @swagger
 * /images/{id}:
 *   put:
 *     summary: Updates an image
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: file
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Image updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
router.put('/images/:id', MulterConfig.upload, ImageController.updateImage);

/**
 * @swagger
 * /images/{id}:
 *   delete:
 *     summary: Deletes an image
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
router.delete('/images/:id', ImageController.deleteImage);

module.exports = router;