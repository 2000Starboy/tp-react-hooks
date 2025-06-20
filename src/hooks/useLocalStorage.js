import { useState, useEffect } from 'react';

// Function to get the initial value from local storage or use a default
function getStoredValue(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    // If a value is found, parse it (since it's stored as a string)
    return JSON.parse(storedValue);
  }
  // If no value is found, return the initial value provided
  return initialValue;
}

function useLocalStorage(key, initialValue) {
  // Use our helper function to initialize state, so it only checks local storage once
  const [value, setValue] = useState(() => {
    return getStoredValue(key, initialValue);
  });

  // This effect runs whenever the 'value' changes
  useEffect(() => {
    // Save the new value to local storage
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return the value and the setter function, just like useState
  return [value, setValue];
}

export default useLocalStorage;