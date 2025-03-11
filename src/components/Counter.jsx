import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Counter.sass';

function Counter() {
  const { HP, score, initialHP} = useSelector((state) => state.stats);
  // State for dark mode preference
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Effect to listen for dark mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  // Create an array to hold the heart icons
  const lifeIcons = Array.from({ length: initialHP }, (_, i) => (
    <img 
      key={i} 
      src={`icons/${isDarkMode ? 'dark' : 'light'}/${i < HP ? 'filled' : 'empty'}-heart.svg`} 
      alt={i < HP ? 'Filled Heart' : 'Empty Heart'} 
    />
  ));

  return (
    <div className="Counter">
      <article>
        {lifeIcons}
      </article>
      <article>
        <h4><span className='error'>corect:</span><b> {score}</b></h4>
      </article>
    </div>
  );
}

export default Counter;
