import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../backend/src/config/db.js';
import app from '../backend/src/app.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error('[Serverless DB Connect Error]:', error.message);
  }
  return app(req, res);
}
