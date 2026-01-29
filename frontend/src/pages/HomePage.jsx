import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl">🐾</span>
              <span className="ml-2 text-xl font-bold text-gradient">VetAI Assistant</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-primary-500 transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered <span className="text-gradient">Veterinary</span> Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant health insights for your pets with our AI diagnostic system. 
            Track health records, manage multiple animals, and receive personalized care recommendations.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Start Free Trial
            </Link>
            <Link to="/login" className="btn-outline text-lg px-8 py-3">
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
            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-2">AI Diagnosis</h3>
              <p className="text-gray-600">
                Get instant symptom analysis and possible condition identification powered by advanced AI.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">Health Records</h3>
              <p className="text-gray-600">
                Keep track of your pet's complete health history, vaccinations, and treatments.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card text-center hover:shadow-lg transition-shadow">
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
      <section className="py-16">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of pet owners who trust VetAI for their pet's health.
          </p>
          <Link to="/register" className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl">🐾</span>
                <span className="ml-2 text-xl font-bold">VetAI</span>
              </div>
              <p className="text-gray-400">
                AI-powered veterinary assistant for modern pet care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 VetAI Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
