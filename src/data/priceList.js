export const alcoholPrices = {
  // ALCOHOL SECTION
  "Orijin Bitter Bottle (Big)": 7000,
  "Orijin Bitter": 2000,
  "Smirnoff X1 (Small)": 7000,
  "Smirnoff X1 (Big)": 15000,
  "Action Bitter": 6000,
  "Andre Rose": 30000,
  "Belaire Rose": 75000,
  "Gordon's": 3500,
  "Hennessy Vs": 175000,
  "Henessy V-S-O-P": 145000,
  "Martell Blue Swift": 140000,
  "Ice Rose": 30000,
  "Jack Daniels": 60000,
  "Red Label": 30000,
  "Black Jameson": 65000,
  "William Lawson": 30000,
  "Sierra Tequila": 30000,
  "Firemore": 5000,
  "Good Father": 8000,
  "Imperial Blue": 8000,
  "Martell Vs": 65000,
  "Skirt": 6000,
  "Best Cream": 15000,
  "Best Whiskey": 15000,
  "Jack Williams": 15000,
  "Smoothies": 2500,
  "Mork Tails": 2500,
  "Cock Tails": 3000,
  "Tequila Shots": 2500,
  
  // WINE SECTION
  "Baron Romero Wine": 20000,
  "Fruit Wine": 20000,
  "Four Cousins": 20000,
  "4th Street": 15000,
  "Shisha (Big)": 10000,
  "Shisha (Small)": 8000
};

export const drinksBeers = {
  // DRINKS SECTION
  "Fanta": 1000,
  "Sprite": 1000,
  "Coke": 1000,
  "5 Alive": 2500,
  "Malta": 1000,
  "Chivita": 2500,
  "Fearless": 1000,
  "Power Horse": 3500,
  "Bullet": 2500,
  "Predator": 1000,
  "Red Bull": 3500,
  "Schwepps": 1000,
  "Hollandia": 3000,
  "Monster Energy": 2000,
  "Bottle Water": 500,
  "Eva Water (Big)": 1500,
  "Eva Water (Small)": 800,
  
  // BEER SECTION
  "Small Smirnoff": 1000,
  "Orijin Beer": 1500,
  "Guiness Stout": 2500,
  "Gulder": 1500,
  "Turbo King": 2000,
  "Heineken": 2500,
  "Star Radler": 1500,
  "Desperados": 1500,
  "Legend": 2000,
  "Trophy": 1500,
  "Budweiser": 2000,
  "Flying Fish": 1500,
  "Goldberg": 1500,
  "Big Smirnoff": 2000,
  "33 Export": 1500,
  "Castle Lite": 1500,
  "Tiger": 1500
};

// Helper function to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount);
};

// Helper function to search across all products
export const searchProduct = (query) => {
  const allProducts = { ...alcoholPrices, ...drinksBeers };
  const lowerQuery = query.toLowerCase();
  
  const exactMatch = Object.keys(allProducts).find(
    key => key.toLowerCase() === lowerQuery
  );
  
  if (exactMatch) {
    return { name: exactMatch, price: allProducts[exactMatch] };
  }
  
  const partialMatch = Object.keys(allProducts).find(
    key => key.toLowerCase().includes(lowerQuery)
  );
  
  if (partialMatch) {
    return { name: partialMatch, price: allProducts[partialMatch] };
  }
  
  return null;
}; 