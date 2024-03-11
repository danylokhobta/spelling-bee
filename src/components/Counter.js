import './Counter.sass';

function Counter({ lifesLeft, correctAnswers }) {
  
  return (
    <div className="Counter">
      <div className='lives-counter'>
        <p><b>{lifesLeft}</b></p>
        <p><span className='error'>lives</span> remaining</p>
      </div>
      <div className='corrects-counter'>
        <p><b>{correctAnswers}</b></p>
        <p><span className='error'>corect</span> answers</p>
      </div>
    </div>
  );
}

export default Counter;
