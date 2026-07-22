import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import { loggerFormat } from './utils/logger.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import complianceRoutes from './routes/complianceRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();

// 1. Connect MongoDB
connectDB();

// 2. Global Security & Utility Middlewares
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(loggerFormat);
app.use('/api', apiLimiter);

// Serve uploaded static files
app.use('/uploads', express.static(path.resolve('uploads')));

// 3. Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'IndusMind AI Operations Brain Backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 4. API Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportRoutes);

// 5. Catch-all 404 Route
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
});

// 6. Centralized Error Handler Middleware
app.use(errorHandler);

// 7. Start Express Listener
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  🚀 IndusMind AI Enterprise Backend Server Running`);
  console.log(`  📡 API Endpoint: http://localhost:${PORT}/api`);
  console.log(`  ⚡ Environment: ${config.nodeEnv}`);
  console.log(`=======================================================`);
});

export default app;
