import './Input.sass';
function Input({ inputValue }) {
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
      <p>{inputValue.toUpperCase()}</p>
    </div>
  );
}

export default Input;