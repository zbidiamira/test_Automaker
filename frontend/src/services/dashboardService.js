import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get dashboard stats
export const getDashboardStats = async () => {
  try {
    // Fetch animal stats
    const animalResponse = await axios.get(`${API_URL}/animals/stats`, {
      headers: getAuthHeader(),
    });

    // For now, we'll return combined stats
    // Health records and diagnoses will be added in later PRs
    return {
      success: true,
      data: {
        totalAnimals: animalResponse.data?.data?.totalAnimals || 0,
        speciesDistribution: animalResponse.data?.data?.speciesDistribution || [],
        totalHealthRecords: 0, // Will be implemented in PR #9
        totalDiagnoses: 0, // Will be implemented in PR #11
        lastCheckup: null, // Will be implemented in PR #9
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      success: false,
      data: {
        totalAnimals: 0,
        totalHealthRecords: 0,
        totalDiagnoses: 0,
        lastCheckup: null,
      },
    };
  }
};

// Get recent activity
export const getRecentActivity = async () => {
  try {
    // Fetch recent animals as activity for now
    const animalsResponse = await axios.get(`${API_URL}/animals`, {
      headers: getAuthHeader(),
      params: { limit: 5 },
    });

    const animals = animalsResponse.data?.data || [];
    
    // Convert animals to activity format
    const activities = animals.map((animal) => ({
      id: animal._id,
      type: 'animal_added',
      title: `${animal.name} was registered`,
      description: `${animal.species}${animal.breed ? ` - ${animal.breed}` : ''}`,
      createdAt: animal.createdAt,
    }));

    return {
      success: true,
      data: activities,
    };
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return {
      success: false,
      data: [],
    };
  }
};

export default {
  getDashboardStats,
  getRecentActivity,
};
