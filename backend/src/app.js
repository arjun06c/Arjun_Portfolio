import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import codingRoutes from './routes/codingRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow frontend dev server and production origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection middleware for serverless execution
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('[DB Middleware Warning]:', err.message);
  }
  next();
});

// Root API Status
app.get(['/', '/api'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Arjun Portfolio Backend API is running.',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      codingSummary: '/api/coding/summary',
      leetcode: '/api/coding/leetcode',
      github: '/api/coding/github'
    }
  });
});

// Health Check API (supports direct access and rewritten access)
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Arjun C. Portfolio API'
  });
});

// API Routes (supports direct /api/* as well as rewritten /*)
app.use(['/api/contact', '/contact'], contactRoutes);
app.use(['/api/coding', '/coding'], codingRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;

