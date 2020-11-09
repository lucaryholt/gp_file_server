const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use(express.json());

router.post('/authenticate', (req, res) => {
    const key = req.body.authkey;

    if (key === process.env.AUTHENTICATION_KEY) {
        const accessToken = jwt.sign(key, process.env.ACCESS_TOKEN_SECRET)
        return res.send({
            accessToken
        });
    }
    return res.sendStatus(401);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, key) => {
        if (err) return res.sendStatus(403);
        req.key = key;
        next();
    });
}

module.exports = {
    router,
    authenticateToken
}