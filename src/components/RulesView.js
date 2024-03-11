import { useRef } from 'react';
import './RulesView.sass';
import audio from '../media/audio-waves.png';
import voice from '../media/voice.png';
import keyboard from '../media/keyboard.png';
import hearts from '../media/hearts.png';
import report from '../media/report.png';
import Button from './Button';
import Header from './Header';

function RulesView({ answersList }) {
  const answersListRef = useRef(answersList); // useRef to maintain the value
  return (
    <div className="RulesView">
      <Header />
      <div className='rules-content'>
        <h4>How to Play</h4>
        <ul>
          <li>
            <img src={audio} alt='Audio icon'/>
            <p>Press the audio button to hear the word and related <span className='error'>informayshn</span>.</p>
          </li>
          <li>
            <img src={voice} alt='Voice icon'/>
            <p>If you're not a fan of the <span className='error'>defolt</span> voice, feel free to <span className='error'>swich</span> it up.</p>
          </li>
          <li>
            <img src={keyboard} alt='Keyboard icon'/>
            <p>Users with a <span className='error'>keebord</span> can use it to write and submit their <span className='error'>ansers</span>.</p>
          </li>
          <li>
            <img src={hearts} alt='Heart icon'/>
            <p>Be <span className='error'>cearful</span>! You've only got <b>3</b> chances to get it right.</p>
          </li>
          <li>
            <img src={report} alt='Report icon'/>
            <p>You will be able to <span className='error'>revyu</span> the results after the game.</p>
          </li>
        </ul>
        <div onClick={() => answersListRef.current = []}><Button linkTo={'/game'}>Get Started ⇨</Button></div>
      </div>
    </div>
  );
}

export default RulesView;
