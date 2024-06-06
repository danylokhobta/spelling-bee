import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submit, reset, addAnswer } from '../state/statsSlice';
import { initFetch } from '../state/fetchSlice';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Audio from '../components/Audio';
import Input from '../components/Input';
import Keyboard from '../components/Keyboard';
import Button from '../components/Button';
import Counter from '../components/Counter';
import useAnimation from '../hooks/useAnimation';
import RouteWrapper from '../components/RouteWrapper';

function GameView() {
  const [gameStatus, setGameStatus] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const lifes = useSelector((state) => state.stats.lifes);
  const isLoading = useSelector((state) => state.fetch.isLoading);
  const word = useSelector((state) => state.fetch.word);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wrongAnim, correctAnim } = useAnimation();

  const handleInputChange = (value) => setInputValue(value);

  const handleSubmit = () => {
    if (!isLoading && inputValue !== '') {
      dispatch(addAnswer({
        submitted: inputValue,
        correct: word
      }));

      if (inputValue !== word) {
        dispatch(submit(false));
        if (lifes <= 1) {
          setGameStatus(false);
          return;
        }
        wrongAnim();
      } else {
        dispatch(submit(true));
        correctAnim();
      }
      dispatch(initFetch());
      setInputValue('');
    }
  };

  useEffect(() => {
    dispatch(initFetch());
  }, [dispatch]);

  useEffect(() => {
    if (!gameStatus) {
      navigate("/results");
    }
  }, [gameStatus, navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleSubmit();
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit]);

  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: '30px 10px'
  }

  return (
    <RouteWrapper className="GameView" animate={true}>
      <Header linkTo='/home'/>
      <Counter />
      <div className='game-parts' style={style}>
        <Audio gameStatus={gameStatus} />
        <Input inputValue={inputValue} />
        <Button disableOnLoad={true} onButtonClick={handleSubmit}>submit</Button>
        <Keyboard onInputChange={handleInputChange} />
      </div>
    </RouteWrapper>
  );
}

export default GameView;
