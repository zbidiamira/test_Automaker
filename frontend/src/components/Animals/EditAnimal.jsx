import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import { updateAnimal } from '../../services/animalService';

const speciesOptions = [
  { value: 'Dog', label: '🐕 Dog' },
  { value: 'Cat', label: '🐈 Cat' },
  { value: 'Bird', label: '🐦 Bird' },
  { value: 'Rabbit', label: '🐰 Rabbit' },
  { value: 'Hamster', label: '🐹 Hamster' },
  { value: 'Fish', label: '🐠 Fish' },
  { value: 'Reptile', label: '🦎 Reptile' },
  { value: 'Other', label: '🐾 Other' },
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const EditAnimal = ({ isOpen, onClose, animal, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Populate form when animal changes
  useEffect(() => {
    if (animal) {
      reset({
        name: animal.name || '',
        species: animal.species || '',
        breed: animal.breed || '',
        age: animal.age || '',
        weight: animal.weight || '',
        gender: animal.gender || '',
        image: animal.image || '',
      });
    }
  }, [animal, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateAnimal(animal._id, data);
      toast.success('Animal updated successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update animal');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!animal) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Edit ${animal.name}`}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter pet name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Species */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Species *
          </label>
          <select
            {...register('species', { required: 'Species is required' })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.species ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select species</option>
            {speciesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.species && (
            <p className="text-red-500 text-sm mt-1">{errors.species.message}</p>
          )}
        </div>

        {/* Breed */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Breed
          </label>
          <input
            type="text"
            {...register('breed')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter breed (optional)"
          />
        </div>

        {/* Age and Weight */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age (years)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              {...register('age', { min: { value: 0, message: 'Age must be positive' } })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              {...register('weight', { min: { value: 0, message: 'Weight must be positive' } })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.weight ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Weight"
            />
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
            )}
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <div className="flex space-x-4">
            {genderOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  value={option.value}
                  {...register('gender')}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            {...register('image')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="https://example.com/pet-image.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional: Add a URL to your pet's photo
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditAnimal;
