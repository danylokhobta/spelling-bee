import { createContext, useState, useEffect } from 'react';
import './AnimationContext.sass';

// Create the context
const AnimationContext = createContext();

// Create a provider component
const AnimationProvider = ({ children }) => {
  const [objects, setObjects] = useState([]);
  const [animType, setAnimType] = useState(null)
  const correctGifs = importAllGifs(require.context('./../assets/correct', false, /\.(gif)$/));
  const wrongGifs = importAllGifs(require.context('./../assets/wrong', false, /\.(gif)$/));

  // ADDITIONAL FUNCTIONS
  const correctAnim = () => setAnimType(true);
  const wrongAnim = () => setAnimType(false);
  const clearAnim = () => setObjects([]);

  // STEP 0: IMPORTING ALL GIFS FROM THEIR FOLDERS
  function importAllGifs(r) {
    let images = [];
    r.keys().map((item) => { images.push(r(item)); });
    return images;
  }
  
  useEffect(() => {
    if (animType !== null) {
      // STEP 4: CHOOSING RANDOM GIF
      const chooseRandomGif = () => {
        const rightGifs = animType ? correctGifs : wrongGifs;
        const randomIndex = Math.floor(Math.random() * rightGifs.length);
        setAnimType(null);
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
        bg: animType ? 'correct' : 'wrong'
      };
      // STEP 1: CREATING NEW OBJECT WITH GIF AND BG
      setObjects(prevObjects => [...prevObjects, newObject]);
      setAnimType(null);
      // STEP 5: REMOVING GIF AND BG AFTER END OF THEIR ANIMATION
      const dissolveTimeout = setTimeout(() => {
        setObjects(prevObjects => prevObjects.filter(obj => obj !== newObject));
      }, 2500);
      return () => clearTimeout(dissolveTimeout);
    }
  }, [animType]);

  return (
    <AnimationContext.Provider value={{
      correctAnim, wrongAnim,
      clearAnim
    }}>
      {objects.map((obj, index) => (
        <div key={index}>
          <div className={`answer-anim-bg ${obj.bg}`}></div>
          <img
            key={index}
            className="dissolving-object"
            src={obj.gif}
            alt='Disolving Gif'
            style={{ left: obj.position.x, top: obj.position.y }}
          />
        </div>
      ))}

      {children}
    </AnimationContext.Provider>
  );
};

export {AnimationProvider, AnimationContext};