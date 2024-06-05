import React, { useEffect } from 'react';
import './Keyboard.sass';

function Keyboard({ onInputChange }) {
  const allowedKeys = new Set([
    '🢘',
    'Backspace',
    ...('abcdefghijklmnopqrstuvwxyz').split('')
  ]);

  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', '🢘'],
  ];

  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();
    if (key === 'backspace') {
      event.preventDefault();
      onInputChange((prevValue) => prevValue.slice(0, -1));
    } else if (allowedKeys.has(key)) {
      if (key === '🢘') {
        onInputChange((prevValue) => prevValue.slice(0, -1));
      } else {
        onInputChange((prevValue) => prevValue + key);
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='Keyboard' tabIndex={0}>
      {keyboardLayout.map((row, rowIndex) => (
        <div className='row' key={rowIndex}>
          {row.map((key, keyIndex) => (
            <button key={keyIndex} onClick={(event) => { event.target.blur(); handleKeyDown({ key })}}>{key.toUpperCase()}</button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
