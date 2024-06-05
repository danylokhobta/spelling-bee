import './Button.sass';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../state/statsSlice';
import { Link } from 'react-router-dom';

function Button({ children, linkTo, addOnClass='', disableOnLoad, onButtonClick, resetGame = false }) {
  const isLoading = useSelector((state) => state.fetch.isLoading);
  const dispatch = useDispatch();

  if(linkTo !== "") {
    return (
      <Link to={linkTo}>
        <button
          className={`Button ${addOnClass} ${disableOnLoad && isLoading ? 'disabled' : ''}`}
          onClick={(e) => {
            e.currentTarget.blur();
            onButtonClick && onButtonClick();
            resetGame && dispatch(reset());
          }}
        >
          {children}
        </button>
      </Link>
    )
  } else {
    return <button className={`Button ${addOnClass}`} onClick={(event) => event.target.blur()}>{children}</button>
  }
}

export default Button;