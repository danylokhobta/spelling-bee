import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './AnimationComponent.sass';

const AnimationComponent = () => {
  const [objects, setObjects] = useState([]);
  const { HP, score } = useSelector((state) => state.stats);
  const initHP = useRef(HP);
  const initScore = useRef(score);

  const correctGifs = Object.values(import.meta.glob(`../gifs/correct/*.gif`, { eager: true }));
  const wrongGifs = Object.values(import.meta.glob(`../gifs/wrong/*.gif`, { eager: true }));

  // Refs to store timeouts for each gif to be cleared
  const dissolveTimeouts = useRef([]);

  const runAnim = (animType) => {
    if (animType !== null) {
      // STEP 4: CHOOSING RANDOM GIF
      const chooseRandomGif = () => {
        const rightGifs = animType ? correctGifs : wrongGifs;
        const randomIndex = Math.floor(Math.random() * rightGifs.length);
        return rightGifs[randomIndex]?.default; // Ensure the correct string URL
      };
  
      // STEP 3: CALCULATING GIF'S POSITION
      const generateRandomPosition = () => {
        const minDist = 150;
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
        id: Date.now(),
        position: generateRandomPosition(),
        gif: chooseRandomGif(), // Now correctly extracts the URL
        bg: animType ? 'score' : 'wrong'
      };
  
      // Ensure that gif exists before adding to state
      if (!newObject.gif) return;
  
      // STEP 1: CREATING NEW OBJECT WITH GIF AND BG
      setObjects((prevObjects) => [...prevObjects, newObject]);
  
      // STEP 5: REMOVING GIF AND BG AFTER END OF THEIR ANIMATION
      const dissolveTimeout = setTimeout(() => {
        setObjects((prevObjects) =>
          prevObjects.filter((obj) => obj.id !== newObject.id) // Remove by unique ID
        );
      }, 2500);
  
      // Store the timeout in the ref array for proper cleanup
      dissolveTimeouts.current.push(dissolveTimeout);
  
      // Return a cleanup function specific for this object to remove the timeout
      return () => {
        clearTimeout(dissolveTimeout);
        dissolveTimeouts.current = dissolveTimeouts.current.filter((timeout) => timeout !== dissolveTimeout);
      };
    }
  };
  

  useEffect(() => {
    if (HP < initHP.current) {
      runAnim(false)
    }
  }, [HP]);

  useEffect(() => {
    if (score > initScore.current) {
      runAnim(true)
    }
  }, [score]);

  return (
    <>
      {objects.map((obj) => (
        <div key={obj.id} className='anim-container'>
          <div className={`answer-anim-bg ${obj.bg}`}></div>
          <img
            key={obj.id}
            className="dissolving-object"
            src={obj.gif}
            alt="Disolving Gif"
            style={{ left: obj.position.x, top: obj.position.y }}
          />
        </div>
      ))}
    </>
  );
};

export default AnimationComponent;
