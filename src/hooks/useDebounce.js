import { useState, useEffect } from 'react';

// A custom hook that takes a value and a delay time
function useDebounce(value, delay) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer that will update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: If the 'value' changes before the delay is over,
    // this will clear the old timer and restart it.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // This effect re-runs only if the value or delay changes

  // Return the stable, debounced value
  return debouncedValue;
}

export default useDebounce;