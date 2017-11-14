import express from 'express';
import items from './items';

let router = new express.Router();

router.use('/items', items);

export default router;
