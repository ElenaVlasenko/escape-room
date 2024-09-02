import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { User, AuthParams, Reservation } from '../../types';
import { getToken } from '../../api/token';
import { AuthorizationStatus, CONFLICT_ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE } from '../../const';
import { CONFLICT_STATUS, isAxiosNotFoundError } from '../../utils';
import { showErrorMessage } from '../error-slice/error-slice';
import { UserApi } from '../../api/user-api';
import { AddBookingParams, ReservationApi } from '../../api/reservation-api';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type UserState = {
  user: User | null;
  token: string | null;
  reservations: Reservation[];
  errorMessage: string | null;
  reservationWasAdded: boolean;
}

const defaultState: UserState = {
  user: null,
  token: getToken(),
  reservations: [],
  errorMessage: null,
  reservationWasAdded: false,
};

export const USER_SLICE_NAME = 'user';

export const createUserSlice = (initialState: UserState) => createSliceWithThunks({
  name: USER_SLICE_NAME,
  initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectErrorMessage: (state) => state.errorMessage,
    selectReservations: (state) => state.reservations,
    selectReservationWasAdded: (state) => state.reservationWasAdded,
    selectAuthorizationStatus: (state) => {
      if (state.user) {
        return AuthorizationStatus.Auth;
      }

      if (state.token) {
        return AuthorizationStatus.Unknown;
      }

      return AuthorizationStatus.NoAuth;
    },
  },
  reducers: (create) => ({
    resetErrorMessage: create.reducer((state) => {
      state.errorMessage = null;
    }),
    resetReservations: create.reducer((state) => {
      state.reservations = [];
    }),
    resetReservationWasAdded: create.reducer((state) => {
      state.reservationWasAdded = false;
    }),
    loginAction: create.asyncThunk<{ user: User | null; reservations: Reservation[] }, AuthParams, { extra: { userApi: UserApi; reservationApi: ReservationApi } }>(
      async (authData, { extra: { userApi, reservationApi }, dispatch }) => {

        const user = await userApi.login(authData).catch((err) => {
          if (!isAxiosNotFoundError(err)) {
            showErrorMessage(err, dispatch);
          }

          throw err;
        });

        const reservations = await reservationApi.getList().catch((err) => {
          showErrorMessage(err, dispatch);
          throw err;
        });

        return { user, reservations };
      },
      {
        fulfilled: (state, action) => {
          const { user, reservations } = action.payload;
          state.user = user;
          state.reservations = reservations;
          state.errorMessage = null;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message?.includes(CONFLICT_STATUS.toString()) ? CONFLICT_ERROR_MESSAGE : UNKNOWN_ERROR_MESSAGE;
        },
      }
    ),
    logoutAction: create.asyncThunk<void, undefined, { extra: { userApi: UserApi } }>(
      (_arg, { extra: { userApi }, dispatch }) => userApi.logout().catch((err) => {
        showErrorMessage(err, dispatch);
        throw err;
      }),
      {
        fulfilled: (state) => {
          state.user = null;
          state.token = null;
          state.reservations = [];
        },
      }
    ),
    checkAuthAction: create.asyncThunk<{ user: User | null; reservations: Reservation[] }, undefined, { extra: { userApi: UserApi; reservationApi: ReservationApi } }>(
      async (_arg, { extra: { userApi, reservationApi }, getState, dispatch }) => {
        const state = getState() as { user: UserState };

        if (!state.user.token) {
          return { user: null, reservations: [] };
        }

        const user = await userApi.getAuthorizedUser().catch((err) => {
          showErrorMessage(err, dispatch);
          throw err;
        });

        const reservations = await reservationApi.getList().catch((err) => {
          showErrorMessage(err, dispatch);
          throw err;
        });

        return { user, reservations };
      },
      {
        fulfilled: (state, action) => {
          const { payload: { user, reservations } } = action;
          state.user = user;
          state.reservations = reservations;
        },
        rejected: (state) => {
          state.token = null;
        },
      }
    ),
    addReservationAction: create.asyncThunk<Reservation, { questId: string; params: AddBookingParams }, { extra: { reservationApi: ReservationApi } }>(
      ({ questId, params }, { extra: { reservationApi }, dispatch }) => reservationApi.add(questId, params).catch((err) => {
        if (!isAxiosNotFoundError(err)) {
          showErrorMessage(err, dispatch);
        }

        throw err;
      }),
      {
        fulfilled: (state, action) => {
          state.reservations = [...state.reservations, action.payload];
          state.reservationWasAdded = true;
        },
      }
    ),
    deleteReservationAction: create.asyncThunk<void, string, { extra: { reservationApi: ReservationApi } }>(
      async (id, { extra: { reservationApi }, dispatch }) => reservationApi.delete(id).catch((err) => {
        showErrorMessage(err, dispatch);
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          state.reservations = state.reservations.filter(({ id }) => id !== action.meta.arg);
        },
      }
    )
  }),
});

const userSlice = createUserSlice(defaultState);

export default userSlice;

export {
  defaultState as userSliceDefaultState
};

export const {
  selectAuthorizationStatus,
  selectUser,
  selectReservations,
  selectErrorMessage,
  selectReservationWasAdded
} = userSlice.selectors;

export const {
  resetErrorMessage,
  loginAction,
  logoutAction,
  checkAuthAction,
  resetReservations,
  addReservationAction,
  deleteReservationAction,
  resetReservationWasAdded
} = userSlice.actions;
