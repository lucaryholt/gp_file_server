const router = require('express').Router();

const path = require('path');
const fs = require('fs');

const multer = require('multer');
const upload = multer({
    dest: path.join(__dirname, '../uploads')
});

const auth = require('./auth.js');

router.get('/file/:filename', auth.authenticateToken, (req, res) => {
    const data = Buffer.from(fs.readFileSync(path.join(__dirname, '../uploads', req.params.filename)));

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
    fs.unlinkSync(path.join(__dirname, '../uploads', req.params.filename));
    return res.send({
        deleted: true
    });
});

module.exports = router;