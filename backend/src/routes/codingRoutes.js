import express from 'express';
import {
  getLeetCodeStats,
  getLeetCodeHeatmap,
  getGitHubStats,
  getGitHubHeatmap,
  getCodingSummary
} from '../controllers/codingController.js';

const router = express.Router();

router.get('/leetcode', getLeetCodeStats);
router.get('/leetcode/heatmap', getLeetCodeHeatmap);
router.get('/github', getGitHubStats);
router.get('/github/heatmap', getGitHubHeatmap);
router.get('/summary', getCodingSummary);

export default router;

