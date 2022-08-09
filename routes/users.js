import express from 'express';
import controllers from '../controllers/index.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//UPDATE
router.put('/:id', verifyToken, controllers.users.update);

//DELETE
router.delete('/:id', verifyToken, controllers.users.delete);

//GET
router.get('/find/:id', controllers.users.get);

//GET ALL
router.get('/', verifyToken, controllers.users.getAll);

//GET USER STATS
router.get('/stats', controllers.users.stats);

export default router;