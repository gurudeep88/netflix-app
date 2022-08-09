import express from 'express';
import controllers from '../controllers/index.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/', verifyToken, controllers.lists.create);

//DELETE
router.delete('/:id', verifyToken, controllers.lists.delete);

//GET
//router.get('/find/:id', controllers.lists.get);

//GET ALL or by "type" or "genre"
router.get('/', verifyToken, controllers.lists.get);

export default router;