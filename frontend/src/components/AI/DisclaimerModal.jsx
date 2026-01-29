import { Modal, Button } from '../Common';

const DisclaimerModal = ({ isOpen, onAccept, onDecline }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onDecline}
      title="⚠️ Important Disclaimer"
      size="md"
    >
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">
                AI-Assisted Diagnosis Tool
              </h3>
              <p className="text-amber-800 text-sm">
                This tool uses artificial intelligence to provide preliminary
                health assessments based on the symptoms you describe.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚕️</span>
            <div>
              <h4 className="font-medium text-gray-900">Not a Replacement for Veterinary Care</h4>
              <p className="text-sm text-gray-600">
                This AI assistant is NOT a substitute for professional veterinary
                diagnosis, advice, or treatment.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">🔍</span>
            <div>
              <h4 className="font-medium text-gray-900">Preliminary Assessment Only</h4>
              <p className="text-sm text-gray-600">
                The suggestions provided are for informational purposes only and
                should be verified by a licensed veterinarian.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">🚨</span>
            <div>
              <h4 className="font-medium text-gray-900">Emergency Situations</h4>
              <p className="text-sm text-gray-600">
                If your pet is experiencing a medical emergency, please contact
                your veterinarian or emergency animal hospital immediately.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">📊</span>
            <div>
              <h4 className="font-medium text-gray-900">Accuracy Limitations</h4>
              <p className="text-sm text-gray-600">
                AI analysis may not account for all factors affecting your pet's
                health. Results are based on general veterinary knowledge.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="disclaimer-checkbox"
              className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              onChange={(e) => {
                document.getElementById('accept-btn').disabled = !e.target.checked;
              }}
            />
            <span className="text-sm text-gray-700">
              I understand that this AI tool provides preliminary assessments only
              and is not a substitute for professional veterinary care. I will
              consult with a licensed veterinarian for proper diagnosis and treatment.
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onDecline}>
            Cancel
          </Button>
          <Button
            id="accept-btn"
            onClick={onAccept}
            disabled
          >
            I Understand, Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DisclaimerModal;
