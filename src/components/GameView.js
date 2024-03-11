import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameView.sass';
import Header from './Header';
import Audio from './Audio';
import Input from './Input';
import Keyboard from './Keyboard';
import Button from './Button';
import Counter from './Counter';
import AnswerAnim from './AnswerAnim';

function GameView({ setAnswerList }) {
  const [inputValue, setInputValue] = useState('');

  const [textForAudio, setTextForAudio] = useState('');
  const [fetchedWord, setFetchedWord] = useState('');

  const [lifesLeft, setLifesLeft] = useState(3);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [CGAnswerList, setCGAnswerList] = useState([]); // current game answer list

  const [initWordLoad, setInitWordLoad] = useState(null);
  const [answerAnim, setAnswerAnim] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  const fetchRandomWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word');
      if (!response.ok) {
        throw new Error('Failed to fetch random word');
      }
      const data = await response.json();
      fetchWordDescription(data[0]);
    } catch (error) {
      console.error(error);
      fetchRandomWord();
    }
  };

  const fetchWordDescription = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch additional data for word ${word}`);
      }
      const result = await response.json();

      const partOfSpeech = result[0].meanings[0].partOfSpeech;
      const description = result[0].meanings[0].definitions[0].definition;
      const example = result[0].meanings[0].definitions[0].example;
      const sentence = (`${word}. A ${partOfSpeech} meaning ${description} ${example ? ('Example: ' + example) : ''}`)

      if (!description && !example) {
        fetchRandomWord();
      } else {
        setFetchedWord(word);
        setTextForAudio(sentence);
        setIsDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
      fetchRandomWord();
    }
  }

  const handleSubmit = () => {
    if(isDataLoaded && inputValue !== ''){
      //CHECK THE ANSWERS
      if(inputValue !== fetchedWord) {
        setLifesLeft(prev => prev - 1);
        setAnswerAnim(false);
      } else {
        setCorrectAnswers(prev => prev + 1);
        setAnswerAnim(true);
      }
  
      CGAnswerList.push({ fetchedWord, inputValue });
      setInputValue('');
    }
  };

  useEffect(() => {
    if (lifesLeft < 0) {
      //END THE GAME
      console.log("End Game");
      setAnswerList([...CGAnswerList]);
      setCGAnswerList([]);
      navigate('/results');
    } else {
      //LOAD NEXT WORD
      setInitWordLoad(true);
    }
  }, [lifesLeft, correctAnswers]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();
      (key === 'enter' || key === ' ') && handleSubmit();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {window.removeEventListener('keydown', handleKeyPress)};
  });

  useEffect(() => {
    if(initWordLoad === true || initWordLoad === null) {
      setInitWordLoad(false);
      setIsDataLoaded(false);
      fetchRandomWord();
    };
  }, [initWordLoad]);

  return (
    <div className="GameView">
      <Header linkTo='/'/>
      <Counter lifesLeft={lifesLeft} correctAnswers={correctAnswers} />
      <div className='game-parts'>
        <Audio data={textForAudio} isDataLoaded={isDataLoaded} trigger={initWordLoad}/>
        <Input inputValue={inputValue} setInputValue={setInputValue} />
        <div className='block-btn'>
          <div onClick={handleSubmit}><Button>submit</Button></div>
          {!isDataLoaded && <div className='disabled' />}
        </div>
        <Keyboard inputValue={inputValue} setInputValue={setInputValue} />
      </div>
      <AnswerAnim answerAnim={answerAnim} correctTrigger={correctAnswers} wrongTrigger2={lifesLeft}  />
    </div>
  );
}

export default GameView;
