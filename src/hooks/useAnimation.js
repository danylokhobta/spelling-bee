import { useContext } from 'react';
import {AnimationContext} from '../contexts/AnimationContext';
import Confetti from 'js-confetti';

const useAnimation = () => {
  const context = useContext(AnimationContext);

  const confetti = new Confetti();
  const addConfetti = () => {
    confetti.addConfetti({
      emojis: ['🌈', '⚡️', '💥', '✨', '🎉', '🥳'],
      emojiSize: 50,
      confettiNumber: 100,
    }).then(() => confetti.clearCanvas());
  };

  return {...context, addConfetti};
};

export default useAnimation;
