import { useState } from 'react';
import { symptomCategories, getAllSymptoms } from '../../services/aiService';

const SymptomSelector = ({ selectedSymptoms, onChange }) => {
  const [activeCategory, setActiveCategory] = useState('digestive');
  const [searchQuery, setSearchQuery] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');

  // Get filtered symptoms based on search
  const getFilteredSymptoms = () => {
    if (searchQuery.trim()) {
      return getAllSymptoms().filter(
        (symptom) =>
          symptom.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !selectedSymptoms.includes(symptom)
      );
    }
    return (
      symptomCategories[activeCategory]?.symptoms.filter(
        (s) => !selectedSymptoms.includes(s)
      ) || []
    );
  };

  // Toggle symptom selection
  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      onChange(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      onChange([...selectedSymptoms, symptom]);
    }
  };

  // Add custom symptom
  const addCustomSymptom = () => {
    const trimmed = customSymptom.trim();
    if (trimmed && !selectedSymptoms.includes(trimmed)) {
      onChange([...selectedSymptoms, trimmed]);
      setCustomSymptom('');
    }
  };

  const filteredSymptoms = getFilteredSymptoms();

  return (
    <div className="space-y-4">
      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="bg-emerald-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-emerald-800">
              Selected Symptoms ({selectedSymptoms.length})
            </h4>
            <button
              onClick={() => onChange([])}
              className="text-sm text-emerald-600 hover:text-emerald-800"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((symptom) => (
              <span
                key={symptom}
                className="px-3 py-1.5 bg-emerald-500 text-white rounded-full text-sm flex items-center gap-2 group"
              >
                {symptom}
                <button
                  onClick={() => toggleSymptom(symptom)}
                  className="hover:bg-emerald-600 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Search symptoms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Tabs */}
      {!searchQuery && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(symptomCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === key
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      )}

      {/* Symptoms Grid */}
      <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
        {filteredSymptoms.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {filteredSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-left hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
              >
                <span className="text-emerald-500 mr-1">+</span>
                {symptom}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchQuery
              ? 'No symptoms found matching your search'
              : 'All symptoms in this category have been selected'}
          </div>
        )}
      </div>

      {/* Custom Symptom Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a custom symptom..."
          value={customSymptom}
          onChange={(e) => setCustomSymptom(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <button
          onClick={addCustomSymptom}
          disabled={!customSymptom.trim()}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default SymptomSelector;
