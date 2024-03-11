import React, { useState, useEffect } from 'react';
import './AnswerAnim.sass';

function AnswerAnim({ answerAnim, correctTrigger, wrongTrigger2 }) {
  const [objects, setObjects] = useState([]);
  const correctGifs = importAllGifs(require.context('./../media/correct', false, /\.(gif)$/));
  const wrongGifs = importAllGifs(require.context('./../media/wrong', false, /\.(gif)$/));

  // STEP 0: IMPORTING ALL GIFS FROM THEIR FOLDERS
  function importAllGifs(r) {
    let images = [];
    r.keys().map((item) => { images.push(r(item)); });
    return images;
  }
  
  useEffect(() => {
    if (correctTrigger !== 0 || wrongTrigger2 !== 3) {

      // STEP 4: CHOOSING RANDOM GIF
      const chooseRandomGif = () => {
        const rightGifs = answerAnim ? correctGifs : wrongGifs;
        const randomIndex = Math.floor(Math.random() * rightGifs.length);
        return rightGifs[randomIndex];
      };

      // STEP 3: CALCULATING GIF'S POSITION
      const generateRandomPosition = () => {
        const minDist = 150; // Minimum distance from borders in px

        const minX = minDist;
        const minY = minDist;
        const maxX = window.innerWidth - minDist;
        const maxY = window.innerHeight - minDist;

        function getRandomNumber(min, max) {
          return Math.random() * (max - min) + min;
        }

        return { x: getRandomNumber(minX, maxX), y: getRandomNumber(minY, maxY) };
      };

      // STEP 2: DEFINING OBJECTS IN ANIMATION
      const newObject = {
        position: generateRandomPosition(),
        gif: chooseRandomGif(),
        bg: answerAnim ? 'correct' : 'wrong'
      };

      // STEP 1: CREATING NEW OBJECT WITH GIF AND BG
      setObjects(prevObjects => [...prevObjects, newObject]);

      // STEP 5: REMOVING GIF AND BG AFTER END OF THEIR ANIMATION
      const dissolveTimeout = setTimeout(() => {
        setObjects(prevObjects => prevObjects.filter(obj => obj !== newObject));
      }, 2500);
      return () => clearTimeout(dissolveTimeout);
    }
  }, [correctTrigger, wrongTrigger2]);
  return (
    <>
      {objects.map((obj, index) => (
        <div key={index}>
          <div className={`answer-anim-bg ${obj.bg}`}></div>
          <img
            key={index}
            className="dissolving-object"
            src={obj.gif}
            style={{ left: obj.position.x, top: obj.position.y }}
          />
        </div>
      ))}
    </>
  );
}

export default AnswerAnim;
