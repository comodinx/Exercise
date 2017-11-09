'use strict';

const express = require('express');
let router = new express.Router();

router.use('/items', require('./items'));

module.exports = router;
