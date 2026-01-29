import { analyzeSymptoms, getCareRecommendations, isConfigured } from '../services/aiService.js';
import Animal from '../models/Animal.js';
import HealthRecord from '../models/HealthRecord.js';

// @desc    Analyze symptoms and provide AI diagnosis
// @route   POST /api/ai/diagnose
// @access  Private
export const diagnose = async (req, res) => {
  try {
    // Check if AI service is configured
    if (!isConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'AI diagnostic service is not configured. Please contact support.',
      });
    }

    const { animalId, symptoms, additionalInfo, duration, saveToRecords } = req.body;

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
        message: 'At least one symptom is required for diagnosis',
      });
    }

    // Get animal information
    const animal = await Animal.findById(animalId);
    
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
        message: 'Not authorized to access this animal',
      });
    }

    // Perform AI analysis
    const diagnosis = await analyzeSymptoms({
      species: animal.species,
      breed: animal.breed,
      age: animal.age,
      weight: animal.weight,
      gender: animal.gender,
      symptoms,
      additionalInfo,
      duration,
    });

    // Optionally save to health records
    let healthRecord = null;
    if (saveToRecords) {
      // Determine severity from AI analysis
      const severityMap = {
        'Emergency': 'Critical',
        'High': 'High',
        'Medium': 'Medium',
        'Low': 'Low',
      };
      
      healthRecord = await HealthRecord.create({
        animal: animalId,
        symptoms,
        diagnosis: diagnosis.possibleConditions?.[0]?.name || 'AI-assisted diagnosis',
        notes: `AI Diagnosis Analysis:\n${diagnosis.possibleConditions?.map(c => `- ${c.name} (${c.probability}): ${c.description}`).join('\n')}\n\nAdditional Info: ${additionalInfo || 'None provided'}`,
        severity: severityMap[diagnosis.urgency] || 'Low',
        medications: diagnosis.medications?.filter(m => m.type === 'Over-the-counter').map(m => ({
          name: m.name,
          dosage: m.dosage,
          frequency: 'As directed',
          notes: m.notes,
        })) || [],
      });
    }

    res.status(200).json({
      success: true,
      message: 'Diagnosis completed successfully',
      data: {
        diagnosis,
        animal: {
          _id: animal._id,
          name: animal.name,
          species: animal.species,
          breed: animal.breed,
        },
        healthRecord: healthRecord ? healthRecord._id : null,
      },
    });
  } catch (error) {
    console.error('Diagnosis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'AI diagnosis failed. Please try again.',
    });
  }
};

// @desc    Get care recommendations for a condition
// @route   POST /api/ai/recommendations
// @access  Private
export const getRecommendations = async (req, res) => {
  try {
    // Check if AI service is configured
    if (!isConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'AI service is not configured. Please contact support.',
      });
    }

    const { species, condition } = req.body;

    // Validate required fields
    if (!species || !condition) {
      return res.status(400).json({
        success: false,
        message: 'Species and condition are required',
      });
    }

    // Get recommendations
    const recommendations = await getCareRecommendations(species, condition);

    res.status(200).json({
      success: true,
      message: 'Recommendations retrieved successfully',
      data: recommendations,
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get recommendations. Please try again.',
    });
  }
};

// @desc    Quick symptom check without saving
// @route   POST /api/ai/quick-check
// @access  Private
export const quickCheck = async (req, res) => {
  try {
    // Check if AI service is configured
    if (!isConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'AI service is not configured. Please contact support.',
      });
    }

    const { species, symptoms, additionalInfo } = req.body;

    // Validate required fields
    if (!species) {
      return res.status(400).json({
        success: false,
        message: 'Species is required',
      });
    }

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one symptom is required',
      });
    }

    // Perform quick AI analysis
    const diagnosis = await analyzeSymptoms({
      species,
      symptoms,
      additionalInfo,
    });

    res.status(200).json({
      success: true,
      message: 'Quick check completed',
      data: diagnosis,
    });
  } catch (error) {
    console.error('Quick check error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Quick check failed. Please try again.',
    });
  }
};

// @desc    Check AI service status
// @route   GET /api/ai/status
// @access  Private
export const getStatus = async (req, res) => {
  try {
    const configured = isConfigured();
    
    res.status(200).json({
      success: true,
      data: {
        configured,
        available: configured,
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        message: configured 
          ? 'AI diagnostic service is available' 
          : 'AI service is not configured. Please add OPENAI_API_KEY to environment variables.',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking AI service status',
    });
  }
};
