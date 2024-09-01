import { ServerRoute } from '../const';
import { Day, Reservation } from '../types';
import api from './api';

export type AddBookingParams = {
  date: Day;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
}

const reservationApi = {
  async getList(): Promise<Reservation[]> {
    const { data } = await api.get<Reservation[]>(ServerRoute.Reservation);
    return data;
  },

  async add(questId: string, params: AddBookingParams): Promise<Reservation> {
    const { data } = await api.post<Reservation>(`${ServerRoute.Quests}/${questId}${ServerRoute.Booking}`, params);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete<void>(`${ServerRoute.Reservation}/${id}`);
  }

} as const;

type ReservationApi = typeof reservationApi;

export {
  reservationApi,
};

export type {
  ReservationApi,
};
