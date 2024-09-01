import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
// import { Category, ProductListItem } from '../../types';
import { createSelector } from 'reselect';
// import { ProductsApi } from '../../api/products-api';
// import { sampleSize } from 'lodash';
// import { CategoryName, DISPLAYED_PRODUCTS_NUMBER_STEP, TypeName } from '../../const';
// import { CategoryApi } from '../../api/category-api';
import { showErrorMessage } from '../error-slice/error-slice';
import { ALL_TYPES, ANY_LEVEL, LevelName, QuestListItem } from '../../types';
import { QuestsApi } from '../../api/quests-api';
import { SelectedLevel, SelectedType } from '../../const';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export type QuestsState = {
  quests: QuestListItem[];
  // categories: Category[];
  // selectedTypes: TypeName[];
  // selectedCategoryName: CategoryName | null;
  // displayedProductsNumber: number;
  // isCategoriesLoading: boolean;
  selectedTypeName: SelectedType;
  selectedLevelName: LevelName | typeof ANY_LEVEL;
}

export const initialState: QuestsState = {
  quests: [],
  selectedTypeName: ALL_TYPES,
  selectedLevelName: ANY_LEVEL,
  // categories: [],
  // selectedTypes: [],
  // selectedCategoryName: null,
  // displayedProductsNumber: DISPLAYED_PRODUCTS_NUMBER_STEP,
  // isCategoriesLoading: false,
};

export const QUESTS_SLICE_NAME = 'quests';
// export const MAIN_PAGE_PRODUCTS_NUMBER = 3;

const selectQuests = (state: Pick<QuestsState, 'quests'>) => state.quests;
const selectCurrentTypeName = (state: Pick<QuestsState, 'selectedTypeName'>) => state.selectedTypeName;
const selectCurrentLevelName = (state: Pick<QuestsState, 'selectedLevelName'>) => state.selectedLevelName;
// const selectCurrentTypes = (state: Pick<QuestsState, 'selectedTypes'>) => state.selectedTypes;
// const selectCategoriesFromState = (state: Pick<QuestsState, 'categories'>) => state.categories;

const filteredQuests = createSelector(
  [
    selectQuests,
    selectCurrentTypeName,
    selectCurrentLevelName,
  ],
  (quests, selectedType, selectedLevel) => quests.filter((quest) =>

    // if (!selectedType && !selectedLevel) {
    //   return true;
    // }
    // if (selectCategoryTypes.length === 0) {
    //   return product.category === selectedCategory;
    // }
    (selectedType === ALL_TYPES || quest.type === selectedType)
    && (selectedLevel === ANY_LEVEL || quest.level === selectedLevel)
  )
);

const questsSlice = createSliceWithThunks({
  name: QUESTS_SLICE_NAME,
  initialState,
  selectors: {
    // selectRandomProducts: createSelector(
    //   [
    //     selectQuests,
    //   ],
    //   (products) => sampleSize(products, MAIN_PAGE_PRODUCTS_NUMBER)
    // ),
    // selectDisplayedProducts: createSelector(
    //   [
    //     selectQuests,
    //     // (state: Pick<QuestsState, 'displayedProductsNumber'>) => state.displayedProductsNumber,
    //     selectCurrentTypeName,
    //     selectCurrentLevelName,
    //   ],
    //   (quests, selectedType, selectedLevel) =>
    //     filteredQuests({ quests, selectedTypeName: selectedType, selectedLevelName: selectedLevel })
    // ),
    // selectCategoryTypes: createSelector(
    //   [
    //     selectCategoriesFromState,
    //     selectCurrentCategoryName,
    //   ],
    //   (categories, selectedCategoryName) => selectedCategoryName && categories.length > 0
    //     ? categories.find(({ category }) => category === selectedCategoryName)?.types
    //     : null
    // ),
    // selectIsCategoriesLoading: (state) => state.isCategoriesLoading,
    // selectCategories: selectCategoriesFromState,
    selectSelectedType: selectCurrentTypeName,
    selectSelectedLevel: selectCurrentLevelName,
    // selectFilteredProducts: filteredProducts,
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
      // state.selectedTypes = [];
      // state.displayedProductsNumber = DISPLAYED_PRODUCTS_NUMBER_STEP;
    }),
    setSelectedLevel: create.reducer<SelectedLevel>((state, action) => {
      const { payload: selectedLevel } = action;
      state.selectedLevelName = selectedLevel;
      // state.selectedTypes = [];
      // state.displayedProductsNumber = DISPLAYED_PRODUCTS_NUMBER_STEP;
    }),
    // setSelectedType: create.reducer<TypeName>((state, action) => {
    //   const { payload: selectedType } = action;

    //   const newValue = state.selectedTypes.includes(selectedType)
    //     ? state.selectedTypes.filter((item) => item !== selectedType)
    //     : [...state.selectedTypes, selectedType];

    //   state.selectedTypes = newValue;
    // }),
    // increaseDisplayedProductsNumber: create.reducer((state) => {
    //   state.displayedProductsNumber = Math.min(state.products.length, state.displayedProductsNumber + DISPLAYED_PRODUCTS_NUMBER_STEP);
    // }),
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
    // fetchProductsCategoriesAction: create.asyncThunk<Category[], undefined, { extra: { productsCategoryApi: CategoryApi } }>(
    //   async (_arg, { extra: { productsCategoryApi }, dispatch }) => productsCategoryApi.getList().catch((err) => {
    //     showErrorMessage(err, dispatch);
    //     throw err;
    //   }),
    //   {
    //     fulfilled: (state, action) => {
    //       const { payload: categories } = action;
    //       state.categories = categories;
    //       state.isCategoriesLoading = false;
    //     },
    //     pending: (state) => {
    //       state.isCategoriesLoading = true;
    //     },
    //     rejected: (state) => {
    //       state.isCategoriesLoading = false;
    //     }
    //   }
    // ),
  }),
});

export default questsSlice;

export const {
  selectSelectedQuests,
  selectSelectedType,
  selectSelectedLevel,
  selectFilteredQuests,
  // selectDisplayedProducts,
  // selectRandomProducts,
  // selectCategories,
  // selectIsCategoriesLoading,
  // selectSelectedCategory,
  // selectSelectedTypes,
  // selectCategoryTypes,
  // selectFilteredProducts
} = questsSlice.selectors;

export const {

  fetchQuestsAction,
  setSelectedType,
  setSelectedLevel,
  resetFilters
  // increaseDisplayedProductsNumber,
  // fetchProductsCategoriesAction,
  // setSelectedCategory,
  // setSelectedType,
  // resetFilters
} = questsSlice.actions;
