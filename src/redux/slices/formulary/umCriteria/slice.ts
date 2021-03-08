import { createSlice } from "@reduxjs/toolkit";

import {
  postFormularyDrugUmCriterias,
  postUmCriteriasDrugs
} from "./actionCreation";

import {
  postUmCriteriasDrugsFulfilled,
  postUmCriteriasDrugsRejected,
  postUmCriteriasFulfilled,
  postUmCriteriasRejected
} from "./reducers";

const state: any = {
  umCriterias: {},
  isLoading: false,
  drugs: {},
};

export const slice = createSlice({
  name: "umCriteria",
  initialState: state,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postFormularyDrugUmCriterias.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postFormularyDrugUmCriterias.fulfilled, (state, action) => {
      postUmCriteriasFulfilled(state, action);
    }),
    builder.addCase(postFormularyDrugUmCriterias.rejected, (state, action) => {
      postUmCriteriasRejected(state, action);
    }),
    builder.addCase(postUmCriteriasDrugs.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postUmCriteriasDrugs.fulfilled, (state, action) => {
      postUmCriteriasDrugsFulfilled(state, action);
    }),
    builder.addCase(postUmCriteriasDrugs.rejected, (state, action) => {
      postUmCriteriasDrugsRejected(state, action);
    })
  ),
});
