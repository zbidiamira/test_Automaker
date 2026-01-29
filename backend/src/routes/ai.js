import express from 'express';
import {
  diagnose,
  getRecommendations,
  quickCheck,
  getStatus,
} from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/ai/status
// @desc    Check AI service status
// @access  Private
router.get('/status', getStatus);

// @route   POST /api/ai/diagnose
// @desc    Analyze symptoms and provide AI diagnosis
// @access  Private
router.post('/diagnose', diagnose);

// @route   POST /api/ai/recommendations
// @desc    Get care recommendations for a condition
// @access  Private
router.post('/recommendations', getRecommendations);

// @route   POST /api/ai/quick-check
// @desc    Quick symptom check without saving (no animal required)
// @access  Private
router.post('/quick-check', quickCheck);

export default router;
