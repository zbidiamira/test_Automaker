import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🐾</span>
              <h1 className="text-2xl font-bold text-gray-900">VetAI Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Welcome, <span className="font-medium text-emerald-600">{user?.firstName}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-100 p-4 rounded-full">
              <span className="text-4xl">👋</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Hello, {user?.firstName} {user?.lastName}!
              </h2>
              <p className="text-gray-600 mt-1">
                Welcome to your VetAI Dashboard. Manage your pets and their health here.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">My Animals</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <span className="text-2xl">🐕</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Health Records</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">AI Diagnoses</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-2xl">🤖</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Follow-ups</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-6 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors">
              <span className="text-3xl mb-2">➕</span>
              <span className="text-sm font-medium text-gray-700">Add Animal</span>
            </button>
            <button className="flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
              <span className="text-3xl mb-2">🔍</span>
              <span className="text-sm font-medium text-gray-700">AI Diagnosis</span>
            </button>
            <button className="flex flex-col items-center p-6 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
              <span className="text-3xl mb-2">📝</span>
              <span className="text-sm font-medium text-gray-700">Add Record</span>
            </button>
            <button className="flex flex-col items-center p-6 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors">
              <span className="text-3xl mb-2">👤</span>
              <span className="text-sm font-medium text-gray-700">My Profile</span>
            </button>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-2">🚀 More Features Coming Soon!</h3>
          <p className="opacity-90">
            We're working on adding animal management, health tracking, and AI-powered diagnosis features.
            Stay tuned for updates!
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
