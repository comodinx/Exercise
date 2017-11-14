import express from 'express';
import getAll from './getAll';
import getById from './getById';

let router = new express.Router();

router.get('/', getAll);
router.get('/:id', getById);

export default router;
