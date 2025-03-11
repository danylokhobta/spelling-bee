import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleSubmit } from '../state/statsSlice';
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../components/ui/toaster";
import Header from '../components/Header';
import Audio from '../components/Audio';
import Input from '../components/Input';
import Keyboard from '../components/Keyboard';
import Button from '../components/Button';
import Counter from '../components/Counter';
import RouteWrapper from './RouteWrapper';
import initFetch from '../utils/FetchContent'
import AnimationComponent from '../utils/AnimationComponent';

function GameView() {
  const { HP, score, error, loadStatus, fetchedWord } = useSelector((state) => state.stats);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        dispatch(handleSubmit());
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    let timer;
    if (!loadStatus && error === "") {
      timer = setTimeout(() => {
        toaster.create({
          title: "Loading taking longer than expected",
          type: "warning",
          description: "Please wait while we fetch the data...",
          status: 'warning',
          duration: 5000, // 5 seconds
          isClosable: true,
        })
      }, 5000); // 5 seconds
    } else {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [loadStatus, error]);

  useEffect(() => {
    if (error) {
      toaster.create({
        title: 'Error Loading Word',
        description: error,
        type: "error",
        status: 'error',
        duration: 10000, // 10 seconds
        isClosable: true,
      });
    }
  }, [error]);

  useEffect(() => {
    if (HP < 1) {
      navigate("/results");
    }
  }, [HP, score]);


  useEffect(() => {
    if (fetchedWord === "" && loadStatus && HP > 0) {
      initFetch();
    }
  }, [fetchedWord]);

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
        <Audio />
        <Input />
        <Button disableOnLoad={true} onClick={() => dispatch(handleSubmit())}>submit</Button>
        <Keyboard />
      </div>
      <Toaster />
      <AnimationComponent />
    </RouteWrapper>
  );
}

export default GameView;
