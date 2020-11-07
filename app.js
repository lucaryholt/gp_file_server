const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const multer = require('multer');
const upload = multer({
    dest: path.join(__dirname, 'uploads')
});

const request = require('request');

app.get('/file/:filename', (req, res) => {
    const data = Buffer.from(fs.readFileSync(path.join(__dirname, 'uploads', req.params.filename)));

    return res.send({
        file: data
    });
});

app.post('/file', upload.single('file'), (req, res) => {
    return res.send({
        filename: req.file.filename,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        originalName: req.file.originalname
    });
});

app.post('/files', upload.array('files'), (req, res) => {
    const files = [];

    req.files.map(file => {
        console.log(file);
        files.push({
            filename: file.filename,
            encoding: file.encoding,
            mimetype: file.mimetype,
            originalName: file.originalname
        });
    });
    return res.send({ files });
});

app.delete('/file/:filename', (req, res) => {
    fs.unlinkSync(path.join(__dirname, 'uploads', req.params.filename));
    return res.send({
        deleted: true
    });
});

const port = process.env.PORT ? process.env.PORT : 80;

app.listen(port, (error) => {
    if (error) console.log('Error starting server');
    else console.log('Server started on port', port);
});