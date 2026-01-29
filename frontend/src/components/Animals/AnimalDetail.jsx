import { Link } from 'react-router-dom';
import Button from '../Common/Button';

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

const AnimalDetail = ({ animal, onEdit, onDelete }) => {
  const emoji = speciesEmoji[animal.species] || speciesEmoji.Other;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header with Image */}
      <div className="relative h-64 bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
        {animal.image ? (
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-9xl">{emoji}</span>
        )}
        
        {/* Back Button */}
        <Link
          to="/animals"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-lg hover:bg-white transition-colors"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => onEdit(animal)}
            className="bg-white/90 backdrop-blur p-2 rounded-lg hover:bg-white transition-colors"
          >
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(animal)}
            className="bg-white/90 backdrop-blur p-2 rounded-lg hover:bg-white transition-colors"
          >
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6">
        {/* Name and Species */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{animal.name}</h1>
            <p className="text-gray-500 mt-1">
              {animal.species} {animal.breed ? `• ${animal.breed}` : ''}
            </p>
          </div>
          {animal.gender && (
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              animal.gender === 'Male' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-pink-100 text-pink-700'
            }`}>
              {animal.gender === 'Male' ? '♂' : '♀'} {animal.gender}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {animal.age && (
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Age</p>
              <p className="text-xl font-bold text-gray-800">
                {animal.age} {animal.age === 1 ? 'year' : 'years'}
              </p>
            </div>
          )}
          {animal.weight && (
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="text-xl font-bold text-gray-800">{animal.weight} kg</p>
            </div>
          )}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Species</p>
            <p className="text-xl font-bold text-gray-800">{animal.species}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Added</p>
            <p className="text-lg font-bold text-gray-800">
              {formatDate(animal.createdAt)}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              to={`/animals/${animal._id}/health`}
              className="flex items-center justify-center space-x-2 p-4 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">Health Records</span>
            </Link>
            <Link
              to={`/diagnosis?animal=${animal._id}`}
              className="flex items-center justify-center space-x-2 p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="font-medium">Check Symptoms</span>
            </Link>
            <button
              onClick={() => onEdit(animal)}
              className="flex items-center justify-center space-x-2 p-4 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="font-medium">Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
