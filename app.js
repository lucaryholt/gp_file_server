require('dotenv').config();

const express = require('express');
const app = express();

const auth = require('./routes/auth.js');

app.use(auth.router);

app.use(require('./routes/files.js'));

const port = process.env.ACCESS_PORT;

app.listen(port, (error) => {
    if (error) console.log('Error starting server');
    else console.log('Server started on port', port);
});