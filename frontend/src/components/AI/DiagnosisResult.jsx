import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '../Common';
import { getRecommendations } from '../../services/aiService';

const urgencyConfig = {
  Low: {
    bg: 'bg-green-100',
    border: 'border-green-500',
    text: 'text-green-800',
    icon: '✅',
    message: 'No immediate concern',
  },
  Medium: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-500',
    text: 'text-yellow-800',
    icon: '⚠️',
    message: 'Monitor closely',
  },
  High: {
    bg: 'bg-orange-100',
    border: 'border-orange-500',
    text: 'text-orange-800',
    icon: '🔶',
    message: 'Veterinary attention recommended',
  },
  Emergency: {
    bg: 'bg-red-100',
    border: 'border-red-500',
    text: 'text-red-800',
    icon: '🚨',
    message: 'Seek immediate veterinary care!',
  },
};

const DiagnosisResult = ({ diagnosis, animal, onSaveToRecords, onNewDiagnosis, onClose }) => {
  const [expandedCondition, setExpandedCondition] = useState(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState({});

  const urgency = urgencyConfig[diagnosis.urgency] || urgencyConfig.Low;

  // Fetch recommendations for a condition
  const fetchRecommendations = async (condition) => {
    if (recommendations[condition.name]) {
      setExpandedCondition(expandedCondition === condition.name ? null : condition.name);
      return;
    }

    setLoadingRecommendations(true);
    try {
      const response = await getRecommendations(animal?.species || 'pet', condition.name);
      setRecommendations((prev) => ({
        ...prev,
        [condition.name]: response.data,
      }));
      setExpandedCondition(condition.name);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Print report
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:p-8">
      {/* Urgency Banner */}
      <div className={`${urgency.bg} ${urgency.border} border-l-4 rounded-r-xl p-4`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{urgency.icon}</span>
          <div>
            <h2 className={`text-xl font-bold ${urgency.text}`}>
              {diagnosis.urgency} Urgency
            </h2>
            <p className={urgency.text}>{urgency.message}</p>
          </div>
        </div>
        {diagnosis.shouldSeeVet && diagnosis.timeframe && (
          <div className={`mt-3 ${urgency.text} font-medium`}>
            ⏰ Recommended to see a vet: {diagnosis.timeframe}
          </div>
        )}
      </div>

      {/* Animal Info */}
      {animal && (
        <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
            {animal.species === 'Dog' ? '🐕' :
             animal.species === 'Cat' ? '🐈' :
             animal.species === 'Bird' ? '🐦' : '🐾'}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{animal.name}</div>
            <div className="text-sm text-gray-600">{animal.species} • {animal.breed}</div>
          </div>
          <div className="ml-auto text-sm text-gray-500">
            {format(new Date(diagnosis.analyzedAt || new Date()), 'MMM d, yyyy h:mm a')}
          </div>
        </div>
      )}

      {/* Possible Conditions */}
      {diagnosis.possibleConditions && diagnosis.possibleConditions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🔍 Possible Conditions
          </h3>
          <div className="space-y-3">
            {diagnosis.possibleConditions.map((condition, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => fetchRecommendations(condition)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          {condition.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            condition.probability === 'High'
                              ? 'bg-red-100 text-red-700'
                              : condition.probability === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {condition.probability} probability
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{condition.description}</p>
                      {condition.commonIn && (
                        <p className="text-xs text-gray-500 mt-1">
                          Common in: {condition.commonIn}
                        </p>
                      )}
                    </div>
                    <span className="text-gray-400 ml-3">
                      {expandedCondition === condition.name ? '▼' : '▶'}
                    </span>
                  </div>
                </button>

                {/* Expanded Recommendations */}
                {expandedCondition === condition.name && recommendations[condition.name] && (
                  <div className="border-t border-gray-100 p-4 bg-blue-50">
                    <h4 className="font-medium text-blue-900 mb-3">
                      Care Recommendations for {condition.name}
                    </h4>
                    {recommendations[condition.name].homeCare && (
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-blue-800">Home Care:</h5>
                        <ul className="text-sm text-blue-700 ml-4 list-disc">
                          {recommendations[condition.name].homeCare.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {recommendations[condition.name].typicalRecoveryTime && (
                      <p className="text-sm text-blue-700">
                        <strong>Recovery time:</strong> {recommendations[condition.name].typicalRecoveryTime}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Actions */}
      {diagnosis.recommendedActions && diagnosis.recommendedActions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            ✅ Recommended Actions
          </h3>
          <div className="bg-emerald-50 rounded-xl p-4">
            <ul className="space-y-2">
              {diagnosis.recommendedActions.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span className="text-emerald-900">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Medications */}
      {diagnosis.medications && diagnosis.medications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            💊 Potential Medications
          </h3>
          <div className="grid gap-3">
            {diagnosis.medications.map((med, index) => (
              <div key={index} className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-purple-900">{med.name}</div>
                    <div className="text-sm text-purple-700">{med.dosage}</div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      med.type === 'Prescription'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {med.type}
                  </span>
                </div>
                {med.notes && (
                  <p className="text-sm text-purple-600 mt-2 italic">{med.notes}</p>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            ⚠️ Always consult a veterinarian before administering any medication.
          </p>
        </div>
      )}

      {/* Home Care Tips */}
      {diagnosis.homeCareTips && diagnosis.homeCareTips.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🏠 Home Care Tips
          </h3>
          <div className="bg-blue-50 rounded-xl p-4">
            <ul className="space-y-2">
              {diagnosis.homeCareTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">💡</span>
                  <span className="text-blue-900">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Warning Signs */}
      {diagnosis.warningSignsToWatch && diagnosis.warningSignsToWatch.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            ⚠️ Warning Signs to Watch
          </h3>
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-sm text-red-800 mb-3">
              Seek immediate veterinary care if you observe any of these signs:
            </p>
            <ul className="space-y-2">
              {diagnosis.warningSignsToWatch.map((sign, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">🚨</span>
                  <span className="text-red-900">{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-gray-100 rounded-xl p-4">
        <p className="text-sm text-gray-600 italic">
          {diagnosis.disclaimer ||
            'This AI-generated analysis is for informational purposes only and should not replace professional veterinary advice. Always consult with a licensed veterinarian for proper diagnosis and treatment.'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          🖨️ Print Report
        </Button>
        {onSaveToRecords && (
          <Button variant="outline" onClick={onSaveToRecords}>
            💾 Save to Health Records
          </Button>
        )}
        <Button variant="outline" onClick={onNewDiagnosis}>
          🔄 New Diagnosis
        </Button>
        {onClose && (
          <Button onClick={onClose}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default DiagnosisResult;
