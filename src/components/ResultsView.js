import { useState, useEffect } from 'react';
import './ResultsView.sass';
import Button from './Button';
import Header from './Header';

function ResultsView({ answersList }) {
  const [RAAmount, setRAAmount] = useState(0);

  useEffect(() => {
    // Calculate the correct answers count
    let correctAnswersCount = 0;
    answersList.forEach(user => {
      if (user.inputValue === user.fetchedWord) {
        correctAnswersCount++;
      }
    });
    // Update the state with the correct answers count
    setRAAmount(correctAnswersCount);
  }, [answersList]); // Run this effect whenever answersList changes

  return (
    <div className="ResultsView">
      <Header linkTo='/'/>
      <div className='results-content'>
        <div className='results'>
          <h4>Results</h4>
          <p>You spelled <b>{RAAmount}</b> words correctly.</p>
          <Button linkTo='/game'>Play Again ⇨</Button>
        </div>
        <div className='details'>
          <h4>Details</h4>
          <table>
            <thead>
              <tr className='row row__1'>
                <th>#</th>
                <th>Correct Answer</th>
                <th>Your Answer</th>
              </tr>
            </thead>
            <tbody>
              {answersList.map((user, i) => (
                <tr className='row' key={i}>
                  <td>{i + 1}</td>
                  <td>{user.fetchedWord}</td>
                  <td className={user.inputValue !== user.fetchedWord ? 'error' : ''}>{user.inputValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResultsView;