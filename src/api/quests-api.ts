import { ServerRoute } from '../const';
import { Quest, QuestListItem } from '../types';
import api from './api';

const questsApi = {
  async getList() {
    const { data } = await api.get<QuestListItem[]>(ServerRoute.Quests);
    return data;
  },

  async getQuest(id) {
    // throw Error;
    const { data } = await api.get<Quest>(`${ServerRoute.Quests}/${id}`);
    return data;
  },
} as const;

type QuestsApi = typeof questsApi;

export {
  questsApi
};

export type {
  QuestsApi
};
