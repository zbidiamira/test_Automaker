import express from 'express';
import {
  getHealthRecords,
  getHealthRecord,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
  getRecentRecords,
  getHealthStats,
} from '../controllers/healthController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/health/recent
// @desc    Get recent health records for dashboard
// @access  Private
router.get('/recent', getRecentRecords);

// @route   GET /api/health/stats
// @desc    Get health statistics for user's animals
// @access  Private
router.get('/stats', getHealthStats);

// @route   GET /api/health/animal/:animalId
// @desc    Get all health records for a specific animal
// @access  Private
router.get('/animal/:animalId', getHealthRecords);

// @route   GET /api/health/:id
// @desc    Get single health record by ID
// @access  Private
router.get('/:id', getHealthRecord);

// @route   POST /api/health
// @desc    Create new health record
// @access  Private
router.post('/', createHealthRecord);

// @route   PUT /api/health/:id
// @desc    Update health record
// @access  Private
router.put('/:id', updateHealthRecord);

// @route   DELETE /api/health/:id
// @desc    Delete health record
// @access  Private
router.delete('/:id', deleteHealthRecord);

export default router;
