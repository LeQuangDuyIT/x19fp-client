import { createContext, useState } from 'react';

export const StoreContext = createContext();

const MyStoreContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [contextError, setContextError] = useState(null);
  const [changPage, setChangePage] = useState(null);
  const value = {
    loading,
    setLoading,
    contextError,
    setContextError,
    changPage,
    setChangePage
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default MyStoreContext;
