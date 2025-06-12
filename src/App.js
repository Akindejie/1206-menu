import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import BarcodeScanner from './components/BarcodeScanner';
import SmokeEffect from './components/SmokeEffect';
import AlcoholPage from './pages/AlcoholPage';
import DrinksBeersPage from './pages/DrinksBeersPage';
import './styles/App.css';
import './styles/animations.css';
import './styles/components.css';

function App() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScannerOpen = () => {
    setIsScannerOpen(true);
  };

  const handleScannerClose = () => {
    setIsScannerOpen(false);
  };

  return (
    <div className="app">
      <Router>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/alcohol" replace />} />
            <Route path="/alcohol" element={<AlcoholPage />} />
            <Route path="/drinks-beers" element={<DrinksBeersPage />} />
          </Routes>
        </div>

        {/* Navigation */}
        <Navigation onScannerOpen={handleScannerOpen} />

        {/* Barcode Scanner */}
        <BarcodeScanner isOpen={isScannerOpen} onClose={handleScannerClose} />

        {/* Smoke Effect for touches/clicks */}
        <SmokeEffect />
      </Router>
    </div>
  );
}

export default App;
