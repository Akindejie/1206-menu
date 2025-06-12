import React, { useState, useMemo } from 'react';
import PriceItem from '../components/PriceItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { drinksBeers } from '../data/priceList';
import '../styles/components.css';

const DrinksBeersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    const items = Object.entries(drinksBeers).map(([name, price]) => ({
      name,
      price,
      category:
        name.toLowerCase().includes('beer') ||
        name.toLowerCase().includes('smirnoff') ||
        name.toLowerCase().includes('guiness') ||
        name.toLowerCase().includes('gulder') ||
        name.toLowerCase().includes('heineken') ||
        name.toLowerCase().includes('star') ||
        name.toLowerCase().includes('desperados') ||
        name.toLowerCase().includes('legend') ||
        name.toLowerCase().includes('trophy') ||
        name.toLowerCase().includes('budweiser') ||
        name.toLowerCase().includes('flying') ||
        name.toLowerCase().includes('goldberg') ||
        name.toLowerCase().includes('export') ||
        name.toLowerCase().includes('castle') ||
        name.toLowerCase().includes('tiger') ||
        name.toLowerCase().includes('orijin beer')
          ? 'Beers'
          : 'Drinks',
    }));

    if (!searchTerm.trim()) return items;

    const term = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Simulate loading for better UX
    if (value !== searchTerm) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups = {};
    filteredItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  return (
    <div className="page">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search drinks & beers..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Search Results Count */}
      {searchTerm && (
        <div className="search-results-count">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}{' '}
          found
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="loading-container">
          <LoadingSpinner size="medium" />
          <p className="loading-text">Searching...</p>
        </div>
      ) : (
        <div className="price-list">
          {Object.keys(groupedItems).length === 0 ? (
            <div className="no-results">
              <h3>No items found</h3>
              <p>Try searching with different keywords</p>
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <div className="section-header">{category}</div>
                {items.map((item, index) => (
                  <PriceItem
                    key={`${category}-${item.name}-${index}`}
                    name={item.name}
                    price={item.price}
                    delay={index * 100}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DrinksBeersPage;
