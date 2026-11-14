import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().catch(err => {
  console.error('[DB Warning]: Could not initialize database connection at startup:', err.message);
});

const server = app.listen(PORT, () => {
  console.log(`[Server running on http://localhost:${PORT}]`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

