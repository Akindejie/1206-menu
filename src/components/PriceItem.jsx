import React, { useEffect, useRef, useState } from 'react';
import { formatCurrency } from '../data/priceList';
import '../styles/components.css';

const PriceItem = ({ name, price, delay = 0, isVisible = true }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsAnimated(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div
      ref={itemRef}
      className={`price-item ${isAnimated ? 'animate-in' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="price-item-name">{name}</span>
      <span className="price-item-price">{formatCurrency(price)}</span>
    </div>
  );
};

export default PriceItem;
