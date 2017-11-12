import path from 'path';
import express from 'express';
import core from './core';
import api from './api';

let router = new express.Router();

router.use('/api', api);
router.use('/', core);

export default router;
