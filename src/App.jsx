import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import RentLookup from './components/RentLookup'
import RentGame from './components/RentGame'

function Navigation() {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Le Juste Loyer</h1>
          </div>
          
          {/* Navigation Menu */}
          <nav className="flex gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                location.pathname === '/'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📊 Données
            </Link>
            <Link
              to="/jeu"
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                location.pathname === '/jeu'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🎮 Vérificateur
            </Link>
          </nav>

          <div className="text-sm text-gray-500">
            Données 2025 - Ville de Paris
          </div>
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />

        {/* Main Content */}
        <main className="py-8">
          <Routes>
            <Route path="/" element={<RentLookup />} />
            <Route path="/jeu" element={<RentGame />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
