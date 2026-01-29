import { useState } from 'react';
import { format } from 'date-fns';

const severityConfig = {
  Low: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  High: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  Critical: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
};

const HealthRecordCard = ({ record, onEdit, onDelete, onView }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const severity = severityConfig[record.severity] || severityConfig.Low;

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${severity.border} overflow-hidden transition-all hover:shadow-md`}>
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severity.bg} ${severity.text}`}>
                {record.severity}
              </span>
              <span className="text-sm text-gray-500">
                {format(new Date(record.createdAt), 'MMM d, yyyy • h:mm a')}
              </span>
            </div>
            
            {/* Symptoms */}
            <div className="flex flex-wrap gap-2 mb-3">
              {record.symptoms.slice(0, isExpanded ? undefined : 3).map((symptom, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                >
                  {symptom}
                </span>
              ))}
              {!isExpanded && record.symptoms.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-sm rounded-md">
                  +{record.symptoms.length - 3} more
                </span>
              )}
            </div>

            {/* Diagnosis */}
            {record.diagnosis && (
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">Diagnosis: </span>
                <span className="text-sm text-gray-600">{record.diagnosis}</span>
              </div>
            )}
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
            {/* All Symptoms */}
            {record.symptoms.length > 3 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">All Symptoms</h4>
                <div className="flex flex-wrap gap-2">
                  {record.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Medications */}
            {record.medications && record.medications.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Medications</h4>
                <div className="space-y-2">
                  {record.medications.map((med, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-3">
                      <div className="font-medium text-blue-900">{med.name}</div>
                      <div className="text-sm text-blue-700">
                        {med.dosage} • {med.frequency}
                      </div>
                      {med.notes && (
                        <div className="text-sm text-blue-600 mt-1">{med.notes}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {record.notes && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {record.notes}
                </p>
              </div>
            )}

            {/* Follow-up Date */}
            {record.followUpDate && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-amber-500">📅</span>
                <span className="font-medium text-gray-700">Follow-up:</span>
                <span className="text-gray-600">
                  {format(new Date(record.followUpDate), 'MMMM d, yyyy')}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="px-4 py-3 bg-gray-50 flex justify-end gap-2">
        <button
          onClick={() => onView?.(record)}
          className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          View Details
        </button>
        <button
          onClick={() => onEdit?.(record)}
          className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(record)}
          className="px-3 py-1.5 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HealthRecordCard;
