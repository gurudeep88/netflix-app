import express from 'express';
import controllers from '../controllers/index.js';
import { upload } from '../utils/multer.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/', verifyToken, controllers.movies.create);
//UPDATE
router.put('/:id', verifyToken, controllers.movies.update);
//DELETE
router.delete('/:id', verifyToken, controllers.movies.delete);
//GET
router.get('/find/:id', verifyToken, controllers.movies.get);
//GET RANDOM
router.get('/random', verifyToken, controllers.movies.getRandom);
//GET ALL
router.get('/', verifyToken, controllers.movies.getAll);
//Upload
router.post('/upload', upload.single("file"), controllers.movies.upload);

export default router;