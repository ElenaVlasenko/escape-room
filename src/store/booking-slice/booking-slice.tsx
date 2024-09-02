import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { isAxiosNotFoundError, isNotFoundError } from '../../utils';
import { Booking } from '../../types';
import { showErrorMessage } from '../error-slice/error-slice';
import { BookingApi } from '../../api/booking-api';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export type BookingState = {
  bookingList: Booking[] | null;
  isBookingListLoading: boolean;
  notFound: boolean;
}

export const initialState: BookingState = {
  bookingList: null,
  isBookingListLoading: false,
  notFound: false,
};

export const BOOKING_SLICE_NAME = 'booking';

const bookingSlice = createSliceWithThunks({
  name: BOOKING_SLICE_NAME,
  initialState,
  selectors: {
    selectBookingList: (state) => state.bookingList,
    selectIsBookingListLoading: (state) => state.isBookingListLoading,
    selectIsBookingListNotFound: (state) => state.notFound,
  },
  reducers: (create) => ({
    resetBookingListNotFound: create.reducer((state) => {
      state.notFound = false;
    }),
    fetchBookingListAction: create.asyncThunk<Booking[], string, { extra: { bookingApi: BookingApi } }>(
      (id, { extra: { bookingApi }, dispatch }) => bookingApi.getList(id).catch((err) => {
        if (!isAxiosNotFoundError(err)) {
          showErrorMessage(err, dispatch);
        }
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          state.bookingList = action.payload;
          state.isBookingListLoading = false;
          state.notFound = false;
        },
        pending: (state) => {
          state.isBookingListLoading = true;
          state.notFound = false;
        },
        rejected: (state, action) => {
          if (isNotFoundError(action.error)) {
            state.notFound = true;
            state.isBookingListLoading = false;
          }
        }
      }
    ),
  }),
});

export default bookingSlice;

export const {
  selectBookingList,
  selectIsBookingListLoading,
  selectIsBookingListNotFound
} = bookingSlice.selectors;

export const {
  fetchBookingListAction,
  resetBookingListNotFound
} = bookingSlice.actions;
