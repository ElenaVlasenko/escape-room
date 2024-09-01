import { Link } from 'react-router-dom';
import { PageRoute } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { selectUser } from '../../store/user-slice/user-slice';

function MyBookingButton(): JSX.Element {
  const user = useAppSelector(selectUser);

  return (
    <li className="main-nav__item">
      <Link className="link" to={user ? PageRoute.Reservations : PageRoute.Login}>
        Мои бронирования
      </Link>
    </li>
  );
}

export default MyBookingButton;
