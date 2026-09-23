import { Router } from 'express';
import { getStudentDashboard } from '../controllers/dashboardController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/student', authenticateToken, getStudentDashboard);

export default router;
