const router = require('express').Router();

const path = require('path');
const fs = require('fs');

let upload = null;
let uploadPath = null;

const multer = require('multer');
if (process.env.UPLOAD_DIRECTORY_ABSOLUTE_PATH) {
    uploadPath = process.env.UPLOAD_DIRECTORY_ABSOLUTE_PATH;
} else {
    uploadPath = path.join(__dirname, '..', process.env.UPLOAD_DIRECTORY_RELATIVE_PATH);
}
upload = multer({
    dest: uploadPath
});

const auth = require('./auth.js');

router.get('/file/:filename', auth.authenticateToken, (req, res) => {
    const data = Buffer.from(fs.readFileSync(path.join(uploadPath, req.params.filename)));

    return res.send({
        file: data
    });
});

router.post('/files', auth.authenticateToken, upload.array('files'), (req, res) => {
    const files = [];

    req.files.map(file => {
        files.push({
            filename: file.filename,
            originalName: file.originalname
        });
    });
    return res.send({ files });
});

router.delete('/file/:filename', auth.authenticateToken, (req, res) => {
    fs.unlinkSync(path.join(uploadPath, req.params.filename));
    return res.send({
        deleted: true
    });
});

module.exports = router;