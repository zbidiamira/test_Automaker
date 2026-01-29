import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button, Loading } from '../Common';
import SymptomSelector from './SymptomSelector';
import DiagnosisResult from './DiagnosisResult';
import DisclaimerModal from './DisclaimerModal';
import { diagnoseSymptoms, durationOptions } from '../../services/aiService';
import { getAnimals } from '../../services/animalService';
import { createHealthRecord } from '../../services/healthService';

const STEPS = {
  SELECT_ANIMAL: 0,
  SELECT_SYMPTOMS: 1,
  ADDITIONAL_INFO: 2,
  REVIEW: 3,
  RESULT: 4,
};

const SymptomChecker = ({ preSelectedAnimal }) => {
  const navigate = useNavigate();
  
  // State
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_ANIMAL);
  const [animals, setAnimals] = useState([]);
  const [loadingAnimals, setLoadingAnimals] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState(preSelectedAnimal || null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [duration, setDuration] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(
    localStorage.getItem('ai_disclaimer_accepted') === 'true'
  );

  // Load animals
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await getAnimals(1, 100);
        setAnimals(response.data || []);
      } catch (error) {
        console.error('Error loading animals:', error);
        toast.error('Failed to load your pets');
      } finally {
        setLoadingAnimals(false);
      }
    };

    if (!preSelectedAnimal) {
      fetchAnimals();
    } else {
      setLoadingAnimals(false);
      setCurrentStep(STEPS.SELECT_SYMPTOMS);
    }
  }, [preSelectedAnimal]);

  // Check disclaimer on mount
  useEffect(() => {
    if (!disclaimerAccepted) {
      setShowDisclaimer(true);
    }
  }, []);

  // Handle disclaimer acceptance
  const handleDisclaimerAccept = () => {
    localStorage.setItem('ai_disclaimer_accepted', 'true');
    setDisclaimerAccepted(true);
    setShowDisclaimer(false);
  };

  // Handle disclaimer decline
  const handleDisclaimerDecline = () => {
    navigate('/dashboard');
  };

  // Navigate steps
  const goToStep = (step) => setCurrentStep(step);
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.RESULT));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, STEPS.SELECT_ANIMAL));

  // Handle animal selection
  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(animal);
    nextStep();
  };

  // Submit diagnosis request
  const handleSubmit = async () => {
    if (!selectedAnimal || selectedSymptoms.length === 0) {
      toast.error('Please select an animal and at least one symptom');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await diagnoseSymptoms({
        animalId: selectedAnimal._id,
        symptoms: selectedSymptoms,
        duration,
        additionalInfo,
        saveToRecords: false,
      });

      setDiagnosis(response.data.diagnosis);
      setCurrentStep(STEPS.RESULT);
    } catch (error) {
      console.error('Diagnosis error:', error);
      toast.error(error.response?.data?.message || 'Failed to analyze symptoms');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Save diagnosis to health records
  const handleSaveToRecords = async () => {
    if (!diagnosis || !selectedAnimal) return;

    try {
      await createHealthRecord({
        animalId: selectedAnimal._id,
        symptoms: selectedSymptoms,
        diagnosis: diagnosis.possibleConditions?.[0]?.name || 'AI-assisted diagnosis',
        notes: `AI Diagnosis:\n${diagnosis.possibleConditions
          ?.map((c) => `- ${c.name} (${c.probability})`)
          .join('\n')}\n\nAdditional Notes: ${additionalInfo || 'None'}`,
        severity:
          diagnosis.urgency === 'Emergency'
            ? 'Critical'
            : diagnosis.urgency === 'High'
            ? 'High'
            : diagnosis.urgency === 'Medium'
            ? 'Medium'
            : 'Low',
      });
      toast.success('Saved to health records!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save to health records');
    }
  };

  // Reset wizard
  const handleNewDiagnosis = () => {
    setSelectedAnimal(preSelectedAnimal || null);
    setSelectedSymptoms([]);
    setDuration('');
    setAdditionalInfo('');
    setDiagnosis(null);
    setCurrentStep(preSelectedAnimal ? STEPS.SELECT_SYMPTOMS : STEPS.SELECT_ANIMAL);
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

  // Render step indicator
  const renderStepIndicator = () => {
    const steps = ['Select Pet', 'Symptoms', 'Details', 'Review'];
    const activeStep = Math.min(currentStep, 3);

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((label, index) => (
          <div key={label} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                index < activeStep
                  ? 'bg-emerald-500 text-white'
                  : index === activeStep
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < activeStep ? '✓' : index + 1}
            </div>
            <span
              className={`ml-2 text-sm hidden sm:inline ${
                index <= activeStep ? 'text-emerald-700 font-medium' : 'text-gray-500'
              }`}
            >
              {label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-1 mx-2 rounded ${
                  index < activeStep ? 'bg-emerald-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Show disclaimer modal
  if (showDisclaimer) {
    return (
      <DisclaimerModal
        isOpen={showDisclaimer}
        onAccept={handleDisclaimerAccept}
        onDecline={handleDisclaimerDecline}
      />
    );
  }

  // Analyzing state
  if (isAnalyzing) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-bounce text-6xl mb-4">🐾</div>
        <div className="animate-pulse">
          <Loading size="lg" text="Analyzing symptoms..." />
        </div>
        <p className="text-gray-500 mt-4">
          Our AI veterinary assistant is reviewing the symptoms...
        </p>
      </div>
    );
  }

  // Result step
  if (currentStep === STEPS.RESULT && diagnosis) {
    return (
      <DiagnosisResult
        diagnosis={diagnosis}
        animal={selectedAnimal}
        onSaveToRecords={handleSaveToRecords}
        onNewDiagnosis={handleNewDiagnosis}
      />
    );
  }

  return (
    <div>
      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Step 1: Select Animal */}
        {currentStep === STEPS.SELECT_ANIMAL && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Select Your Pet
            </h2>
            <p className="text-gray-600 mb-6">
              Choose which pet you'd like to check symptoms for
            </p>

            {loadingAnimals ? (
              <Loading size="lg" text="Loading your pets..." />
            ) : animals.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No Pets Registered Yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Add your first pet to use the symptom checker
                </p>
                <Button onClick={() => navigate('/animals')}>
                  Add Your First Pet
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {animals.map((animal) => (
                  <button
                    key={animal._id}
                    onClick={() => handleAnimalSelect(animal)}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-emerald-100">
                        {getSpeciesEmoji(animal.species)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {animal.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {animal.species} • {animal.breed || 'Unknown breed'}
                        </div>
                        {animal.age && (
                          <div className="text-xs text-gray-400">
                            {animal.age} years old
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Select Symptoms */}
        {currentStep === STEPS.SELECT_SYMPTOMS && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              {selectedAnimal && (
                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <span>{getSpeciesEmoji(selectedAnimal.species)}</span>
                  <span className="font-medium text-emerald-800">
                    {selectedAnimal.name}
                  </span>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              What symptoms have you noticed?
            </h2>
            <p className="text-gray-600 mb-6">
              Select all symptoms you've observed in your pet
            </p>

            <SymptomSelector
              selectedSymptoms={selectedSymptoms}
              onChange={setSelectedSymptoms}
            />

            <div className="flex justify-between mt-6 pt-6 border-t">
              <Button variant="outline" onClick={prevStep}>
                ← Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={selectedSymptoms.length === 0}
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Additional Info */}
        {currentStep === STEPS.ADDITIONAL_INFO && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Additional Details
            </h2>
            <p className="text-gray-600 mb-6">
              Help us provide a more accurate assessment
            </p>

            <div className="space-y-6">
              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How long has your pet been showing these symptoms?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {durationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDuration(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                        duration === option.value
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-white border-gray-300 hover:border-emerald-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any additional information? (Optional)
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={4}
                  placeholder="E.g., recent diet changes, exposure to other animals, recent vaccinations, behavior changes..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6 pt-6 border-t">
              <Button variant="outline" onClick={prevStep}>
                ← Back
              </Button>
              <Button onClick={nextStep}>
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === STEPS.REVIEW && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Review & Analyze
            </h2>
            <p className="text-gray-600 mb-6">
              Please confirm the information below is correct
            </p>

            <div className="space-y-4">
              {/* Pet Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-700 mb-2">Pet</h3>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {getSpeciesEmoji(selectedAnimal?.species)}
                  </span>
                  <div>
                    <div className="font-semibold">{selectedAnimal?.name}</div>
                    <div className="text-sm text-gray-500">
                      {selectedAnimal?.species} • {selectedAnimal?.breed}
                    </div>
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-700 mb-2">
                  Symptoms ({selectedSymptoms.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <span
                      key={symptom}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              {/* Duration */}
              {duration && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Duration</h3>
                  <p>
                    {durationOptions.find((o) => o.value === duration)?.label}
                  </p>
                </div>
              )}

              {/* Additional Info */}
              {additionalInfo && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-medium text-gray-700 mb-2">
                    Additional Information
                  </h3>
                  <p className="text-gray-600">{additionalInfo}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6 pt-6 border-t">
              <Button variant="outline" onClick={prevStep}>
                ← Back
              </Button>
              <Button onClick={handleSubmit}>
                🤖 Analyze Symptoms
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
