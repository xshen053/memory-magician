// MemoryContext.js
import React, { createContext, useState, useContext } from 'react';

const MemoryContext = createContext();

export const useMemory = () => useContext(MemoryContext);

export const MemoryProvider = ({ children }) => {
  const [memoryAdded, setMemoryAdded] = useState(false);

  const triggerMemoryAdded = () => {
    setMemoryAdded(true);
    // Optionally, reset after a short delay
    setTimeout(() => setMemoryAdded(false), 100);
  };

  return (
    <MemoryContext.Provider value={{ memoryAdded, triggerMemoryAdded }}>
      {children}
    </MemoryContext.Provider>
  );
};
