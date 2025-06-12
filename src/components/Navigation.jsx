import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components.css';

const Navigation = ({ onScannerOpen }) => {
  const WineIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M6 3h12l-1 3v2c0 5.55-4.45 10-10 10s-10-4.45-10-10V6L6 3zm2 2l-.5 1.5H16.5L16 5H8zm-1 4h10c0 4.42-3.58 8-8 8s-8-3.58-8-8h6z" />
    </svg>
  );

  const DrinkIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M2 21V19H4V12C4 10.9 4.9 10 6 10H8V8H6V6H18V8H16V10H18C19.1 10 20 10.9 20 12V19H22V21H2M12 2C13.1 2 14 2.9 14 4S13.1 6 12 6 10 5.1 10 4 10.9 2 12 2M6 12V19H18V12H6Z" />
    </svg>
  );

  const ScannerIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M4,4H10V2H4A2,2 0 0,0 2,4V10H4V4M20,2H14V4H20V10H22V4A2,2 0 0,0 20,2M4,14H2V20A2,2 0 0,0 4,22H10V20H4V14M22,14V20A2,2 0 0,1 20,22H14V20H20V14H22M12,17L7,12L8.4,10.6L12,14.2L15.6,10.6L17,12L12,17Z" />
    </svg>
  );

  return (
    <>
      {/* Floating Scanner Button */}
      <button
        className="scanner-fab pulse"
        onClick={onScannerOpen}
        aria-label="Open barcode scanner"
      >
        <ScannerIcon />
      </button>

      {/* Bottom Navigation */}
      <nav className="bottom-navigation">
        <div className="nav-container">
          <NavLink
            to="/alcohol"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <div className="nav-icon">
              <WineIcon />
            </div>
            <span className="nav-label">Alcohol & Wine</span>
          </NavLink>

          <NavLink
            to="/drinks-beers"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <div className="nav-icon">
              <DrinkIcon />
            </div>
            <span className="nav-label">Drinks & Beers</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
