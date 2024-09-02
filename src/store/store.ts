import { configureStore } from '@reduxjs/toolkit';
import errorSlice, { ERROR_SLICE_NAME } from './error-slice/error-slice';
import { questsApi } from '../api/quests-api';
import questsSlice, { QUESTS_SLICE_NAME } from './quests-slice/quests-slice';
import { userApi } from '../api/user-api';
import userSlice, { USER_SLICE_NAME } from './user-slice/user-slice';
import { reservationApi } from '../api/reservation-api';
import questSlice, { QUEST_SLICE_NAME } from './quest-slice/quest-slice';
import bookingSlice, { BOOKING_SLICE_NAME } from './booking-slice/booking-slice';
import { bookingApi } from '../api/booking-api';

export const extraArgument = {
  questsApi,
  userApi,
  reservationApi,
  bookingApi
};

const store = configureStore({
  reducer: {
    [QUESTS_SLICE_NAME]: questsSlice.reducer,
    [QUEST_SLICE_NAME]: questSlice.reducer,
    [ERROR_SLICE_NAME]: errorSlice.reducer,
    [USER_SLICE_NAME]: userSlice.reducer,
    [BOOKING_SLICE_NAME]: bookingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument
      },
    }),
});

export default store;
