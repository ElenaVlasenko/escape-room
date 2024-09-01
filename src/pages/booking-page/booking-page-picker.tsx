import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSelectedQuest } from '../../store/quest-slice/quest-slice';
import { useEffect } from 'react';
import { selectErrorMessage } from '../../store/error-slice/error-slice';
import ErrorPage from '../error-page/error-page';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../../components/spinner/spinner';
import { selectAuthorizationStatus } from '../../store/user-slice/user-slice';
import { AuthorizationStatus, PageRoute } from '../../const';
import BookingPage from './booking-page';
import { fetchBookingListAction, resetBookingListNotFound, selectBookingList, selectIsBookingListLoading, selectIsBookingListNotFound } from '../../store/booking-slice/booking-slice';

function BookingPagePicker(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedQuest = useAppSelector(selectSelectedQuest);
  const bookingList = useAppSelector(selectBookingList);
  const isSelectedBookingListLoading = useAppSelector(selectIsBookingListLoading);
  const isSelectedBookingListNotFound = useAppSelector(selectIsBookingListNotFound);
  const error = useAppSelector(selectErrorMessage);
  const authStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(
    () => {
      if (AuthorizationStatus.Auth !== authStatus) {
        navigate(PageRoute.Login);
        return;
      }

      if (selectedQuest === null) {
        navigate(PageRoute.Main);
        return;
      }

      if (
        bookingList === null
        && isSelectedBookingListLoading === false
        && isSelectedBookingListNotFound === false
        && error === null
      ) {
        dispatch(fetchBookingListAction(selectedQuest.id));
      }

      return () => {
        if (isSelectedBookingListNotFound === true) {
          dispatch(resetBookingListNotFound());
        }
      };
    },
    [authStatus, navigate, selectedQuest, dispatch, isSelectedBookingListNotFound, bookingList, isSelectedBookingListLoading, error]
  );

  if (error) {
    return <ErrorPage />;
  }

  if (isSelectedBookingListNotFound) {
    return <NotFoundPage />;
  }

  if (
    AuthorizationStatus.Auth !== authStatus
    || selectedQuest === null
    || bookingList === null
  ) {
    return null;
  }

  if (isSelectedBookingListLoading) {
    return <Spinner />;
  }

  return <BookingPage selectedQuest={selectedQuest} bookingList={bookingList} />;
}

export default BookingPagePicker;
