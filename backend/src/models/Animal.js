import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Animal name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    species: {
      type: String,
      required: [true, 'Species is required'],
      enum: {
        values: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Fish', 'Reptile', 'Other'],
        message: '{VALUE} is not a valid species',
      },
    },
    breed: {
      type: String,
      trim: true,
      maxlength: [100, 'Breed cannot exceed 100 characters'],
      default: 'Unknown',
    },
    age: {
      type: Number,
      min: [0, 'Age cannot be negative'],
      max: [100, 'Age cannot exceed 100 years'],
    },
    dateOfBirth: {
      type: Date,
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative'],
      max: [1000, 'Weight cannot exceed 1000 kg'],
    },
    weightUnit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg',
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Unknown'],
        message: '{VALUE} is not a valid gender',
      },
      default: 'Unknown',
    },
    image: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      trim: true,
      maxlength: [50, 'Color cannot exceed 50 characters'],
    },
    microchipId: {
      type: String,
      trim: true,
    },
    isNeutered: {
      type: Boolean,
      default: false,
    },
    allergies: [{
      type: String,
      trim: true,
    }],
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for calculating age in human years (approximate)
animalSchema.virtual('ageInHumanYears').get(function () {
  if (!this.age) return null;

  switch (this.species) {
    case 'Dog':
      // First year = 15 human years, second year = 9, then 4-5 per year
      if (this.age <= 1) return this.age * 15;
      if (this.age <= 2) return 15 + (this.age - 1) * 9;
      return 24 + (this.age - 2) * 5;
    
    case 'Cat':
      // First year = 15 human years, second year = 9, then 4 per year
      if (this.age <= 1) return this.age * 15;
      if (this.age <= 2) return 15 + (this.age - 1) * 9;
      return 24 + (this.age - 2) * 4;
    
    case 'Rabbit':
      // First year = 21 human years, then 8 per year
      if (this.age <= 1) return this.age * 21;
      return 21 + (this.age - 1) * 8;
    
    case 'Hamster':
      // Hamsters age about 25 human years per actual year
      return this.age * 25;
    
    default:
      // For other species, return null as it's hard to generalize
      return null;
  }
});

// Virtual for species emoji
animalSchema.virtual('speciesEmoji').get(function () {
  const emojis = {
    Dog: '🐕',
    Cat: '🐈',
    Bird: '🐦',
    Rabbit: '🐰',
    Hamster: '🐹',
    Fish: '🐠',
    Reptile: '🦎',
    Other: '🐾',
  };
  return emojis[this.species] || '🐾';
});

// Calculate age from date of birth
animalSchema.virtual('calculatedAge').get(function () {
  if (!this.dateOfBirth) return this.age;
  
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// Index for efficient queries
animalSchema.index({ owner: 1, name: 1 });
animalSchema.index({ owner: 1, species: 1 });
animalSchema.index({ owner: 1, createdAt: -1 });

// Ensure virtuals are included in JSON
animalSchema.set('toJSON', { virtuals: true });
animalSchema.set('toObject', { virtuals: true });

// Pre-remove middleware to handle cascading deletes (if needed)
animalSchema.pre('deleteOne', { document: true, query: false }, async function () {
  // This will be used in PR #9 to delete related health records
  // await mongoose.model('HealthRecord').deleteMany({ animal: this._id });
});

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;
