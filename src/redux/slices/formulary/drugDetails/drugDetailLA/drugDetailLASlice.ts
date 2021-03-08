import { createSlice } from "@reduxjs/toolkit";

import {
  getDrugDetailsLASummary,
  getDrugDetailsLAList,
  postReplaceLADrug,
  postRemoveLADrug,
} from "./drugDetailLAActionCreation";
import {
  getLaSummaryFulfilled,
  getLaSummaryRejected,
  postLAListFulfilled,
  postLAListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./drugDetailLAReducers";

const laState: any = {
  data: {},
  isLoading: false,
  replaceLADrug: {},
};

const lalistState: any = {
  data: {},
  isLoading: false,
};

export const laSlice = createSlice({
  name: "laSummary",
  initialState: laState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsLASummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsLASummary.fulfilled, (state, action) => {
      getLaSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsLASummary.rejected, (state, action) => {
      getLaSummaryRejected(state, action);
    })
  ),
});

// getDrugDetailsLAList
export const laListSlice = createSlice({
  name: "laDrugList",
  initialState: lalistState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsLAList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsLAList.fulfilled, (state, action) => {
      postLAListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsLAList.rejected, (state, action) => {
      postLAListRejected(state, action);
    })
  ),
});

// postReplaceDrug
export const laReplaceDrugSlice = createSlice({
  name: "laReplaceDrug",
  initialState: laState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceLADrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceLADrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceLADrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

// postRemoveDrug
export const laRemoveDrugSlice = createSlice({
  name: "laRemoveDrug",
  initialState: laState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveLADrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveLADrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveLADrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
