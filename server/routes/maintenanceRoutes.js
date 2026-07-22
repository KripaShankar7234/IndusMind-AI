import express from 'express';
import { analyzeMaintenanceIssue } from '../controllers/maintenanceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', analyzeMaintenanceIssue);

export default router;
