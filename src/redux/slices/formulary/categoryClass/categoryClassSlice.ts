import {createSlice} from "@reduxjs/toolkit";

import { getClassificationSystems, postDrugsCategory, getIntelliscenseSearch, getCategoryClasses, postDrugsClassCategoryOverride } from "./categoryClassActionCreation";
import { getClassificationSystemsFulfilled, getClassificationSystemsRejected, postDrugsCategoryFulfilled, postDrugsCategoryRejected, getIntelliscenseSearchFulfilled, getIntelliscenseSearchRejected, getCategoryClassesFulfilled, getCategoryClassesRejected, postDrugsClassCategoryOverrideFulfilled, postDrugsClassCategoryOverrideRejected } from "./categoryClassReducers";

const categoryClassState: any = {
  classificationSystems: {},
  categoryData: {},
  isLoading: false,
  intelliscenseData: {},
  categoryClassData: {},
  overrideResponse: {}
}
  

export const categoryClassSlice = createSlice({
  name: "categoryClass",
  initialState: categoryClassState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getClassificationSystems.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getClassificationSystems.fulfilled, (state, action) => {
      getClassificationSystemsFulfilled(state, action);
    }),
    builder.addCase(getClassificationSystems.rejected, (state, action) => {
      getClassificationSystemsRejected(state, action);
    }),
    builder.addCase(postDrugsCategory.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postDrugsCategory.fulfilled, (state, action) => {
      postDrugsCategoryFulfilled(state, action);
    }),
    builder.addCase(postDrugsCategory.rejected, (state, action) => {
      postDrugsCategoryRejected(state, action);
    }),
    builder.addCase(getIntelliscenseSearch.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getIntelliscenseSearch.fulfilled, (state, action) => {
      getIntelliscenseSearchFulfilled(state, action);
    }),
    builder.addCase(getIntelliscenseSearch.rejected, (state, action) => {
      getIntelliscenseSearchRejected(state, action);
    }),
    builder.addCase(getCategoryClasses.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getCategoryClasses.fulfilled, (state, action) => {
      getCategoryClassesFulfilled(state, action);
    }),
    builder.addCase(getCategoryClasses.rejected, (state, action) => {
      getCategoryClassesRejected(state, action);
    }),
    builder.addCase(postDrugsClassCategoryOverride.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postDrugsClassCategoryOverride.fulfilled, (state, action) => {
      postDrugsClassCategoryOverrideFulfilled(state, action);
    }),
    builder.addCase(postDrugsClassCategoryOverride.rejected, (state, action) => {
      postDrugsClassCategoryOverrideRejected(state, action);
    })
  )
});