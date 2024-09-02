import { useAppSelector } from '../../hooks/hooks';
import { selectErrorMessage } from '../../store/error-slice/error-slice';
import ErrorPage from '../error-page/error-page';
import MainPage from './main-page';

function MainPagePicker(): JSX.Element | null {
  const error = useAppSelector(selectErrorMessage);

  if (error) {
    return <ErrorPage />;
  }

  return <MainPage />;
}

export default MainPagePicker;
