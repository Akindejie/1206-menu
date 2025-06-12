import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlcoholPage from './pages/AlcoholPage';
import DrinksBeersPage from './pages/DrinksBeersPage';
import BarcodeScanner from './components/BarcodeScanner';
import Navigation from './components/Navigation';
import Header from './components/Header';
import SmokeEffect from './components/SmokeEffect';
import './styles/App.css';
import './styles/animations.css';
import './styles/components.css';

function App() {
  const [scannerVisible, setScannerVisible] = useState(false);

  const toggleScanner = () => {
    setScannerVisible(!scannerVisible);
  };

  return (
    <Router>
      <div className="app">
        <SmokeEffect />
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<AlcoholPage />} />
            <Route path="/alcohol" element={<AlcoholPage />} />
            <Route path="/drinks-beers" element={<DrinksBeersPage />} />
          </Routes>
        </main>

        <Navigation onScannerToggle={toggleScanner} />

        {scannerVisible && (
          <BarcodeScanner onClose={() => setScannerVisible(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
