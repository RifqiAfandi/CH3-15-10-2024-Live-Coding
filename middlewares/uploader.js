const multer = require("multer");

const multerFiltering = (req, file, cb) => {
    if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpeg'
    ) {
        cb(null, true)
    } else{
        throw new Error("image format is not valid...")
    }
}; // cb = call back

const upload = multer({
    fileFilter: multerFiltering,
    // dest: 'public/images/users'
    // tidak perlu dest karena butuh raw/buffernya
});

module.exports = upload;