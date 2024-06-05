import './Header.sass';
import Button from './Button';
import back from '../assets/icons/back.png';

function Header({ linkTo }) {

  return (
    <div className='Header'>
      {
        linkTo && (
          <Button linkTo={linkTo}><img src={back} alt='Go Back' /></Button>
        )
      }
      <span>Spelling Bee</span>
    </div>
  );
}

export default Header;