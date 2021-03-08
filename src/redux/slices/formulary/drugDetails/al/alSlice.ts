import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsALSummary,
  getDrugDetailsALList,
  postReplaceALDrug,
  getALCriteriaList,
  postRemoveALDrug,
} from "./alActionCreation";
import {
  getALSummaryFulfilled,
  getALSummaryRejected,
  postALListFulfilled,
  postALListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./alReducers";

const alState: any = {
  data: {},
  isLoading: false,
};

export const alSlice = createSlice({
  name: "alSummary",
  initialState: alState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsALSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsALSummary.fulfilled, (state, action) => {
      getALSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsALSummary.rejected, (state, action) => {
      getALSummaryRejected(state, action);
    })
  ),
});

export const alListSlice = createSlice({
  name: "alDrugList",
  initialState: alState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsALList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsALList.fulfilled, (state, action) => {
      postALListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsALList.rejected, (state, action) => {
      postALListRejected(state, action);
    })
  ),
});

export const alReplaceDrugSlice = createSlice({
  name: "alReplaceDrug",
  initialState: alState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceALDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceALDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceALDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const alCriteriaSlice = createSlice({
  name: "alCriteriaList",
  initialState: alState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getALCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getALCriteriaList.fulfilled, (state, action) => {
      getALSummaryFulfilled(state, action);
    }),
    builder.addCase(getALCriteriaList.rejected, (state, action) => {
      getALSummaryRejected(state, action);
    })
  ),
});

export const alRemoveDrugSlice = createSlice({
  name: "alRemoveDrug",
  initialState: alState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveALDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveALDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveALDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
