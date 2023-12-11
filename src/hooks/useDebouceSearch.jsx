import { useEffect, useState } from 'react';

function useDebouceSearch(query) {
  const [debounceValue, setDebouceValue] = useState(query);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouceValue(query);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return debounceValue;
}

export default useDebouceSearch;
