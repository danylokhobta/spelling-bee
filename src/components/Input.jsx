import './Input.sass';
import { useSelector } from 'react-redux';

function Input() {
  const { userAnswer } = useSelector((state) => state.stats);

  const inputStyle = {
    border: '1px solid black',
    height: '50px',
    flexGrow: '1',
    flexShrink: '1',
    padding: '0 10px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center'
  }
  return (
    <div className='Input' style={inputStyle}>
      <p>{userAnswer.toUpperCase()}</p>
    </div>
  );
}

export default Input;