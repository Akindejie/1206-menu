import React, { useEffect, useCallback } from 'react';
import '../styles/animations.css';

const SmokeEffect = () => {
  // Create smoke particles at given coordinates
  const createSmokeEffect = useCallback((x, y) => {
    // Create initial spark
    const spark = document.createElement('div');
    spark.className = 'touch-spark';
    spark.style.left = `${x - 8}px`;
    spark.style.top = `${y - 8}px`;
    document.body.appendChild(spark);

    // Remove spark after animation
    setTimeout(() => {
      if (spark.parentNode) {
        spark.parentNode.removeChild(spark);
      }
    }, 300);

    // Create 5 smoke particles with slight random variations
    const particleCount = 5;
    for (let i = 1; i <= particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = `smoke-particle smoke-particle-${i}`;

        // Add slight random offset to make it look more natural
        const randomX = (Math.random() - 0.5) * 10;
        const randomY = (Math.random() - 0.5) * 5;

        particle.style.left = `${x + randomX - 4}px`;
        particle.style.top = `${y + randomY - 4}px`;

        document.body.appendChild(particle);

        // Remove particle after animation completes
        const animationDuration = 1200 + i * 100; // Different durations for each particle
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, animationDuration);
      }, i * 20); // Stagger particle creation
    }
  }, []);

  // Handle touch events (mobile)
  const handleTouchStart = useCallback(
    (e) => {
      const touch = e.touches[0];
      if (touch) {
        createSmokeEffect(touch.clientX, touch.clientY);
      }
    },
    [createSmokeEffect]
  );

  const handleTouchMove = useCallback(
    (e) => {
      // Create smoke effect during drag/scroll but less frequently
      if (Math.random() < 0.3) {
        // 30% chance to reduce particle spam
        const touch = e.touches[0];
        if (touch) {
          createSmokeEffect(touch.clientX, touch.clientY);
        }
      }
    },
    [createSmokeEffect]
  );

  // Handle mouse events (desktop)
  const handleMouseDown = useCallback(
    (e) => {
      createSmokeEffect(e.clientX, e.clientY);
    },
    [createSmokeEffect]
  );

  const handleMouseMove = useCallback(
    (e) => {
      // Only create smoke during mouse drag
      if (e.buttons === 1 && Math.random() < 0.2) {
        // 20% chance when dragging
        createSmokeEffect(e.clientX, e.clientY);
      }
    },
    [createSmokeEffect]
  );

  useEffect(() => {
    // Add event listeners for touch events
    document.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Add event listeners for mouse events
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleTouchStart, handleTouchMove, handleMouseDown, handleMouseMove]);

  // This component doesn't render anything visible
  return null;
};

export default SmokeEffect;
