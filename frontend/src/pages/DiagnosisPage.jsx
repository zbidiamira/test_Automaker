import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { SymptomChecker } from '../components/AI';

const DiagnosisPage = () => {
  const { animalId } = useParams();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-4">
            <Link to="/dashboard" className="hover:text-emerald-600">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">AI Symptom Checker</span>
          </nav>

          {/* Title */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <span className="text-4xl">🤖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Symptom Checker</h1>
                <p className="text-emerald-100 mt-1">
                  Get AI-powered health insights for your pet
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Symptom Checker Wizard */}
        <SymptomChecker />
      </div>
    </DashboardLayout>
  );
};

export default DiagnosisPage;
