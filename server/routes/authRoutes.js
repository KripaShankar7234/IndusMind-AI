import express from 'express';
import { register, login, refreshToken, getMe } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateAuthRegister, validateAuthLogin } from '../middlewares/validator.js';

const router = express.Router();

router.post('/register', validateAuthRegister, register);
router.post('/login', validateAuthLogin, login);
router.post('/refresh', refreshToken);
router.get('/me', protect, getMe);

export default router;
