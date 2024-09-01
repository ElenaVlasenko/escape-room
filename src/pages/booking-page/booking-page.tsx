import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AuthorizationStatus, PageRoute } from '../../const';
import { Booking, Day, Quest } from '../../types';
import SlotList from '../../components/schedule-list/schedule-list';
import { FormEventHandler, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CityMap, { Point } from '../../components/map/city-map';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addReservationAction, resetReservationWasAdded, selectAuthorizationStatus, selectReservationWasAdded } from '../../store/user-slice/user-slice';
import { AddBookingParams } from '../../api/reservation-api';

type Props = {
  selectedQuest: Quest;
  bookingList: Booking[];
};

type Inputs = {
  contactPerson: string;
  phone: string;
  peopleCount: number;
  withChildren: boolean;
}

const toPoint = ({ id, location: { coords: [lat, lng] } }: Booking): Point => ({ id, lat, lng });

function BookingPage({ selectedQuest, bookingList }: Props): JSX.Element | null {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [placeId, setPlaceId] = useState(bookingList[0].id);
  const [checkedSlotId, setCheckedSlotId] = useState<string | null>(null);
  const [date, setDate] = useState<Day | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [isAgreementsAccepted, setIsAgreementsAccepted] = useState(false);
  const isReservationAdded = useAppSelector(selectReservationWasAdded);
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const onPointClick = (pointId: string) => {
    setPlaceId(pointId);
    setDate(null);
    setTime(null);
    setCheckedSlotId(null);
  };

  const {
    register,
    handleSubmit,
    // watch,
    // control,
    formState: { errors },
  } = useForm<Inputs>();

  if (isReservationAdded) {
    dispatch(resetReservationWasAdded());
    navigate(PageRoute.Reservations);
    return null;
  }

  const selectedBooking = bookingList.find(({ id }) => id === placeId);

  if (selectedBooking === undefined) {
    throw Error(`empty booking list for quest with id: ${selectedQuest.id}`);
  }

  if (selectedQuest === null) {
    navigate(PageRoute.Main);
    return null;
  }

  const { title } = selectedQuest;

  const createOnSlotClickHandler = (day: Day) => (id: string, timeStr: string) => {
    setCheckedSlotId(id);
    setDate(day);
    setTime(timeStr);
  };

  const errorMessages = [
    ...(placeId === null ? ['Укажите место.'] : []),
    ...(time === null ? ['Укажите время.'] : []),
    ...Object.values(errors).map(({ message }) => message ?? 'Ошибка валидации формы.'),
  ];

  const getMessage = (): JSX.Element | null => errorMessages.length > 0 ? <>{errorMessages.map((message) => (<span key={message}>{message}<br /></ span>))}</> : null;

  const isFormValid = errorMessages.length === 0;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (authStatus !== AuthorizationStatus.Auth) { // на случай, если в процессе заполнения формы произошел разлогин
      navigate(PageRoute.Login);
    }

    if (!isFormValid) {
      return;
    }

    const bookingParams: AddBookingParams = {
      time: time as string,
      placeId,
      date: date as Day,
      contactPerson: data.contactPerson,
      phone: data.phone.replace('+7', '8'),
      withChildren: data.withChildren ?? false,
      peopleCount: data.peopleCount,
    };

    dispatch(addReservationAction({ questId: selectedQuest.id, params: bookingParams }));
  };

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
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">
              Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">
              {title}
            </p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                <div className="map__container">
                  <CityMap points={bookingList.map(toPoint)} selectedPointId={placeId} onPointClick={onPointClick} zoom={10} />
                </div>
              </div>
              <p className="booking-map__address">
                Вы&nbsp;выбрали: {selectedBooking.location.address}
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit) as FormEventHandler}
            className="booking-form"
          >
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              <SlotList day="today" checkedSlotId={checkedSlotId} slots={selectedBooking.slots['today']} onClick={createOnSlotClickHandler('today')} />
              <SlotList day="tomorrow" checkedSlotId={checkedSlotId} slots={selectedBooking.slots['tomorrow']} onClick={createOnSlotClickHandler('tomorrow')} />
            </fieldset>
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Контактная информация</legend>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="name">
                  Ваше имя
                </label>
                <input
                  {...register(
                    'contactPerson',
                    {
                      required: 'Укажите Ваше имя.',
                      pattern: {
                        value: /^[A-Яa-я]{1,15}$/,
                        message: 'Имя должно состоять из букв. Допустимая длина от 1 до 15 символов.'
                      }
                    })
                  }
                  // type="text"
                  placeholder="Имя"
                // onChange={(evt) => setName(evt.target.value)}
                // type="text"
                // id="name"
                // name="name"
                // placeholder="Имя"
                // required
                // pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">
                  Контактный телефон
                </label>
                <input
                  {...register(
                    'phone',
                    {
                      required: 'Укажите номер телефона.',
                      pattern: { value: /^\+7[0-9]{10,}$/, message: 'Укажите номер российского сотового телефона. Пример: +71111111111.' }
                    }
                  )
                  }
                  // type="text"
                  placeholder="Телефон"
                // onChange={(evt) => setTelNumber(evt.target.value)}
                // type="tel"
                // id="tel"
                // name="tel"
                // placeholder="Телефон"
                // required
                // pattern="[0-9]{10,}"
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">
                  Количество участников
                </label>
                <input
                  {...register(
                    'peopleCount',
                    {
                      valueAsNumber: true,
                      required: 'Укажите количество участников.',
                      min: {
                        value: selectedQuest.peopleMinMax[0],
                        message: `Минимальное количество участников: ${selectedQuest.peopleMinMax[0]}`,
                      },
                      max: {
                        value: selectedQuest.peopleMinMax[1],
                        message: `Максимальное количество участников: ${selectedQuest.peopleMinMax[1]}`,
                      },
                    }
                  )}
                  placeholder="Количество участников"
                // type="number"
                // onChange={(evt) => setParticipantNumber(evt.target.value)}
                // id="person"
                // name="person"
                // placeholder="Количество участников"
                // required
                />
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input
                  type="checkbox"
                  {...register('withChildren')}
                // id="withChildren"
                // name="withChildren"
                // defaultChecked
                />
                <span className="custom-checkbox__icon">
                  <svg width={20} height={17} aria-hidden="true">
                    <use xlinkHref="#icon-tick" />
                  </svg>
                </span>
                <span className="custom-checkbox__label">
                  Со&nbsp;мной будут дети
                </span>
              </label>
            </fieldset>
            <button
              disabled={!isAgreementsAccepted}
              className="btn btn--accent btn--cta booking-form__submit"
              type="submit"
            >
              Забронировать
            </button>
            <div style={{ height: '150px', marginLeft: '130px', marginTop: '50px' }}><p>{getMessage()}</p></div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
              <input
                onChange={(evt) => {
                  setIsAgreementsAccepted(evt.target.checked);
                }}
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
      </main>
      <Footer />
    </div>
  );
}

export default BookingPage;
