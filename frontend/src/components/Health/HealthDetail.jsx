import { format } from 'date-fns';
import { Modal, Button } from '../Common';

const severityConfig = {
  Low: { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⚠️' },
  High: { bg: 'bg-orange-100', text: 'text-orange-800', icon: '🔶' },
  Critical: { bg: 'bg-red-100', text: 'text-red-800', icon: '🚨' },
};

const HealthDetail = ({ isOpen, onClose, record, onEdit, onPrint }) => {
  if (!record) return null;

  const severity = severityConfig[record.severity] || severityConfig.Low;

  const handlePrint = () => {
    window.print();
    onPrint?.(record);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Health Record Details" size="lg">
      <div className="space-y-6 print:p-8">
        {/* Header */}
        <div className="flex items-start justify-between print:border-b print:pb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${severity.bg} ${severity.text}`}>
                {severity.icon} {record.severity} Severity
              </span>
            </div>
            <p className="text-gray-500">
              Recorded on {format(new Date(record.createdAt), 'MMMM d, yyyy at h:mm a')}
            </p>
          </div>

          {/* Print Button */}
          <div className="print:hidden">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              🖨️ Print
            </Button>
          </div>
        </div>

        {/* Animal Info */}
        {record.animal && (
          <div className="bg-emerald-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-emerald-800 mb-2">Patient Information</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
                {record.animal.species === 'Dog' ? '🐕' :
                 record.animal.species === 'Cat' ? '🐈' :
                 record.animal.species === 'Bird' ? '🐦' :
                 record.animal.species === 'Rabbit' ? '🐰' :
                 record.animal.species === 'Hamster' ? '🐹' :
                 record.animal.species === 'Fish' ? '🐠' :
                 record.animal.species === 'Reptile' ? '🦎' : '🐾'}
              </div>
              <div>
                <div className="font-semibold text-emerald-900">{record.animal.name}</div>
                <div className="text-sm text-emerald-700">
                  {record.animal.species} • {record.animal.breed || 'Unknown breed'}
                  {record.animal.age && ` • ${record.animal.age} years old`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Symptoms */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Reported Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {record.symptoms.map((symptom, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg text-sm"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>

        {/* Diagnosis */}
        {record.diagnosis && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Diagnosis</h3>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-blue-900">{record.diagnosis}</p>
            </div>
          </div>
        )}

        {/* Medications */}
        {record.medications && record.medications.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Prescribed Medications</h3>
            <div className="space-y-3">
              {record.medications.map((med, index) => (
                <div
                  key={index}
                  className="bg-purple-50 rounded-xl p-4 border border-purple-100"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💊</span>
                    <div className="flex-1">
                      <div className="font-semibold text-purple-900">{med.name}</div>
                      <div className="text-sm text-purple-700 mt-1">
                        <span className="font-medium">Dosage:</span> {med.dosage}
                      </div>
                      <div className="text-sm text-purple-700">
                        <span className="font-medium">Frequency:</span> {med.frequency}
                      </div>
                      {med.duration && (
                        <div className="text-sm text-purple-700">
                          <span className="font-medium">Duration:</span> {med.duration}
                        </div>
                      )}
                      {med.notes && (
                        <div className="text-sm text-purple-600 mt-2 italic">
                          Note: {med.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {record.notes && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Additional Notes</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{record.notes}</p>
            </div>
          </div>
        )}

        {/* Follow-up Date */}
        {record.followUpDate && (
          <div className="bg-amber-50 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <div className="font-medium text-amber-900">Follow-up Scheduled</div>
              <div className="text-sm text-amber-700">
                {format(new Date(record.followUpDate), 'EEEE, MMMM d, yyyy')}
              </div>
            </div>
          </div>
        )}

        {/* Record ID */}
        <div className="text-xs text-gray-400 pt-4 border-t print:mt-8">
          Record ID: {record._id}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t print:hidden">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit?.(record)}>
            Edit Record
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default HealthDetail;
