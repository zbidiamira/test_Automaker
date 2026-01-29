import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button, Loading } from '../components/Common';
import {
  HealthHistory,
  AddHealthRecord,
  EditHealthRecord,
  HealthDetail,
} from '../components/Health';
import {
  getRecentHealthRecords,
  getHealthStats,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
} from '../services/healthService';

const AllHealthRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch records and stats
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [recordsRes, statsRes] = await Promise.all([
        getRecentHealthRecords(50),
        getHealthStats(),
      ]);
      setRecords(recordsRes.data || []);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load health records');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle add record
  const handleAddRecord = async (data) => {
    setSubmitting(true);
    try {
      await createHealthRecord(data);
      toast.success('Health record added successfully');
      setShowAddModal(false);
      fetchData();
    } catch (error) {
      console.error('Error adding health record:', error);
      toast.error(error.response?.data?.message || 'Failed to add health record');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit record
  const handleEditRecord = async (data) => {
    if (!selectedRecord) return;
    
    setSubmitting(true);
    try {
      await updateHealthRecord(selectedRecord._id, data);
      toast.success('Health record updated successfully');
      setShowEditModal(false);
      setSelectedRecord(null);
      fetchData();
    } catch (error) {
      console.error('Error updating health record:', error);
      toast.error(error.response?.data?.message || 'Failed to update health record');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete record
  const handleDeleteRecord = async (record) => {
    if (!window.confirm('Are you sure you want to delete this health record?')) {
      return;
    }
    
    try {
      await deleteHealthRecord(record._id);
      toast.success('Health record deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting health record:', error);
      toast.error(error.response?.data?.message || 'Failed to delete health record');
    }
  };

  // Open edit modal
  const openEditModal = (record) => {
    setSelectedRecord(record);
    setShowEditModal(true);
  };

  // Open detail modal
  const openDetailModal = (record) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-4">
            <Link to="/dashboard" className="hover:text-emerald-600">Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">All Health Records</span>
          </nav>

          {/* Title */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  📋 All Health Records
                </h1>
                <p className="text-gray-600 mt-1">
                  View and manage health records for all your pets
                </p>
              </div>
              <Button onClick={() => setShowAddModal(true)}>
                + Add Health Record
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-2xl font-bold text-emerald-600">{stats.totalRecords}</div>
                <div className="text-sm text-gray-600">Total Records</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.recordsThisMonth}</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-2xl font-bold text-amber-600">
                  {stats.upcomingFollowUps?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Pending Follow-ups</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-2xl font-bold text-red-600">
                  {stats.severityDistribution?.Critical || 0}
                </div>
                <div className="text-sm text-gray-600">Critical Records</div>
              </div>
            </div>
          )}
        </div>

        {/* Health History */}
        <HealthHistory
          records={records}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDeleteRecord}
          onView={openDetailModal}
        />

        {/* Add Health Record Modal */}
        <AddHealthRecord
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddRecord}
          isLoading={submitting}
        />

        {/* Edit Health Record Modal */}
        <EditHealthRecord
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedRecord(null);
          }}
          onSubmit={handleEditRecord}
          record={selectedRecord}
          isLoading={submitting}
        />

        {/* Health Detail Modal */}
        <HealthDetail
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedRecord(null);
          }}
          record={selectedRecord}
          onEdit={(record) => {
            setShowDetailModal(false);
            openEditModal(record);
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default AllHealthRecordsPage;
