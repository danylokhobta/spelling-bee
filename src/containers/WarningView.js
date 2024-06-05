import { useState, useEffect } from 'react';
import './WarningView.sass';
import Button from '../components/Button';

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
    <div className={`WarningView ${isWarningEnabled ? "enabled" : "disabled"}`}>
      <h4>¡Warning!</h4>
      <p>Hey there, dear Android friends! Really glad to have you here and super <span className='error'>eksited</span> for you to try out my game. Just wanted to give you a heads-up beforehand: I've been running into a few hiccups with the text-to-speech feature on some Android devices. It seems like Google hasn't quite gotten it as consistent as Microsoft or Apple did. But no worries, let's still give it a go and see how things turn out!</p>
      <p>Thanks a bunch for being understanding, and most importantly, have a blast playing!</p>
      <Button onButtonClick={handleButtonClick}>Ignore <span className='error'>Worning</span> ⇨</Button>
    </div>
  );
}

export default WarningView;
