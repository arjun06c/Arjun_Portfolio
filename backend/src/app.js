import express from 'express';
import cors from 'cors';
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

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Arjun C. Portfolio API'
  });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/coding', codingRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;

