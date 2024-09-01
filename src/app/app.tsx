import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationStatus, PageRoute } from '../const';
// import ConditionalRoute from '../conditional-route/conditional-route';
// import { useAppSelector } from '../hooks/hooks';
// import { selectAuthorizationStatus } from '../store/user-slice';
// import RegistrationPage from '../pages/registration-page/registration-page';
// import LoginPage from '../pages/login-page/login-page';
// import ProductPagePicker from '../pages/product-page/product-page-picker';
// import FavoritesPage from '../pages/favorite-page/favorites-page';
// import ErrorPage from '../pages/error-page/error-page';
// import CatalogPagePicker from '../pages/catalog-page/catalog-page-picker';
// import MainPagePicker from '../pages/main-page/main-page-picker';
import ConditionalRoute from '../conditional-route/conditional-route';
import LoginPage from '../pages/login-page/login-page';
import ReservationsPage from '../pages/reservation-page/reservations-page';
import ContactsPage from '../pages/contacts-page/contacts-page';
import MainPagePicker from '../pages/main-page/main-page-picker';
import { selectAuthorizationStatus } from '../store/user-slice/user-slice';
import { useAppSelector } from '../hooks/hooks';
import QuestPagePicker from '../pages/quest-page/quest-page-picker';
import BookingPagePicker from '../pages/booking-page/booking-page-picker';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  function getInitializedAppRoutes() {
    return (
      <>
        <Route path={PageRoute.Main} element={<MainPagePicker />} />
        {/* <Route path={PageRoute.Catalog} element={<CatalogPagePicker />} />
        <Route path={PageRoute.ErrorPage} element={<ErrorPage />} />
        <Route path={PageRoute.Registration} element={
          <ConditionalRoute
            condition={authorizationStatus === AuthorizationStatus.NoAuth}
            routOnFalse={PageRoute.Main}
          >
            <RegistrationPage />
          </ConditionalRoute>
        }
        /> */}
        <Route path={PageRoute.Login} element={
          <ConditionalRoute
            condition={authorizationStatus === AuthorizationStatus.NoAuth}
            routOnFalse={PageRoute.Main}
          >
            <LoginPage />
          </ConditionalRoute>
        }
        />
        <Route path={PageRoute.Reservations} element={
          <ConditionalRoute
            condition={authorizationStatus === AuthorizationStatus.Auth}
            routOnFalse={PageRoute.Main}
          >
            <ReservationsPage />
          </ConditionalRoute>
        }
        />
        <Route path={PageRoute.Quest} element={<QuestPagePicker />} />
        <Route path={PageRoute.Contacts} element={<ContactsPage />} />
        <Route path={PageRoute.Booking} element={<BookingPagePicker />} />
      </> //поменять путь квеста, когда будет id
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {getInitializedAppRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
