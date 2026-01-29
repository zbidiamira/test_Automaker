import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AnimalsPage from './pages/AnimalsPage'
import AnimalDetailPage from './pages/AnimalDetailPage'
import HealthHistoryPage from './pages/HealthHistoryPage'
import AllHealthRecordsPage from './pages/AllHealthRecordsPage'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Animals Routes */}
          <Route 
            path="/animals" 
            element={
              <ProtectedRoute>
                <AnimalsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/animals/:id" 
            element={
              <ProtectedRoute>
                <AnimalDetailPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Health Records Routes */}
          <Route 
            path="/animals/:animalId/health" 
            element={
              <ProtectedRoute>
                <HealthHistoryPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/health-records" 
            element={
              <ProtectedRoute>
                <AllHealthRecordsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* More Protected Routes - Coming in later PRs */}
          {/* <Route path="/diagnosis" element={<ProtectedRoute><DiagnosisPage /></ProtectedRoute>} /> */}
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

// Temporary 404 component
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="text-center">
        <div className="text-8xl mb-4">🐾</div>
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-xl text-gray-500 mt-4">Oops! Page not found</p>
        <a href="/" className="inline-block mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Go Home
        </a>
      </div>
    </div>
  )
}

export default App
