import express from 'express';
import controllers from '../controllers/index.js';

const router = express.Router();

//Register
//router.post('/register', controllers.auth.register);
router.post('/register', controllers.auth.register);

//Login
router.post('/login', controllers.auth.login);

export default router;