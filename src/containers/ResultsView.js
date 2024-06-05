import { useSelector } from 'react-redux';
import './ResultsView.sass';
import Button from '../components/Button';
import Header from '../components/Header';
import useAnimation from '../hooks/useAnimation';
import { useEffect } from 'react';
import RouteWrapper from '../components/RouteWrapper';

function ResultsView() {
  const correct = useSelector((state) => state.stats.correct);
  const answers = useSelector((state) => state.stats.answers);

  const {addConfetti} = useAnimation();

  useEffect(() => {
    addConfetti();
  }, [])

  return (
    <RouteWrapper className="ResultsView" animate={true}>
      <Header linkTo='/' />
      <div className='results-content'>
        <div className='results'>
          <h4>Results</h4>
          <p>You spelled <b>{correct}</b> words correctly.</p>
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
                  <td>{user.correct}</td>
                  <td className={user.submitted !== user.correct ? 'error' : ''}>{user.submitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RouteWrapper>
  );
}

export default ResultsView;
