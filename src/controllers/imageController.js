const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const imagekit = require('../config/imagekit');

class ImageController {
    static async createImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ 
                    status: false,
                    message: "Image is required",
                    data: null
                });
            }

            const { title, description } = req.body;

            const existingImage = await prisma.image.findFirst({
                where: {
                    title: title
                }
            });

            if (existingImage) {
                return res.status(400).json({
                    status: false,
                    message: "An image with this title already exists",
                    data: null
                });
            }
            
            const uploadResponse = await imagekit.upload({
                file: req.file.buffer.toString('base64'),
                fileName: `${Date.now()}-${req.file.originalname}`,
                folder: '/uploads'
            });

            const image = await prisma.image.create({
                data: {
                    title,
                    description,
                    url: uploadResponse.url,
                },
            });

            res.status(201).json({
                status: true,
                message: "Image created successfully",
                data: image
            });
        } catch (error) {
            console.error('Image creation error:', error);
            res.status(500).json({
                status: false,
                message: "Failed to create image",
                data: null
            });
        }
    }
}

module.exports = ImageController; 