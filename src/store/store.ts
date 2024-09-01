import { configureStore } from '@reduxjs/toolkit';
// import userSlice, { USER_SLICE_NAME } from './user-slice';
// import { userApi } from '../api/user-api';
// import { favoritesApi } from '../api/favorites-api';
// import { productsApi, productsApV2i } from '../api/products-api';
// import productsSlice, { PRODUCTS_SLICE_NAME } from './products-slice/products-slice';
// import lastReviewSlice, { LAST_REVIEW_SLICE_NAME } from './last-review-slice';
// import { reviewApi } from '../api/review-api';
// import { categoryApi } from '../api/category-api';
// import productSlice, { PRODUCT_SLICE_NAME } from './product-slice';
import errorSlice, { ERROR_SLICE_NAME } from './error-slice/error-slice';
// import reviewSlice, { REVIEW_SLICE_NAME } from './review-slice';
// import registrationSlice, { REGISTRATION_SLICE_NAME } from './registration-slice/registration-slice';
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
