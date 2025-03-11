import './Header.sass';
import Button from './Button';

function Header({ linkTo }) {

  return (
    <div className='Header'>
      {
        linkTo && (
          <Button linkTo={linkTo}><img src='icons/back.png' alt='Go Back' /></Button>
        )
      }
      <h3>Spelling Bee</h3>
    </div>
  );
}

export default Header;