import express from 'express';
import { register, login, logout, getCurrentUser } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateRequest.js';
import { loginSchema, registerSchema } from '../validators/authValidators.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getCurrentUser);

export default router; 
