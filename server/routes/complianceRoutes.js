import express from 'express';
import { checkCompliance } from '../controllers/complianceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/check', checkCompliance);

export default router;
