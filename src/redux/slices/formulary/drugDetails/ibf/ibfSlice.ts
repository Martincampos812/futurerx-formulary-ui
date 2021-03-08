import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsIBFSummary,
  getDrugDetailsIBFList,
  getIBFCuids,
  postReplaceIBFDrug,
  postRemoveIBFDrug,
  getIBFCriteriaList,
} from "./ibfActionCreation";
import {
  getIBFSummaryFulfilled,
  getIBFSummaryRejected,
  postIBFListFulfilled,
  postIBFListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./ibfReducers";

const ibfState: any = {
  data: {},
  isLoading: false,
};

export const ibfSlice = createSlice({
  name: "ibfSummary",
  initialState: ibfState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsIBFSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsIBFSummary.fulfilled, (state, action) => {
      getIBFSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsIBFSummary.rejected, (state, action) => {
      getIBFSummaryRejected(state, action);
    })
  ),
});

export const ibfCuids = createSlice({
  name: "ibfCuids",
  initialState: ibfState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getIBFCuids.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getIBFCuids.fulfilled, (state, action) => {
      getIBFSummaryFulfilled(state, action);
    }),
    builder.addCase(getIBFCuids.rejected, (state, action) => {
      getIBFSummaryRejected(state, action);
    })
  ),
});

export const ibfListSlice = createSlice({
  name: "ibfDrugList",
  initialState: ibfState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsIBFList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsIBFList.fulfilled, (state, action) => {
      postIBFListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsIBFList.rejected, (state, action) => {
      postIBFListRejected(state, action);
    })
  ),
});

export const ibfCriteriaSlice = createSlice({
  name: "ibfCriteriaList",
  initialState: ibfState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getIBFCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getIBFCriteriaList.fulfilled, (state, action) => {
      postIBFListFulfilled(state, action);
    }),
    builder.addCase(getIBFCriteriaList.rejected, (state, action) => {
      postIBFListRejected(state, action);
    })
  ),
});

export const ibfReplaceDrugSlice = createSlice({
  name: "ibfReplaceDrug",
  initialState: ibfState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceIBFDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceIBFDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceIBFDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const ibfRemoveDrugSlice = createSlice({
  name: "ibfRemoveDrug",
  initialState: ibfState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveIBFDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveIBFDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveIBFDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
