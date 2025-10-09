// /server/routes/dashboard.js

import express from 'express';
import { getDashboardKPIs } from '../controllers/dashboard.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Route to fetch all new dashboard data
router.get('/kpis', auth, getDashboardKPIs);

export default router;