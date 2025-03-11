import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStats } from '../state/statsSlice';
import './Keyboard.sass';
import Button from './Button';

function Keyboard() {
  const dispatch = useDispatch();
  const { userAnswer } = useSelector((state) => state.stats);

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

  const handleKeyDown = (letter) => {
    if (letter === 'backspace') {
      dispatch(updateStats(["userAnswer", userAnswer.slice(0, -1)]));
    } else if (allowedKeys.has(letter)) {
      if (letter === '🢘') {
        dispatch(updateStats(["userAnswer", userAnswer.slice(0, -1)]));
      } else {
        dispatch(updateStats(["userAnswer", userAnswer + letter]));
      }
    }
  };
  
  useEffect(() => {
    const keyHandler = (event) => handleKeyDown(event.key.toLowerCase());
  
    document.body.addEventListener('keydown', keyHandler);
  
    return () => {
      document.body.removeEventListener('keydown', keyHandler);
    };
  });
  

  return (
    <div className='Keyboard' tabIndex={0}>
      {keyboardLayout.map((row, rowIndex) => (
        <div className='row' key={rowIndex}>
          {row.map((key, i) => (
            <Button key={i} onClick={() => handleKeyDown(key)} >{key.toUpperCase()}</Button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
