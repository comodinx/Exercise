'use strict';

const path = require('path');
const express = require('express');
const viewIndex = path.resolve(__dirname, '../..', 'public', 'index.html');

let router = new express.Router();

router.use('/api', require('./api'));

router.get('*', (req, res) => {
    res.sendFile(viewIndex);
});

module.exports = router;