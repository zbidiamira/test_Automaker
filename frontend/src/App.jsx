import { Routes, Route } from 'react-router-dom'

// Pages (to be created in later PRs)
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Auth Routes - Coming in PR #4 */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        
        {/* Protected Routes - Coming in later PRs */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        {/* <Route path="/animals" element={<AnimalsPage />} /> */}
        {/* <Route path="/animals/:id" element={<AnimalDetailPage />} /> */}
        {/* <Route path="/diagnosis" element={<DiagnosisPage />} /> */}
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

// Temporary HomePage component
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-xl text-gray-500 mt-4">Page not found</p>
        <a href="/" className="btn-primary inline-block mt-6">
          Go Home
        </a>
      </div>
    </div>
  )
}

export default App
