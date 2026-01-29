import HealthRecord from '../models/HealthRecord.js';
import Animal from '../models/Animal.js';

// @desc    Get all health records for an animal
// @route   GET /api/health/animal/:animalId
// @access  Private
export const getHealthRecords = async (req, res) => {
  try {
    const { animalId } = req.params;
    const { page = 1, limit = 10, startDate, endDate, severity } = req.query;

    // Verify user owns the animal
    const animal = await Animal.findById(animalId);
    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
    }

    if (animal.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this animal\'s records',
      });
    }

    // Build query
    const query = { animal: animalId };

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    // Severity filter
    if (severity) {
      query.severity = severity;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const healthRecords = await HealthRecord.find(query)
      .populate('animal', 'name species')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await HealthRecord.countDocuments(query);

    res.status(200).json({
      success: true,
      data: healthRecords,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get health records error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching health records',
      error: error.message,
    });
  }
};

// @desc    Get recent health records across all user's animals (for dashboard)
// @route   GET /api/health/recent
// @access  Private
export const getRecentRecords = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    // Get all animals owned by the user
    const userAnimals = await Animal.find({ owner: req.user._id }).select('_id');
    const animalIds = userAnimals.map(animal => animal._id);

    // Get recent health records for user's animals
    const recentRecords = await HealthRecord.find({ animal: { $in: animalIds } })
      .populate('animal', 'name species breed image')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: recentRecords,
    });
  } catch (error) {
    console.error('Get recent records error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent health records',
      error: error.message,
    });
  }
};

// @desc    Get single health record by ID
// @route   GET /api/health/:id
// @access  Private
export const getHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id)
      .populate('animal', 'name species breed age weight gender image owner');

    if (!healthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Health record not found',
      });
    }

    // Verify user owns the animal
    if (healthRecord.animal.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this health record',
      });
    }

    res.status(200).json({
      success: true,
      data: healthRecord,
    });
  } catch (error) {
    console.error('Get health record error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching health record',
      error: error.message,
    });
  }
};

// @desc    Create new health record
// @route   POST /api/health
// @access  Private
export const createHealthRecord = async (req, res) => {
  try {
    const { animalId, symptoms, diagnosis, medications, notes, severity, followUpDate } = req.body;

    // Validate required fields
    if (!animalId) {
      return res.status(400).json({
        success: false,
        message: 'Animal ID is required',
      });
    }

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one symptom is required',
      });
    }

    // Verify user owns the animal
    const animal = await Animal.findById(animalId);
    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
    }

    if (animal.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add health records for this animal',
      });
    }

    // Create health record
    const healthRecord = await HealthRecord.create({
      animal: animalId,
      symptoms,
      diagnosis,
      medications: medications || [],
      notes,
      severity: severity || 'Low',
      followUpDate,
    });

    // Populate animal info for response
    await healthRecord.populate('animal', 'name species breed');

    res.status(201).json({
      success: true,
      message: 'Health record created successfully',
      data: healthRecord,
    });
  } catch (error) {
    console.error('Create health record error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating health record',
      error: error.message,
    });
  }
};

// @desc    Update health record
// @route   PUT /api/health/:id
// @access  Private
export const updateHealthRecord = async (req, res) => {
  try {
    let healthRecord = await HealthRecord.findById(req.params.id).populate('animal', 'owner');

    if (!healthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Health record not found',
      });
    }

    // Verify user owns the animal
    if (healthRecord.animal.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this health record',
      });
    }

    const { symptoms, diagnosis, medications, notes, severity, followUpDate } = req.body;

    // Validate symptoms if provided
    if (symptoms && symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one symptom is required',
      });
    }

    // Update fields
    healthRecord = await HealthRecord.findByIdAndUpdate(
      req.params.id,
      {
        symptoms: symptoms || healthRecord.symptoms,
        diagnosis: diagnosis !== undefined ? diagnosis : healthRecord.diagnosis,
        medications: medications || healthRecord.medications,
        notes: notes !== undefined ? notes : healthRecord.notes,
        severity: severity || healthRecord.severity,
        followUpDate: followUpDate !== undefined ? followUpDate : healthRecord.followUpDate,
      },
      { new: true, runValidators: true }
    ).populate('animal', 'name species breed');

    res.status(200).json({
      success: true,
      message: 'Health record updated successfully',
      data: healthRecord,
    });
  } catch (error) {
    console.error('Update health record error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating health record',
      error: error.message,
    });
  }
};

// @desc    Delete health record
// @route   DELETE /api/health/:id
// @access  Private
export const deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id).populate('animal', 'owner name');

    if (!healthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Health record not found',
      });
    }

    // Verify user owns the animal
    if (healthRecord.animal.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this health record',
      });
    }

    await HealthRecord.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Health record deleted successfully',
    });
  } catch (error) {
    console.error('Delete health record error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting health record',
      error: error.message,
    });
  }
};

// @desc    Get health statistics for user's animals
// @route   GET /api/health/stats
// @access  Private
export const getHealthStats = async (req, res) => {
  try {
    // Get all animals owned by the user
    const userAnimals = await Animal.find({ owner: req.user._id }).select('_id');
    const animalIds = userAnimals.map(animal => animal._id);

    // Get total records count
    const totalRecords = await HealthRecord.countDocuments({ animal: { $in: animalIds } });

    // Get records this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const recordsThisMonth = await HealthRecord.countDocuments({
      animal: { $in: animalIds },
      createdAt: { $gte: startOfMonth },
    });

    // Get severity distribution
    const severityDistribution = await HealthRecord.aggregate([
      { $match: { animal: { $in: animalIds } } },
      { $group: { _id: '$severity', count: { $sum: 1 } } },
    ]);

    // Get last checkup date
    const lastRecord = await HealthRecord.findOne({ animal: { $in: animalIds } })
      .sort({ createdAt: -1 })
      .select('createdAt');

    // Get upcoming follow-ups
    const upcomingFollowUps = await HealthRecord.find({
      animal: { $in: animalIds },
      followUpDate: { $gte: new Date() },
    })
      .populate('animal', 'name species')
      .sort({ followUpDate: 1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalRecords,
        recordsThisMonth,
        severityDistribution: severityDistribution.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        lastCheckup: lastRecord?.createdAt || null,
        upcomingFollowUps,
      },
    });
  } catch (error) {
    console.error('Get health stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching health statistics',
      error: error.message,
    });
  }
};
