import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { showErrorMessage } from '../error-slice/error-slice';
import { ALL_TYPES, ANY_LEVEL, LevelName, QuestListItem } from '../../types';
import { QuestsApi } from '../../api/quests-api';
import { SelectedLevel, SelectedType } from '../../const';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export type QuestsState = {
  quests: QuestListItem[];
  selectedTypeName: SelectedType;
  selectedLevelName: LevelName | typeof ANY_LEVEL;
}

export const initialState: QuestsState = {
  quests: [],
  selectedTypeName: ALL_TYPES,
  selectedLevelName: ANY_LEVEL,
};

export const QUESTS_SLICE_NAME = 'quests';

const selectQuests = (state: Pick<QuestsState, 'quests'>) => state.quests;
const selectCurrentTypeName = (state: Pick<QuestsState, 'selectedTypeName'>) => state.selectedTypeName;
const selectCurrentLevelName = (state: Pick<QuestsState, 'selectedLevelName'>) => state.selectedLevelName;

const filteredQuests = createSelector(
  [
    selectQuests,
    selectCurrentTypeName,
    selectCurrentLevelName,
  ],
  (quests, selectedType, selectedLevel) => quests.filter((quest) =>
    (selectedType === ALL_TYPES || quest.type === selectedType)
    && (selectedLevel === ANY_LEVEL || quest.level === selectedLevel)
  )
);

const questsSlice = createSliceWithThunks({
  name: QUESTS_SLICE_NAME,
  initialState,
  selectors: {
    selectSelectedType: selectCurrentTypeName,
    selectSelectedLevel: selectCurrentLevelName,
    selectSelectedQuests: selectQuests,
    selectFilteredQuests: filteredQuests,
  },
  reducers: (create) => ({
    resetFilters: create.reducer((state) => {
      state.selectedLevelName = ANY_LEVEL;
      state.selectedTypeName = ALL_TYPES;
    }),
    setSelectedType: create.reducer<SelectedType>((state, action) => {
      const { payload: selectedType } = action;
      state.selectedTypeName = selectedType;
    }),
    setSelectedLevel: create.reducer<SelectedLevel>((state, action) => {
      const { payload: selectedLevel } = action;
      state.selectedLevelName = selectedLevel;
    }),
    fetchQuestsAction: create.asyncThunk<QuestListItem[], undefined, { extra: { questsApi: QuestsApi } }>(
      async (_arg, { extra: { questsApi }, dispatch }) => questsApi.getList().catch((err) => {
        showErrorMessage(err, dispatch);
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          const { payload: quests } = action;
          state.quests = quests;
        },
      }
    ),
  }),
});

export default questsSlice;

export const {
  selectSelectedQuests,
  selectSelectedType,
  selectSelectedLevel,
  selectFilteredQuests,
} = questsSlice.selectors;

export const {

  fetchQuestsAction,
  setSelectedType,
  setSelectedLevel,
  resetFilters
} = questsSlice.actions;
