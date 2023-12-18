import { useEffect, useState } from 'react';

const useDebounce = value => {
  const [debouncedValue, setDebouncedValue] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
