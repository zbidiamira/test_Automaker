import Animal from '../models/Animal.js';
import HealthRecord from '../models/HealthRecord.js';

// @desc    Get all animals for logged-in user
// @route   GET /api/animals
// @access  Private
export const getAnimals = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build query
    const query = { owner: req.user._id };
    
    // Add search filter if provided
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Get animals with pagination
    const animals = await Animal.find(query)
      .populate('owner', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Animal.countDocuments(query);

    res.json({
      success: true,
      data: animals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching animals:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching animals',
    });
  }
};

// @desc    Get single animal by ID
// @route   GET /api/animals/:id
// @access  Private
export const getAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)
      .populate('owner', 'firstName lastName email');

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
    }

    // Verify ownership
    if (animal.owner._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this animal',
      });
    }

    res.json({
      success: true,
      data: animal,
    });
  } catch (error) {
    console.error('Error fetching animal:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching animal',
    });
  }
};

// @desc    Create new animal
// @route   POST /api/animals
// @access  Private
export const createAnimal = async (req, res) => {
  try {
    const { name, species, breed, age, weight, gender, image } = req.body;

    // Validate required fields
    if (!name || !species) {
      return res.status(400).json({
        success: false,
        message: 'Name and species are required',
      });
    }

    // Create animal
    const animal = await Animal.create({
      owner: req.user._id,
      name,
      species,
      breed,
      age,
      weight,
      gender,
      image,
    });

    // Populate owner info
    await animal.populate('owner', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Animal created successfully',
      data: animal,
    });
  } catch (error) {
    console.error('Error creating animal:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating animal',
    });
  }
};

// @desc    Update animal
// @route   PUT /api/animals/:id
// @access  Private
export const updateAnimal = async (req, res) => {
  try {
    let animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
    }

    // Verify ownership
    if (animal.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this animal',
      });
    }

    // Fields that can be updated
    const { name, species, breed, age, weight, gender, image } = req.body;

    // Update animal
    animal = await Animal.findByIdAndUpdate(
      req.params.id,
      { name, species, breed, age, weight, gender, image },
      { new: true, runValidators: true }
    ).populate('owner', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Animal updated successfully',
      data: animal,
    });
  } catch (error) {
    console.error('Error updating animal:', error);

    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating animal',
    });
  }
};

// @desc    Delete animal
// @route   DELETE /api/animals/:id
// @access  Private
export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
    }

    // Verify ownership
    if (animal.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this animal',
      });
    }

    // Delete related health records
    await HealthRecord.deleteMany({ animal: req.params.id });

    // Delete the animal
    await Animal.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Animal and related health records deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting animal:', error);

    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting animal',
    });
  }
};

// @desc    Get animal statistics for dashboard
// @route   GET /api/animals/stats
// @access  Private
export const getAnimalStats = async (req, res) => {
  try {
    const totalAnimals = await Animal.countDocuments({ owner: req.user._id });
    
    // Get species distribution
    const speciesDistribution = await Animal.aggregate([
      { $match: { owner: req.user._id } },
      { $group: { _id: '$species', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalAnimals,
        speciesDistribution,
      },
    });
  } catch (error) {
    console.error('Error fetching animal stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching animal statistics',
    });
  }
};
