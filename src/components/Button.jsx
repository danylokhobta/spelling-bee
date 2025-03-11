import './Button.sass';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../state/statsSlice';
import { Link } from 'react-router-dom';

function Button({ children, linkTo="", disableOnLoad=false, onClick, resetGame = false }) {
  const { loadStatus } = useSelector((state) => state.stats);
  const dispatch = useDispatch();

  return (
    <Link to={linkTo}>
      <button
        className={`Button ${disableOnLoad && (loadStatus ? '' : 'disabled')}`}
        onClick={(e) => {
          e.currentTarget.blur();
          onClick && onClick();
          resetGame && dispatch(reset());
        }}
      >
        {children}
      </button>
    </Link>
  )
}

export default Button;