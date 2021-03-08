import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsICDSummary,
  getDrugDetailsICDList,
  postICDCriteriaList,
  postRemoveICDDrug,
  postReplaceICDDrug,
} from "./icdActionCreation";
import {
  getICDSummaryFulfilled,
  getICDSummaryRejected,
  postICDListFulfilled,
  postICDListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./icdReducers";

const icdState: any = {
  data: {},
  isLoading: false,
};

export const icdSlice = createSlice({
  name: "icdSummary",
  initialState: icdState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsICDSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsICDSummary.fulfilled, (state, action) => {
      getICDSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsICDSummary.rejected, (state, action) => {
      getICDSummaryRejected(state, action);
    })
  ),
});

export const icdListSlice = createSlice({
  name: "icdDrugList",
  initialState: icdState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsICDList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsICDList.fulfilled, (state, action) => {
      postICDListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsICDList.rejected, (state, action) => {
      postICDListRejected(state, action);
    })
  ),
});

export const icdCriteriaSlice = createSlice({
  name: "icdCriteriaList",
  initialState: icdState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postICDCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postICDCriteriaList.fulfilled, (state, action) => {
      getICDSummaryFulfilled(state, action);
    }),
    builder.addCase(postICDCriteriaList.rejected, (state, action) => {
      getICDSummaryRejected(state, action);
    })
  ),
});

export const icdReplaceDrugSlice = createSlice({
  name: "icdReplaceDrug",
  initialState: icdState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceICDDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceICDDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceICDDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const icdRemoveDrugSlice = createSlice({
  name: "icdRemoveDrug",
  initialState: icdState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveICDDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveICDDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveICDDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
