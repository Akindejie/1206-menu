import React from 'react';
import '../styles/components.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <img
            src="/1206-logo.png"
            alt="1206 Empire Logo"
            className="app-logo"
          />
          <div className="brand-text">
            <h1 className="brand-title">1206 Empire</h1>
            <p className="brand-subtitle">Premium Lounge & Bar</p>
          </div>
        </div>
        <div className="header-tagline">
          <span className="tagline-text">Scan & Discover Prices</span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="header-decoration">
        <div className="decoration-line"></div>
        <div className="decoration-dot"></div>
        <div className="decoration-line"></div>
      </div>
    </header>
  );
};

export default Header;
