import React, { useEffect } from 'react';
import './Keyboard.sass';

function Keyboard({ setInputValue }) {
  const allowedKeys = new Set([
    '🢘',
    'backspace',
    ...('abcdefghijklmnopqrstuvwxyz').split('')
  ]);

  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', '🢘'],
  ];

  const handleKey = (key) => {
    const lKey = key.toLowerCase();
    if (allowedKeys.has(lKey)) {
      if (lKey === '🢘' || lKey === 'backspace') {
        setInputValue((prevValue) => prevValue.slice(0, -1));
      } else {
        setInputValue((prevValue) => prevValue + lKey);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {handleKey(event.key)};
  
    window.addEventListener('keydown', handleKeyPress);
  
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <div className='Keyboard'>
      {keyboardLayout.map((row, rowIndex) => (
        <div className='row' key={rowIndex}>
          {row.map((key, keyIndex) => (
            <button key={keyIndex} onClick={(event) => {event.target.blur(); handleKey(key)}} >{key.toUpperCase()}</button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
