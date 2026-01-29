import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getAnimals,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalStats,
} from '../controllers/animalController.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/animals/stats
// @desc    Get animal statistics
// @access  Private
router.get('/stats', getAnimalStats);

// @route   GET /api/animals
// @desc    Get all animals for logged-in user
// @access  Private
router.get('/', getAnimals);

// @route   GET /api/animals/:id
// @desc    Get single animal by ID
// @access  Private
router.get('/:id', getAnimal);

// @route   POST /api/animals
// @desc    Create new animal
// @access  Private
router.post('/', createAnimal);

// @route   PUT /api/animals/:id
// @desc    Update animal
// @access  Private
router.put('/:id', updateAnimal);

// @route   DELETE /api/animals/:id
// @desc    Delete animal
// @access  Private
router.delete('/:id', deleteAnimal);

export default router;
