import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ReservationListItem from '../../components/reservation-list/reservation-list-item';
import ReservationsIsEmpty from '../../components/reservations-is-empty/reservations-is-empty';
import { useAppSelector } from '../../hooks/hooks';
import { selectReservations } from '../../store/user-slice/user-slice';

function ReservationsPage(): JSX.Element {
  const reservations = useAppSelector(selectReservations);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
            />
            <img
              src="img/content/maniac/maniac-bg-size-m.jpg"
              srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
              width={1366}
              height={1959}
              alt=""
            />
          </picture>
        </div>
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">
              Мои бронирования
            </h1>
          </div>
          {!reservations.length ? <ReservationsIsEmpty /> :
            <div className="cards-grid">
              {reservations.map((reservation) => <ReservationListItem key={reservation.id} {...reservation} />)}
            </div>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ReservationsPage;
