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
    const fileName = req.params.filename;
    const file = fs.readFileSync(path.join(__dirname, 'uploads', fileName));
    return res.send({
        file: file.toString()
    });
});

/*app.get('/test', (req, res) => {
    request.post({
        url: 'http://localhost:8080/upload',
        formData: {
            file: fs.createReadStream(path.join(__dirname, 'Moon.png')),
            filetype: 'image/png',
            filename: 'file',
            channels: 'sample',
            title: 'sampleTitle'
        }
    }, (error, response, body) => {
        return res.send(response);
    });
}); */

app.post('/file', upload.single('file'), (req, res) => {
    return res.send({
        filename: req.file.filename,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype
    });
});

app.delete('/file/:filename', (req, res) => {
    fs.unlinkSync(path.join(__dirname, 'uploads', req.params.filename));
    return res.send({
        deleted: true
    });
});

const port = 8080;

app.listen(port, (error) => {
    if (error) console.log('Error starting server');
    else console.log('Server started on port', port);
});