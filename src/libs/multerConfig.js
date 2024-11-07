const multer = require('multer');

class MulterConfig {
    static storage = multer.memoryStorage();

    static fileFilter = (req, file, cb) => {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files (jpg, jpeg, png) are allowed!'));
        }
    };

    static multerUpload = multer({
        storage: this.storage,
        fileFilter: this.fileFilter,
        limits: {
            fileSize: parseInt(process.env.IMAGE_SIZE_LIMIT, 10) * 1024 * 1024 // limit
        }
    });

    static upload = (req, res, next) => {
        this.multerUpload.single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    status: false,
                    message: err.code === 'LIMIT_FILE_SIZE' 
                        ? `File size too large. Maximum size is ${process.env.IMAGE_SIZE_LIMIT}MB`
                        : err.message,
                    data: null
                });
            } else if (err) {
                return res.status(400).json({
                    status: false,
                    message: err.message,
                    data: null
                });
            }
            next();
        });
    }
}

module.exports = MulterConfig; 