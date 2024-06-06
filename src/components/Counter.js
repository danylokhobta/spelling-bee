import { useSelector } from 'react-redux';
import './Counter.sass';
import emptyHeart from '../assets/icons/empty-heart.png';
import filledHeart from '../assets/icons/filled-heart.png';

function Counter() {
  const lifes = useSelector((state) => state.stats.lifes);
  const correct = useSelector((state) => state.stats.correct);

  // Create an array to hold the heart icons
  const lifeIcons = [];
  for (let i = 0; i < lifes; i++) {
    lifeIcons.push(<img key={i} src={filledHeart} alt='Filled Heart' />);
  }
  for (let i = 3; i > lifes; i--) {
    lifeIcons.push(<img key={i} src={emptyHeart} alt='Empty Heart' />);
  }

  return (
    <div className="Counter">
      <article>
        {lifeIcons}
      </article>
      <article>
        <h4><span className='error'>corect:</span><b> {correct}</b></h4>
      </article>
    </div>
  );
}

export default Counter;
