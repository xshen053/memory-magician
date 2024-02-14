module.exports = {
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
    '\\.(css|scss|sass)$': 'babel-jest' // Add this line for CSS files
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  }
};
