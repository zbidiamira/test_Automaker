import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from '../Common';
import { symptomCategories, getAllSymptoms } from '../../services/healthService';

const severityOptions = ['Low', 'Medium', 'High', 'Critical'];

const EditHealthRecord = ({ isOpen, onClose, onSubmit, record, isLoading }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [symptomSearch, setSymptomSearch] = useState('');
  const [medications, setMedications] = useState([]);
  const [activeCategory, setActiveCategory] = useState('digestive');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Initialize form with record data
  useEffect(() => {
    if (record && isOpen) {
      reset({
        severity: record.severity || 'Low',
        diagnosis: record.diagnosis || '',
        notes: record.notes || '',
        followUpDate: record.followUpDate 
          ? new Date(record.followUpDate).toISOString().split('T')[0] 
          : '',
      });
      setSelectedSymptoms(record.symptoms || []);
      setMedications(record.medications || []);
    }
  }, [record, isOpen, reset]);

  // Filter symptoms by search
  const filteredSymptoms = symptomSearch
    ? getAllSymptoms().filter(s => 
        s.toLowerCase().includes(symptomSearch.toLowerCase()) &&
        !selectedSymptoms.includes(s)
      )
    : (symptomCategories[activeCategory] || []).filter(s => !selectedSymptoms.includes(s));

  // Toggle symptom selection
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  // Add custom symptom
  const addCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms(prev => [...prev, customSymptom.trim()]);
      setCustomSymptom('');
    }
  };

  // Add medication
  const addMedication = () => {
    setMedications(prev => [
      ...prev,
      { name: '', dosage: '', frequency: '', notes: '' },
    ]);
  };

  // Update medication
  const updateMedication = (index, field, value) => {
    setMedications(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Remove medication
  const removeMedication = (index) => {
    setMedications(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const onFormSubmit = (data) => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom');
      return;
    }

    const validMedications = medications.filter(m => m.name.trim());

    onSubmit({
      ...data,
      symptoms: selectedSymptoms,
      medications: validMedications,
    });
  };

  // Reset form when modal closes
  const handleClose = () => {
    reset();
    setSelectedSymptoms([]);
    setMedications([]);
    setCustomSymptom('');
    setSymptomSearch('');
    onClose();
  };

  if (!record) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Health Record" size="lg">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Animal Info (Read-only) */}
        {record.animal && (
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
            <span className="text-2xl">
              {record.animal.species === 'Dog' ? '🐕' :
               record.animal.species === 'Cat' ? '🐈' :
               record.animal.species === 'Bird' ? '🐦' : '🐾'}
            </span>
            <div>
              <div className="font-medium text-gray-900">{record.animal.name}</div>
              <div className="text-sm text-gray-600">{record.animal.species} • {record.animal.breed}</div>
            </div>
          </div>
        )}

        {/* Symptoms Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symptoms * ({selectedSymptoms.length} selected)
          </label>

          {/* Selected Symptoms */}
          {selectedSymptoms.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm flex items-center gap-1"
                >
                  {symptom}
                  <button
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className="ml-1 text-emerald-600 hover:text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Symptom Search */}
          <input
            type="text"
            placeholder="Search symptoms..."
            value={symptomSearch}
            onChange={(e) => setSymptomSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />

          {/* Category Tabs */}
          {!symptomSearch && (
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.keys(symptomCategories).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 text-sm rounded-lg capitalize transition-colors ${
                    activeCategory === category
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Symptom Options */}
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded-lg">
            {filteredSymptoms.map((symptom) => (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
              >
                + {symptom}
              </button>
            ))}
            {filteredSymptoms.length === 0 && (
              <p className="text-gray-500 text-sm p-2">No symptoms found</p>
            )}
          </div>

          {/* Custom Symptom */}
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Add custom symptom..."
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSymptom())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <Button type="button" variant="outline" onClick={addCustomSymptom}>
              Add
            </Button>
          </div>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Severity
          </label>
          <div className="flex gap-2">
            {severityOptions.map((option) => (
              <label
                key={option}
                className={`flex-1 text-center px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                  watch('severity') === option
                    ? option === 'Critical' ? 'bg-red-100 border-red-500 text-red-800' :
                      option === 'High' ? 'bg-orange-100 border-orange-500 text-orange-800' :
                      option === 'Medium' ? 'bg-yellow-100 border-yellow-500 text-yellow-800' :
                      'bg-green-100 border-green-500 text-green-800'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  {...register('severity')}
                  value={option}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Diagnosis */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diagnosis
          </label>
          <input
            type="text"
            {...register('diagnosis')}
            placeholder="Enter diagnosis if known..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Medications */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Medications
            </label>
            <Button type="button" variant="outline" size="sm" onClick={addMedication}>
              + Add Medication
            </Button>
          </div>

          {medications.length > 0 && (
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
                  <button
                    type="button"
                    onClick={() => removeMedication(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Medication name"
                      value={med.name}
                      onChange={(e) => updateMedication(index, 'name', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g., 10mg)"
                      value={med.dosage}
                      onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Frequency (e.g., twice daily)"
                      value={med.frequency}
                      onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Notes"
                      value={med.notes || ''}
                      onChange={(e) => updateMedication(index, 'notes', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            placeholder="Any additional observations or notes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
          />
        </div>

        {/* Follow-up Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Follow-up Date
          </label>
          <input
            type="date"
            {...register('followUpDate')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Update Record
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditHealthRecord;
