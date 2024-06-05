import './RulesView.sass';
import icon1 from '../assets/icons/speaker.png';
import icon2 from '../assets/icons/voice.png';
import icon3 from '../assets/icons/keyboard.png';
import icon4 from '../assets/icons/heart.png';
import icon5 from '../assets/icons/target.png';
import Button from '../components/Button';
import Header from '../components/Header';
import RouteWrapper from '../components/RouteWrapper';

function RulesView() {
  return (
    <RouteWrapper className="RulesView" animate={true}>
      <Header />
      <h4>How to Play</h4>
      <ul>
        <li>
          <img src={icon1} alt='Audio icon'/>
          <p>Press the audio button to hear the word and related <span className='error'>informayshn</span>.</p>
        </li>
        <li>
          <img src={icon2} alt='Voice icon'/>
          <p>If you're not a fan of the <span className='error'>defolt</span> voice, feel free to <span className='error'>swich</span> it up.</p>
        </li>
        <li>
          <img src={icon3} alt='Keyboard icon'/>
          <p>Users with a <span className='error'>keebord</span> can use it to write and submit their <span className='error'>ansers</span>.</p>
        </li>
        <li>
          <img src={icon4} alt='Heart icon'/>
          <p>Be <span className='error'>cearful</span>! You've only got <b>3</b> chances to get it right.</p>
        </li>
        <li>
          <img src={icon5} alt='Report icon'/>
          <p>You will be able to <span className='error'>revyu</span> the results after the game.</p>
        </li>
      </ul>
      <Button linkTo={'/game'} resetGame={true}>Get Started ⇨</Button>
    </RouteWrapper>
  );
}

export default RulesView;
