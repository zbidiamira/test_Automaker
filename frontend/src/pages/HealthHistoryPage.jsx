import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  getHealthRecords,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
} from '../services/healthService';
import { getAnimal } from '../services/animalService';

const HealthHistoryPage = () => {
  const { animalId } = useParams();
  const navigate = useNavigate();
  
  const [animal, setAnimal] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch animal info
  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await getAnimal(animalId);
        setAnimal(response.data);
      } catch (error) {
        console.error('Error fetching animal:', error);
        toast.error('Animal not found');
        navigate('/animals');
      }
    };
    
    if (animalId) {
      fetchAnimal();
    }
  }, [animalId, navigate]);

  // Fetch health records
  const fetchRecords = useCallback(async () => {
    if (!animalId) return;
    
    setLoading(true);
    try {
      const response = await getHealthRecords(animalId, currentPage, 10, filters);
      setRecords(response.data || []);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching health records:', error);
      toast.error('Failed to load health records');
    } finally {
      setLoading(false);
    }
  }, [animalId, currentPage, filters]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle add record
  const handleAddRecord = async (data) => {
    setSubmitting(true);
    try {
      await createHealthRecord({
        ...data,
        animalId,
      });
      toast.success('Health record added successfully');
      setShowAddModal(false);
      fetchRecords();
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
      fetchRecords();
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
      fetchRecords();
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

  // Get species emoji
  const getSpeciesEmoji = (species) => {
    const emojis = {
      Dog: '🐕',
      Cat: '🐈',
      Bird: '🐦',
      Rabbit: '🐰',
      Hamster: '🐹',
      Fish: '🐠',
      Reptile: '🦎',
    };
    return emojis[species] || '🐾';
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
            <Link to="/animals" className="hover:text-emerald-600">My Animals</Link>
            <span className="mx-2">/</span>
            {animal && (
              <>
                <Link to={`/animals/${animal._id}`} className="hover:text-emerald-600">
                  {animal.name}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-gray-900">Health History</span>
          </nav>

          {/* Animal Info Header */}
          {animal ? (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl">
                    {getSpeciesEmoji(animal.species)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {animal.name}'s Health History
                    </h1>
                    <p className="text-gray-600">
                      {animal.species} • {animal.breed || 'Unknown breed'}
                      {animal.age && ` • ${animal.age} years old`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link to={`/animals/${animal._id}`}>
                    <Button variant="outline">
                      ← Back to Profile
                    </Button>
                  </Link>
                  <Button onClick={() => setShowAddModal(true)}>
                    + Add Health Record
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <Loading size="sm" />
            </div>
          )}
        </div>

        {/* Health History */}
        <HealthHistory
          records={records}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onFilterChange={handleFilterChange}
          onEdit={openEditModal}
          onDelete={handleDeleteRecord}
          onView={openDetailModal}
        />

        {/* Add Health Record Modal */}
        <AddHealthRecord
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddRecord}
          selectedAnimal={animal}
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

export default HealthHistoryPage;
