import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Medication name is required'],
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, 'Dosage is required'],
      trim: true,
    },
    frequency: {
      type: String,
      required: [true, 'Frequency is required'],
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  { _id: false }
);

const healthRecordSchema = new mongoose.Schema(
  {
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Animal',
      required: [true, 'Animal is required'],
      index: true,
    },
    symptoms: {
      type: [String],
      required: [true, 'At least one symptom is required'],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'At least one symptom must be provided',
      },
    },
    diagnosis: {
      type: String,
      trim: true,
      maxlength: [500, 'Diagnosis cannot exceed 500 characters'],
    },
    possibleConditions: [{
      name: {
        type: String,
        trim: true,
      },
      probability: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
      },
      description: {
        type: String,
        trim: true,
      },
    }],
    medications: [medicationSchema],
    notes: {
      type: String,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },
    severity: {
      type: String,
      required: [true, 'Severity is required'],
      enum: {
        values: ['Low', 'Medium', 'High', 'Critical'],
        message: '{VALUE} is not a valid severity level',
      },
      default: 'Medium',
    },
    recommendedActions: [{
      type: String,
      trim: true,
    }],
    warningSignsToWatch: [{
      type: String,
      trim: true,
    }],
    shouldSeeVet: {
      type: Boolean,
      default: false,
    },
    urgency: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Emergency'],
      default: 'Low',
    },
    isAIDiagnosis: {
      type: Boolean,
      default: false,
    },
    veterinarianName: {
      type: String,
      trim: true,
    },
    clinicName: {
      type: String,
      trim: true,
    },
    followUpDate: {
      type: Date,
    },
    temperature: {
      type: Number,
      min: [30, 'Temperature seems too low'],
      max: [45, 'Temperature seems too high'],
    },
    temperatureUnit: {
      type: String,
      enum: ['C', 'F'],
      default: 'C',
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative'],
    },
    weightUnit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg',
    },
    attachments: [{
      name: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
      type: {
        type: String,
        enum: ['image', 'document', 'other'],
        default: 'other',
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Virtual for severity color
healthRecordSchema.virtual('severityColor').get(function () {
  const colors = {
    Low: '#10B981',      // Green
    Medium: '#F59E0B',   // Yellow/Amber
    High: '#F97316',     // Orange
    Critical: '#EF4444', // Red
  };
  return colors[this.severity] || '#6B7280';
});

// Virtual for urgency color
healthRecordSchema.virtual('urgencyColor').get(function () {
  const colors = {
    Low: '#10B981',
    Medium: '#F59E0B',
    High: '#F97316',
    Emergency: '#EF4444',
  };
  return colors[this.urgency] || '#6B7280';
});

// Index for efficient queries on animal and createdAt
healthRecordSchema.index({ animal: 1, createdAt: -1 });
healthRecordSchema.index({ animal: 1, severity: 1 });
healthRecordSchema.index({ createdAt: -1 });

// Compound index for filtering by date range
healthRecordSchema.index({ animal: 1, createdAt: 1 });

// Ensure virtuals are included in JSON
healthRecordSchema.set('toJSON', { virtuals: true });
healthRecordSchema.set('toObject', { virtuals: true });

// Static method to get records by severity
healthRecordSchema.statics.getBySeverity = function (animalId, severity) {
  return this.find({ animal: animalId, severity }).sort({ createdAt: -1 });
};

// Static method to get recent records
healthRecordSchema.statics.getRecent = function (animalId, limit = 5) {
  return this.find({ animal: animalId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Instance method to check if follow-up is due
healthRecordSchema.methods.isFollowUpDue = function () {
  if (!this.followUpDate) return false;
  return new Date() >= this.followUpDate;
};

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

export default HealthRecord;
