import { ALL_TYPES, ANY_LEVEL, LevelName, TypeName } from './types';

export enum AppRoute {
  Main = '/',
  Login = '/logIn',
  Reservations = '/my-quests',
  Booking = '/booking',
  // NotFound = '/404',
  // ErrorPage = '/ErrorPage',
  Quest = '/quest',
  Id = ':id',
  Contacts = '/contacts'
}

export enum PageRoute {
  Main = AppRoute.Main,
  Login = AppRoute.Login,
  Quest = `${AppRoute.Quest}/${AppRoute.Id}`,
  Reservations = AppRoute.Reservations,
  // ErrorPage = AppRoute.ErrorPage,
  Contacts = AppRoute.Contacts,
  Booking = AppRoute.Booking
}

export enum ServerRoute {
  Quests = '/quest',
  Booking = '/booking',
  Reservation = '/reservation',
  LogIn = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export type SelectedType = TypeName | typeof ALL_TYPES;

export const TYPE_TRANSLATION: Readonly<Record<SelectedType, string>> = {
  [TypeName.ADVENTURES]: 'Приключения',
  [TypeName.DETECTIVE]: 'Детектив',
  [TypeName.HORROR]: 'Ужасы',
  [TypeName.MYSTIC]: 'Мистика',
  [TypeName.SCI_FI]: 'Sci-fi',
  [ALL_TYPES]: 'Все квесты',
};

export const LEVEL_TRANSLATION: Readonly<Record<LevelName | typeof ANY_LEVEL, string>> = {
  [ANY_LEVEL]: 'Любой',
  [LevelName.EASY]: 'Легкий',
  [LevelName.HARD]: 'Сложный',
  [LevelName.MIDDLE]: 'Средний',
};

export type SelectedLevel = LevelName | typeof ANY_LEVEL;
