import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { resetErrorMessage, selectAuthorizationStatus } from '../../store/user-slice/user-slice';
import { AuthorizationStatus } from '../../const';
import LoginPage from './login-page';
import Spinner from '../../components/spinner/spinner';

function LoginPagePicker(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(-1);
    }

    return () => {
      dispatch(resetErrorMessage());
    };
  }, [dispatch, authStatus, navigate]);

  if (authStatus === AuthorizationStatus.NoAuth) {
    return <LoginPage />;
  }

  if (authStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return null;
}

export default LoginPagePicker;
