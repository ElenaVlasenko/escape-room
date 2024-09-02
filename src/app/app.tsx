import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageRoute } from '../const';
import ContactsPage from '../pages/contacts-page/contacts-page';
import MainPagePicker from '../pages/main-page/main-page-picker';
import QuestPagePicker from '../pages/quest-page/quest-page-picker';
import BookingPagePicker from '../pages/booking-page/booking-page-picker';
import LoginPagePicker from '../pages/login-page/login-page-picker';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import ReservationsPagePicker from '../pages/reservation-page/reservations-page-picker';

function App(): JSX.Element {
  function getInitializedAppRoutes() {
    return (
      <>
        <Route path={PageRoute.Main} element={<MainPagePicker />} />
        <Route path={PageRoute.Login} element={<LoginPagePicker />} />
        <Route path={PageRoute.Reservations} element={<ReservationsPagePicker />} />
        <Route path={PageRoute.Quest} element={<QuestPagePicker />} />
        <Route path={PageRoute.Contacts} element={<ContactsPage />} />
        <Route path={PageRoute.Booking} element={<BookingPagePicker />} />
        <Route path="*" element={<NotFoundPage />} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {getInitializedAppRoutes()}
      </Routes>
    </BrowserRouter >
  );
}

export default App;
