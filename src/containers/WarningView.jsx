import { useState, useEffect } from 'react';
import './WarningView.sass';
import Button from '../components/Button';
import RouteWrapper from './RouteWrapper';

function WarningView() {
  // Retrieve the value from localStorage, defaulting to null if not found
  const [isWarningEnabled, setIsWarningEnabled] = useState(() => {
    const storedValue = localStorage.getItem('isWarningEnabled');
    return storedValue !== null && storedValue !== undefined
      ? JSON.parse(storedValue)
      : null; // Default to true if not found in localStorage
  });

  const handleButtonClick = () => {
    // Update the state to disable the warning
    setIsWarningEnabled(false);
  };

  useEffect(() => {
    // Store the updated value in localStorage when isWarningEnabled changes
    localStorage.setItem('isWarningEnabled', JSON.stringify(isWarningEnabled));
  }, [isWarningEnabled]);

  useEffect(() => {
    // If isWarningEnabled is null or undefined, and the user is on Android, enable the warning
    if (isWarningEnabled == null && /android/i.test(navigator.userAgent)) {
      setIsWarningEnabled(true);
    }
  });

  return (
    <RouteWrapper className={`WarningView ${isWarningEnabled ? "enabled" : "disabled"}`}>
      <h4>¡Warning!</h4>
      <p>Welcome, Android users! I'm <span className='error'>exited</span> for you to try out my game. Please note that I’ve encountered some inconsistencies with the text-to-speech feature on certain Android devices, as compared to Microsoft or Apple. Nonetheless, I appreciate your understanding and hope you enjoy the game!</p>
      <Button onClick={handleButtonClick}>Ignore <span className='error'>Worning</span> ⇨</Button>
    </RouteWrapper>
  );
}

export default WarningView;
