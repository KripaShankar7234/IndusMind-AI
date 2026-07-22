import express from 'express';
import { handleChatQuery } from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', handleChatQuery);

export default router;
