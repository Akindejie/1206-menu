import React, { useState, useMemo, useEffect } from 'react';
import PriceItem from '../components/PriceItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { alcoholPrices } from '../data/priceList';
import '../styles/components.css';

const AlcoholPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState([]);

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    return Object.entries(alcoholPrices).filter(([name]) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Simulate loading and animate items in
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setVisibleItems(filteredItems);
    }, 500);

    return () => clearTimeout(timer);
  }, [filteredItems]);

  // Separate alcohol and wine sections
  const alcoholItems = filteredItems.filter(([name]) => {
    const lowerName = name.toLowerCase();
    return !lowerName.includes('wine') && !lowerName.includes('shisha');
  });

  const wineItems = filteredItems.filter(([name]) => {
    const lowerName = name.toLowerCase();
    return lowerName.includes('wine') || lowerName.includes('shisha');
  });

  const renderSection = (items, title, startIndex = 0) => {
    if (items.length === 0) return null;

    return (
      <div className="section">
        <div className="section-header fade-in-up">{title}</div>
        {items.map(([name, price], index) => (
          <PriceItem
            key={name}
            name={name}
            price={price}
            delay={(startIndex + index) * 100}
            isVisible={!isLoading}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="page alcohol-page slide-in-right">
      <div className="main-content">
        {/* Page Header */}
        <h1 className="page-title zoom-in">🍷 Alcohol & Wine</h1>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search alcohol or wine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="loading-container">
            <LoadingSpinner text="Loading price list..." />

            {/* Skeleton Loaders */}
            <div className="skeleton-items">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="skeleton-price-item">
                  <div className="skeleton-loader skeleton-name"></div>
                  <div className="skeleton-loader skeleton-price"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="price-list">
            {/* Search Results Count */}
            {searchTerm && (
              <div className="search-results-count fade-in">
                Found {filteredItems.length} item
                {filteredItems.length !== 1 ? 's' : ''}
              </div>
            )}

            {/* No Results */}
            {filteredItems.length === 0 ? (
              <div className="no-results fade-in">
                <h3>No results found</h3>
                <p>Try searching for something else</p>
              </div>
            ) : (
              <>
                {/* Alcohol Section */}
                {renderSection(alcoholItems, '🥃 Alcohol', 0)}

                {/* Wine Section */}
                {renderSection(
                  wineItems,
                  '🍷 Wine & Shisha',
                  alcoholItems.length
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlcoholPage;
