import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Check AI service status
export const getAIStatus = async () => {
  const response = await axios.get(`${API_URL}/ai/status`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Full diagnosis with animal data
export const diagnoseSymptoms = async ({
  animalId,
  symptoms,
  additionalInfo,
  duration,
  saveToRecords = false,
}) => {
  const response = await axios.post(
    `${API_URL}/ai/diagnose`,
    { animalId, symptoms, additionalInfo, duration, saveToRecords },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Quick symptom check without saved animal
export const quickCheck = async ({ species, symptoms, additionalInfo }) => {
  const response = await axios.post(
    `${API_URL}/ai/quick-check`,
    { species, symptoms, additionalInfo },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Get care recommendations for a condition
export const getRecommendations = async (species, condition) => {
  const response = await axios.post(
    `${API_URL}/ai/recommendations`,
    { species, condition },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Symptom categories for the selector
export const symptomCategories = {
  digestive: {
    label: 'Digestive',
    icon: '🍽️',
    symptoms: [
      'Vomiting',
      'Diarrhea',
      'Loss of appetite',
      'Constipation',
      'Bloating',
      'Blood in stool',
      'Excessive drooling',
      'Difficulty swallowing',
    ],
  },
  respiratory: {
    label: 'Respiratory',
    icon: '🌬️',
    symptoms: [
      'Coughing',
      'Sneezing',
      'Difficulty breathing',
      'Nasal discharge',
      'Wheezing',
      'Rapid breathing',
      'Labored breathing',
      'Blue gums',
    ],
  },
  skin: {
    label: 'Skin & Coat',
    icon: '🐾',
    symptoms: [
      'Itching',
      'Hair loss',
      'Rashes',
      'Lumps or bumps',
      'Hot spots',
      'Dry skin',
      'Wounds',
      'Excessive shedding',
      'Skin discoloration',
    ],
  },
  behavioral: {
    label: 'Behavioral',
    icon: '🧠',
    symptoms: [
      'Lethargy',
      'Aggression',
      'Anxiety',
      'Hiding',
      'Excessive barking/meowing',
      'Restlessness',
      'Confusion',
      'Depression',
      'Loss of interest in play',
    ],
  },
  physical: {
    label: 'Physical',
    icon: '💪',
    symptoms: [
      'Limping',
      'Swelling',
      'Weight loss',
      'Weight gain',
      'Fever',
      'Eye discharge',
      'Ear discharge',
      'Bad breath',
      'Stiffness',
      'Tremors',
    ],
  },
  urinary: {
    label: 'Urinary',
    icon: '💧',
    symptoms: [
      'Frequent urination',
      'Difficulty urinating',
      'Blood in urine',
      'Incontinence',
      'Straining to urinate',
      'Excessive thirst',
    ],
  },
  eyes: {
    label: 'Eyes',
    icon: '👁️',
    symptoms: [
      'Red eyes',
      'Cloudy eyes',
      'Eye discharge',
      'Squinting',
      'Swollen eyelids',
      'Excessive tearing',
      'Vision problems',
    ],
  },
  ears: {
    label: 'Ears',
    icon: '👂',
    symptoms: [
      'Head shaking',
      'Ear scratching',
      'Ear odor',
      'Ear discharge',
      'Red/inflamed ears',
      'Balance issues',
    ],
  },
};

// Get all symptoms as a flat array
export const getAllSymptoms = () => {
  return Object.values(symptomCategories).flatMap((cat) => cat.symptoms);
};

// Duration options
export const durationOptions = [
  { value: 'less-than-24h', label: 'Less than 24 hours' },
  { value: '1-3-days', label: '1-3 days' },
  { value: '3-7-days', label: '3-7 days' },
  { value: '1-2-weeks', label: '1-2 weeks' },
  { value: '2-4-weeks', label: '2-4 weeks' },
  { value: 'more-than-month', label: 'More than a month' },
  { value: 'recurring', label: 'Recurring/intermittent' },
];
