import { Link } from 'react-router-dom';

// Species emoji mapping
const speciesEmoji = {
  Dog: '🐕',
  Cat: '🐈',
  Bird: '🐦',
  Rabbit: '🐰',
  Hamster: '🐹',
  Fish: '🐠',
  Reptile: '🦎',
  Other: '🐾',
};

const AnimalCard = ({ animal, onEdit, onDelete }) => {
  const emoji = speciesEmoji[animal.species] || speciesEmoji.Other;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image/Avatar Section */}
      <div className="relative h-40 bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
        {animal.image ? (
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-6xl">{emoji}</span>
        )}
        {/* Species Badge */}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600 shadow">
          {animal.species}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{animal.name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {animal.breed || 'Unknown breed'}
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          {animal.age && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {animal.age} {animal.age === 1 ? 'year' : 'years'}
            </span>
          )}
          {animal.weight && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              {animal.weight} kg
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            to={`/animals/${animal._id}`}
            className="flex-1 bg-emerald-50 text-emerald-600 text-center py-2 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
          >
            View
          </Link>
          <button
            onClick={() => onEdit(animal)}
            className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(animal)}
            className="px-3 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
