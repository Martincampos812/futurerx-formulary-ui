import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsPNSummary,
  getDrugDetailsPNList,
  postPNCriteriaList,
  postRemovePNDrug,
  postReplacePNDrug,
} from "./pnActionCreation";
import {
  getPNSummaryFulfilled,
  getPNSummaryRejected,
  postPNListFulfilled,
  postPNListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./pnReducers";

const pnState: any = {
  data: {},
  isLoading: false,
};

export const pnSlice = createSlice({
  name: "pnSummary",
  initialState: pnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPNSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPNSummary.fulfilled, (state, action) => {
      getPNSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPNSummary.rejected, (state, action) => {
      getPNSummaryRejected(state, action);
    })
  ),
});

export const pnListSlice = createSlice({
  name: "pnDrugList",
  initialState: pnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPNList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPNList.fulfilled, (state, action) => {
      postPNListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPNList.rejected, (state, action) => {
      postPNListRejected(state, action);
    })
  ),
});

export const pnCriteriaSlice = createSlice({
  name: "pnCriteriaList",
  initialState: pnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postPNCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postPNCriteriaList.fulfilled, (state, action) => {
      getPNSummaryFulfilled(state, action);
    }),
    builder.addCase(postPNCriteriaList.rejected, (state, action) => {
      getPNSummaryRejected(state, action);
    })
  ),
});

export const pnRemoveDrugSlice = createSlice({
  name: "pnRemoveDrug",
  initialState: pnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemovePNDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemovePNDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemovePNDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const pnReplaceDrugSlice = createSlice({
  name: "pnReplaceDrug",
  initialState: pnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplacePNDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplacePNDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplacePNDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
