'use strict';

const express = require('express');
let router = express.Router(); // eslint-disable-line new-cap

router.get('/', require('./getAll'));
router.get('/:id', require('./getById'));

module.exports = router;
