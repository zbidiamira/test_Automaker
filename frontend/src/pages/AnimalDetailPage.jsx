import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardLayout from '../layouts/DashboardLayout';
import { AnimalDetail, EditAnimal } from '../components/Animals';
import { ConfirmModal } from '../components/Common/Modal';
import Loading from '../components/Common/Loading';
import { getAnimal, deleteAnimal } from '../services/animalService';

const AnimalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchAnimal();
  }, [id]);

  const fetchAnimal = async () => {
    setLoading(true);
    try {
      const response = await getAnimal(id);
      setAnimal(response.data);
    } catch (error) {
      toast.error('Failed to fetch animal details');
      navigate('/animals');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await deleteAnimal(id);
      toast.success(`${animal.name} has been deleted`);
      navigate('/animals');
    } catch (error) {
      toast.error('Failed to delete animal');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditSuccess = () => {
    fetchAnimal();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <Loading size="lg" text="Loading animal details..." />
        </div>
      </DashboardLayout>
    );
  }

  if (!animal) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Animal Not Found</h2>
          <p className="text-gray-500 mb-6">
            The animal you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => navigate('/animals')}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Back to Animals
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <AnimalDetail
        animal={animal}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Edit Animal Modal */}
      <EditAnimal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        animal={animal}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Animal"
        message={`Are you sure you want to delete ${animal?.name}? This will also delete all associated health records. This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />
    </DashboardLayout>
  );
};

export default AnimalDetailPage;
