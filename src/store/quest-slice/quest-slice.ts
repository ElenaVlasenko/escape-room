import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { isAxiosNotFoundError, isNotFoundError } from '../../utils';
import { Quest } from '../../types';
import { QuestsApi } from '../../api/quests-api';
import { showErrorMessage } from '../error-slice/error-slice';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export type QuestState = {
  selectedQuest: Quest | null;
  isQuestLoading: boolean;
  notFound: boolean;
}

export const initialState: QuestState = {
  selectedQuest: null,
  isQuestLoading: false,
  notFound: false,
};

export const QUEST_SLICE_NAME = 'quest';

const questSlice = createSliceWithThunks({
  name: QUEST_SLICE_NAME,
  initialState,
  selectors: {
    selectSelectedQuest: (state) => state.selectedQuest,
    selectIsQuestLoading: (state) => state.isQuestLoading,
    selectIsQuestNotFound: (state) => state.notFound,
  },
  reducers: (create) => ({
    resetQuestNotFound: create.reducer((state) => {
      state.notFound = false;
    }),
    fetchQuestAction: create.asyncThunk<Quest, string, { extra: { questsApi: QuestsApi } }>(
      (id, { extra: { questsApi }, dispatch }) => questsApi.getQuest(id).catch((err) => {
        if (!isAxiosNotFoundError(err)) {
          showErrorMessage(err, dispatch);
        }
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          state.selectedQuest = action.payload;
          state.isQuestLoading = false;
          state.notFound = false;
        },
        pending: (state) => {
          state.selectedQuest = null;
          state.isQuestLoading = true;
          state.notFound = false;
        },
        rejected: (state, action) => {
          if (isNotFoundError(action.error)) {
            state.notFound = true;
          }
          state.isQuestLoading = false;
        }
      }
    )
  }),
});

export default questSlice;

export const {
  selectSelectedQuest,
  selectIsQuestLoading,
  selectIsQuestNotFound
} = questSlice.selectors;

export const {
  fetchQuestAction,
  resetQuestNotFound
} = questSlice.actions;
