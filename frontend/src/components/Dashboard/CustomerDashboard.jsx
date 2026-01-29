import { useAuth } from '../../context/AuthContext';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';

const CustomerDashboard = ({ stats, recentActivity, loading }) => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur p-4 rounded-full">
            <span className="text-4xl">👋</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-white/80 mt-1">
              Here's an overview of your pet's health and activities
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Animals"
          value={loading ? '...' : stats?.totalAnimals || 0}
          color="emerald"
          icon={<span className="text-2xl">🐾</span>}
        />
        <StatCard
          title="Health Records"
          value={loading ? '...' : stats?.totalHealthRecords || 0}
          color="blue"
          icon={<span className="text-2xl">📋</span>}
        />
        <StatCard
          title="AI Diagnoses"
          value={loading ? '...' : stats?.totalDiagnoses || 0}
          color="purple"
          icon={<span className="text-2xl">🤖</span>}
        />
        <StatCard
          title="Last Checkup"
          value={loading ? '...' : stats?.lastCheckup || 'N/A'}
          color="amber"
          icon={<span className="text-2xl">📅</span>}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivity} />
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Health Tips Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Pet Health Tips</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50 rounded-lg">
            <h4 className="font-medium text-emerald-700 mb-2">Regular Checkups</h4>
            <p className="text-sm text-gray-600">
              Schedule regular vet visits to catch health issues early and keep vaccinations up to date.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-700 mb-2">Balanced Diet</h4>
            <p className="text-sm text-gray-600">
              Provide species-appropriate nutrition and monitor portion sizes to maintain healthy weight.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-700 mb-2">Exercise & Play</h4>
            <p className="text-sm text-gray-600">
              Regular physical activity keeps your pet healthy, happy, and mentally stimulated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
