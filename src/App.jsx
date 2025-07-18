import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RentLookup from './components/RentLookup'
import RentGame from './components/RentGame'

function Navigation() {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={viteLogo} className="h-8 w-8" alt="Vite logo" />
            <img src={reactLogo} className="h-8 w-8 animate-spin" alt="React logo" />
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
              📊 Recherche Avancée
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
            Données 2023 - Ville de Paris
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

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-500">
              <p>
                Application développée avec React + Vite + Tailwind CSS
              </p>
              <p className="mt-1">
                Données officielles de l'encadrement des loyers à Paris
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
