import { Link } from 'react-router-dom';
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-blue-50 flex-1">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Veterinary</span> Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant health insights for your pets with our AI diagnostic system. 
            Track health records, manage multiple animals, and receive personalized care recommendations.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/register" 
              className="bg-emerald-500 text-white font-semibold text-lg px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors shadow-md hover:shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-emerald-500 text-emerald-500 font-semibold text-lg px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose VetAI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-2">AI Diagnosis</h3>
              <p className="text-gray-600">
                Get instant symptom analysis and possible condition identification powered by advanced AI.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">Health Records</h3>
              <p className="text-gray-600">
                Keep track of your pet's complete health history, vaccinations, and treatments.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🐕</div>
              <h3 className="text-xl font-semibold mb-2">Multi-Pet Support</h3>
              <p className="text-gray-600">
                Manage multiple pets in one place - dogs, cats, birds, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Animals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Supported Animals</h2>
          <div className="flex justify-center flex-wrap gap-8">
            <div className="text-center">
              <span className="text-5xl">🐕</span>
              <p className="mt-2 text-gray-600">Dogs</p>
            </div>
            <div className="text-center">
              <span className="text-5xl">🐈</span>
              <p className="mt-2 text-gray-600">Cats</p>
            </div>
            <div className="text-center">
              <span className="text-5xl">🐦</span>
              <p className="mt-2 text-gray-600">Birds</p>
            </div>
            <div className="text-center">
              <span className="text-5xl">🐰</span>
              <p className="mt-2 text-gray-600">Rabbits</p>
            </div>
            <div className="text-center">
              <span className="text-5xl">🐹</span>
              <p className="mt-2 text-gray-600">Hamsters</p>
            </div>
            <div className="text-center">
              <span className="text-5xl">🐠</span>
              <p className="mt-2 text-gray-600">Fish</p>
            </div>
            <div className="text-center">
              <span className="text-5xl">🦎</span>
              <p className="mt-2 text-gray-600">Reptiles</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600 text-sm">Sign up for free and set up your profile</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Add Your Pets</h3>
              <p className="text-gray-600 text-sm">Register your animals with their details</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Check Symptoms</h3>
              <p className="text-gray-600 text-sm">Use our AI to analyze your pet's symptoms</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Get Recommendations</h3>
              <p className="text-gray-600 text-sm">Receive personalized care suggestions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of pet owners who trust VetAI for their pet's health.
          </p>
          <Link 
            to="/register" 
            className="bg-white text-emerald-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block shadow-md"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
