import Confetti from 'js-confetti';

const useAnimation = () => {

  const confetti = new Confetti();
  const addConfetti = () => {
    confetti.addConfetti({
      emojis: ['🌈', '⚡️', '💥', '✨', '🎉', '🥳'],
      emojiSize: 50,
      confettiNumber: 100,
    }).then(() => confetti.clearCanvas());
  };

  return {addConfetti};
};

export default useAnimation;
