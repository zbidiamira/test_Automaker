import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { StatCard } from '../components/Common/Card';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
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
        <StatCard
          title="My Animals"
          value="0"
          color="emerald"
          icon={<span className="text-2xl">🐕</span>}
        />
        <StatCard
          title="Health Records"
          value="0"
          color="blue"
          icon={<span className="text-2xl">📋</span>}
        />
        <StatCard
          title="AI Diagnoses"
          value="0"
          color="purple"
          icon={<span className="text-2xl">🤖</span>}
        />
        <StatCard
          title="Pending Follow-ups"
          value="0"
          color="orange"
          icon={<span className="text-2xl">📅</span>}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/animals" 
            className="flex flex-col items-center p-6 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
          >
            <span className="text-3xl mb-2">➕</span>
            <span className="text-sm font-medium text-gray-700">Add Animal</span>
          </Link>
          <Link 
            to="/diagnosis" 
            className="flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
          >
            <span className="text-3xl mb-2">🔍</span>
            <span className="text-sm font-medium text-gray-700">AI Diagnosis</span>
          </Link>
          <Link 
            to="/health-records" 
            className="flex flex-col items-center p-6 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
          >
            <span className="text-3xl mb-2">📝</span>
            <span className="text-sm font-medium text-gray-700">Add Record</span>
          </Link>
          <Link 
            to="/profile" 
            className="flex flex-col items-center p-6 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors"
          >
            <span className="text-3xl mb-2">👤</span>
            <span className="text-sm font-medium text-gray-700">My Profile</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl mb-4 block">📭</span>
          <p>No recent activity yet.</p>
          <p className="text-sm mt-2">Add your first animal to get started!</p>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-8 text-white">
        <h3 className="text-xl font-bold mb-2">🚀 More Features Coming Soon!</h3>
        <p className="opacity-90">
          We're working on adding animal management, health tracking, and AI-powered diagnosis features.
          Stay tuned for updates!
        </p>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
