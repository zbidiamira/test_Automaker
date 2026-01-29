import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { CustomerDashboard } from '../components/Dashboard';
import { getDashboardStats, getRecentActivity } from '../services/dashboardService';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        getDashboardStats(),
        getRecentActivity(),
      ]);

      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
      if (activityResponse.success) {
        setRecentActivity(activityResponse.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <CustomerDashboard
        stats={stats}
        recentActivity={recentActivity}
        loading={loading}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
