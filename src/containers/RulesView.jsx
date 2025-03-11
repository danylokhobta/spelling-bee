import './RulesView.sass';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import Header from '../components/Header';
import RouteWrapper from './RouteWrapper';

function RulesView() {
  const { initialHP } = useSelector((state) => state.stats);
  return (
    <RouteWrapper className="RulesView" animate={true}>
      <Header />
      <h4>How to Play</h4>
      <ul>
        <li>
          <img src='icons/audio-waves.png' alt='Audio icon'/>
          <p>Press the audio button to hear the word and related <span className='error'>informayshn</span>.</p>
        </li>
        <li>
          <img src='icons/voice.png' alt='Voice icon'/>
          <p>If you're not a fan of the <span className='error'>defolt</span> voice, feel free to <span className='error'>swich</span> it up.</p>
        </li>
        <li>
          <img src='icons/keyboard.png' alt='Keyboard icon'/>
          <p>Users with a <span className='error'>keebord</span> can use it to write and submit their <span className='error'>ansers</span>.</p>
        </li>
        <li>
          <img src='icons/hearts.png' alt='Heart icon'/>
          <p>Be <span className='error'>cearful</span>! You've only got <b>{initialHP}</b> chances to get it right.</p>
        </li>
        <li>
          <img src='icons/report.png' alt='Report icon'/>
          <p>You will be able to <span className='error'>revyu</span> the results after the game.</p>
        </li>
      </ul>
      <Button linkTo={'/game'} resetGame={true}>Get Started ⇨</Button>
    </RouteWrapper>
  );
}

export default RulesView;
