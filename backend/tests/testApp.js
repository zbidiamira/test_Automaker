import express from 'express';
import cors from 'cors';
import authRoutes from '../src/routes/auth.js';
import animalRoutes from '../src/routes/animals.js';
import healthRoutes from '../src/routes/health.js';

// Create Express app for testing
const createTestApp = () => {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/animals', animalRoutes);
  app.use('/api/health', healthRoutes);
  
  // Error handler
  app.use((err, req, res, next) => {
    console.error('Test app error:', err);
    res.status(500).json({ success: false, message: err.message });
  });
  
  return app;
};

export default createTestApp;
