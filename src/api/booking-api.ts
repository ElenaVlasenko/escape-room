import { ServerRoute } from '../const';
import { Booking } from '../types';
import api from './api';

const bookingApi = {

  async getList(questId: string): Promise<Booking[]> {
    const { data } = await api.get<Booking[]>(`${ServerRoute.Quests}/${questId}${ServerRoute.Booking}`);
    return data;
  },

} as const;

type BookingApi = typeof bookingApi;

export {
  bookingApi
};

export type {
  BookingApi
};
