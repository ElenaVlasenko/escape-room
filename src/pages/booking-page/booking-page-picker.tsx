import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchQuestAction, selectIsQuestLoading, selectIsQuestNotFound, selectSelectedQuest } from '../../store/quest-slice/quest-slice';
import { useEffect } from 'react';
import { selectErrorMessage } from '../../store/error-slice/error-slice';
import ErrorPage from '../error-page/error-page';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../../components/spinner/spinner';
import { selectAuthorizationStatus } from '../../store/user-slice/user-slice';
import { AppRoute, AuthorizationStatus, PageRoute } from '../../const';
import BookingPage from './booking-page';
import { fetchBookingListAction, resetBookingListNotFound, selectBookingList, selectIsBookingListLoading, selectIsBookingListNotFound } from '../../store/booking-slice/booking-slice';

function BookingPagePicker(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedQuest = useAppSelector(selectSelectedQuest);
  const bookingList = useAppSelector(selectBookingList);
  const isSelectedBookingListLoading = useAppSelector(selectIsBookingListLoading);
  const isQuestLoading = useAppSelector(selectIsQuestLoading);
  const isQuestNotFound = useAppSelector(selectIsQuestNotFound);
  const isSelectedBookingListNotFound = useAppSelector(selectIsBookingListNotFound);
  const error = useAppSelector(selectErrorMessage);
  const authStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(
    () => {
      if (AuthorizationStatus.NoAuth === authStatus) {
        window.history.pushState({}, '', `${AppRoute.Quest}/${id}${AppRoute.Booking}`);
        navigate(PageRoute.Login);
        return;
      }

      if (!id) {
        navigate(PageRoute.Main);
        return;
      }

      if (
        selectedQuest === null
        && isQuestLoading === false
        && isQuestNotFound === false
        && error === null
      ) {
        dispatch(fetchQuestAction(id));
        return;
      }

      if (
        bookingList === null
        && isSelectedBookingListLoading === false
        && isSelectedBookingListNotFound === false
        && error === null
        && selectedQuest !== null
      ) {
        dispatch(fetchBookingListAction(selectedQuest.id));
      }

      return () => {
        if (isSelectedBookingListNotFound === true) {
          dispatch(resetBookingListNotFound());
        }
      };
    },
    [authStatus, navigate, selectedQuest, dispatch, isSelectedBookingListNotFound, bookingList, isSelectedBookingListLoading, error, isQuestLoading, isQuestNotFound, id]
  );

  if (error) {
    return <ErrorPage />;
  }

  if (isSelectedBookingListNotFound) {
    return <NotFoundPage />;
  }

  if (isSelectedBookingListLoading || isQuestLoading || AuthorizationStatus.Unknown === authStatus) {
    return <Spinner />;
  }

  if (
    AuthorizationStatus.Auth !== authStatus
    || selectedQuest === null
    || bookingList === null
  ) {
    return null;
  }

  return <BookingPage selectedQuest={selectedQuest} bookingList={bookingList} />;
}

export default BookingPagePicker;
