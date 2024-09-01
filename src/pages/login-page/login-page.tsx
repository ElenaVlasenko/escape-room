import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
// import cn from 'classnames';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { loginAction, selectAuthorizationStatus, selectErrorMessage } from '../../store/user-slice/user-slice';
import { AuthorizationStatus, PageRoute } from '../../const';
import { resetErrorMessage } from '../../store/error-slice/error-slice';

// export const TEST_LOGIN_PAGE_IDS = {
//   PASSWORD_INPUT: 'user-password-input-id',
//   EMAIL_INPUT: 'user-email-input-id',
//   LOGIN_BUTTON: 'form-login-button-id'
// } as const;

export const LOGIN_PAGE_VALIDATION_ERROR_MESSAGES = {
  ILLEGAL_PASSWORD: 'Please enter a valid password.',
  ILLEGAL_EMAIL: 'Please enter a valid email address.'
} as const;

function isPasswordValid(password: string): boolean {
  return /[A-z]+/.test(password) && /\d+/.test(password) && password.length >= 3 && password.length <= 15;
}
function isEmailValid(email: string): boolean {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function LoginPage(): JSX.Element {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectErrorMessage);
  const authStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => () => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  if (authStatus === AuthorizationStatus.Auth) {
    navigate(PageRoute.Main);
  }

  const isFormDataValid = isPasswordValid(password) && isEmailValid(email);
  const errors = [
    ...(!isPasswordValid(password) ? [LOGIN_PAGE_VALIDATION_ERROR_MESSAGES.ILLEGAL_PASSWORD] : []),
    ...(!isEmailValid(email) ? [LOGIN_PAGE_VALIDATION_ERROR_MESSAGES.ILLEGAL_EMAIL] : []),
  ];

  const getMessage = () => {
    if (error) {
      return error;
    }

    return errors.length > 0 ? errors.join(' ') : null;
  };

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    if (isFormDataValid) {
      dispatch(loginAction({ password, email }));
    }
  }

  return (
    <div className="wrapper">
      <Header /> {/* убрать кнопку входа*/}
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
            />
            <img
              src="img/content/maniac/maniac-size-m.jpg"
              srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
              width={1366}
              height={768}
              alt=""
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            <form
              onSubmit={handleSubmit}
              className="login-form"
              action="https://echo.htmlacademy.ru/"
              method="post"
            >
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">
                      E&nbsp;–&nbsp;mail
                    </label>
                    <input
                      onChange={(evt) => setEmail(evt.target.value)}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Адрес электронной почты"
                      required
                    />
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">
                      Пароль
                    </label>
                    <input
                      onChange={(evt) => setPassword(evt.target.value)}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Пароль"
                      required
                    />
                  </div>
                </div>

                <button
                  className="btn btn--accent btn--general login-form__submit"
                  type="submit"
                >
                  Войти
                </button>
              </div>
              <div style={{ height: '150px', marginLeft: '130px', marginTop: '50px' }}>{getMessage()}</div>
              <label className="custom-checkbox login-form__checkbox">
                <input
                  type="checkbox"
                  id="id-order-agreement"
                  name="user-agreement"
                  required
                />
                <span className="custom-checkbox__icon">
                  <svg width={20} height={17} aria-hidden="true">
                    <use xlinkHref="#icon-tick" />
                  </svg>
                </span>
                <span className="custom-checkbox__label">
                  Я&nbsp;согласен с
                  <a className="link link--active-silver link--underlined" href="#">
                    правилами обработки персональных данных
                  </a>
                  &nbsp;и пользовательским соглашением
                </span>
              </label>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
