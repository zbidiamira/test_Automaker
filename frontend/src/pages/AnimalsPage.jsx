import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../layouts/DashboardLayout';
import { AnimalList, AddAnimal, EditAnimal } from '../components/Animals';
import { ConfirmModal } from '../components/Common/Modal';
import { getAnimals, deleteAnimal } from '../services/animalService';

const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch animals on mount
  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    setLoading(true);
    try {
      const response = await getAnimals();
      setAnimals(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch animals');
      console.error('Error fetching animals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnimal = () => {
    setShowAddModal(true);
  };

  const handleEditAnimal = (animal) => {
    setSelectedAnimal(animal);
    setShowEditModal(true);
  };

  const handleDeleteClick = (animal) => {
    setSelectedAnimal(animal);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAnimal) return;
    
    setDeleteLoading(true);
    try {
      await deleteAnimal(selectedAnimal._id);
      toast.success(`${selectedAnimal.name} has been deleted`);
      setShowDeleteModal(false);
      setSelectedAnimal(null);
      fetchAnimals();
    } catch (error) {
      toast.error('Failed to delete animal');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddSuccess = () => {
    fetchAnimals();
  };

  const handleEditSuccess = () => {
    fetchAnimals();
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Animals</h1>
        <p className="text-gray-500 mt-1">
          Manage your pets and view their health information
        </p>
      </div>

      {/* Animal List */}
      <AnimalList
        animals={animals}
        loading={loading}
        onAdd={handleAddAnimal}
        onEdit={handleEditAnimal}
        onDelete={handleDeleteClick}
      />

      {/* Add Animal Modal */}
      <AddAnimal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />

      {/* Edit Animal Modal */}
      <EditAnimal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAnimal(null);
        }}
        animal={selectedAnimal}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedAnimal(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Animal"
        message={`Are you sure you want to delete ${selectedAnimal?.name}? This will also delete all associated health records. This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />
    </DashboardLayout>
  );
};

export default AnimalsPage;
