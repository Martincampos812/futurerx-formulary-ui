import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsAFSummary,
  getDrugDetailsAFList,
  postRemoveAFDrug,
  postReplaceAFDrug,
} from "./afActionCreation";
import {
  getAFSummaryFulfilled,
  getAFSummaryRejected,
  postAFListFulfilled,
  postAFListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./afReducers";

const afState: any = {
  data: {},
  isLoading: false,
};

export const afSlice = createSlice({
  name: "afSummary",
  initialState: afState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsAFSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsAFSummary.fulfilled, (state, action) => {
      getAFSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsAFSummary.rejected, (state, action) => {
      getAFSummaryRejected(state, action);
    })
  ),
});

export const afListSlice = createSlice({
  name: "afDrugList",
  initialState: afState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsAFList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsAFList.fulfilled, (state, action) => {
      postAFListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsAFList.rejected, (state, action) => {
      postAFListRejected(state, action);
    })
  ),
});

export const afReplaceDrugSlice = createSlice({
  name: "afReplaceDrug",
  initialState: afState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceAFDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceAFDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceAFDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const afRemoveDrugSlice = createSlice({
  name: "afRemoveDrug",
  initialState: afState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveAFDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveAFDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveAFDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
