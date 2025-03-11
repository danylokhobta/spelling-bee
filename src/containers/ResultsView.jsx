import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ResultsView.sass';
import RouteWrapper from "./RouteWrapper";

import Button from '../components/Button';
import Header from '../components/Header';
import useAnimation from '../utils/useAnimation';

function ResultsView() {
  const { score, answers} = useSelector((state) => state.stats);

  const {addConfetti} = useAnimation();

  useEffect(() => {
    addConfetti();
  }, [])

  return (
    <RouteWrapper className="ResultsView" animate={true}>
      <Header linkTo='/' />
      <div className='results'>
        <h4>Results</h4>
        <p>You spelled <b>{score}</b> words correctly.</p>
        <Button linkTo='/game' resetGame={true}>Play Again ⇨</Button>
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
            {answers.map((user, i) => (
              <tr className='row' key={i}>
                <td>{i + 1}</td>
                <td>{user.correctAnswer}</td>
                <td className={user.userAnswer !== user.correctAnswer ? 'error' : ''}>{user.userAnswer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RouteWrapper>
  );
}

export default ResultsView;
