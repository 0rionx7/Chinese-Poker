import express from 'express';

import * as UserController from '../controllers/user.js';

const router = express.Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/verify', UserController.verify);
router.get('/getScore', UserController.getScore);
router.put('/updateScore', UserController.updateScore);

export { router as userRoutes };
