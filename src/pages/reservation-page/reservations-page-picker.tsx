import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { selectAuthorizationStatus } from '../../store/user-slice/user-slice';
import { AuthorizationStatus, PageRoute } from '../../const';
import Spinner from '../../components/spinner/spinner';
import ReservationsPage from './reservations-page';

function ReservationsPagePicker(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(
    () => {
      if (AuthorizationStatus.NoAuth === authStatus) {
        window.history.pushState({}, '', PageRoute.Reservations);
        navigate(PageRoute.Login);
      }
    },
    [authStatus, navigate, dispatch]
  );

  if (authStatus === AuthorizationStatus.Auth) {
    return <ReservationsPage />;
  }

  if (authStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return null;
}

export default ReservationsPagePicker;
