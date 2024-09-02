import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logoutAction, selectUser } from '../../store/user-slice/user-slice';
import { PageRoute } from '../../const';
import Logo from '../logo/logo';
import { MouseEventHandler } from 'react';
import MyBookingButton from '../my-booking-button/my-booking-button';

function LogOutButton(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLogOutClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <Link className='btn header__side-item btn--accent' to="" onClick={handleLogOutClick}>Выйти</Link>
  );
}

function LoginButton(): JSX.Element {
  const navigate = useNavigate();

  const handleLoginClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    navigate(PageRoute.Login);
  };

  return (
    <Link className='btn header__side-item' to="" onClick={handleLoginClick}>Вход</Link>
  );
}

function Header(): JSX.Element {
  const user = useAppSelector(selectUser);

  return (
    <header className="header">
      <div className="container container--size-l">
        <Logo />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="link not-disabled active" to={PageRoute.Main}>
                Квесты
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="link" to={PageRoute.Contacts}>
                Контакты
              </Link>
            </li>
            {user ? <MyBookingButton /> : ''}
          </ul>
        </nav>
        <div className="header__side-nav">
          {user ? <LogOutButton /> : <LoginButton />}
          <Link
            className="link header__side-item header__phone-link"
            to="tel:88003335599"
          >
            8 (000) 111-11-11
          </Link>
        </div>
      </div>
    </header >
  );
}

export default Header;
