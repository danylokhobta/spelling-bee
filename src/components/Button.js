import './Button.sass';
import { Link } from 'react-router-dom';

function Button({ children, linkTo, addOnClass='' }) {
  if(linkTo !== "") {
    return (
      <div className={`Button ${addOnClass}`}>
        <Link to={linkTo}>
          <button onClick={(event) => event.target.blur()}>{children}</button>
        </Link>
      </div>
    )
  } else {
    return <button className={`Button ${addOnClass}`} onClick={(event) => event.target.blur()}>{children}</button>
  }
}

export default Button;