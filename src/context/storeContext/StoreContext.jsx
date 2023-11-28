import { createContext, useState } from 'react';

export const StoreContext = createContext();

const MyStoreContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const value = {
    loading,
    setLoading,
    error,
    setError
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default MyStoreContext;
