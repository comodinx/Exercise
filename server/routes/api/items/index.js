'use strict';

const express = require('express');

let router = express.Router();

router.get('/', require('./getAll'));
router.get('/:id', require('./getById'));

module.exports = router;
