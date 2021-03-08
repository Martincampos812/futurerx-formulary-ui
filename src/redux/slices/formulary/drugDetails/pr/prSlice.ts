import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsPRSummary,
  getPRSettings,
  getDrugDetailsPRList,
  postRemovePRDrug,
  postReplacePRDrug,
} from "./prActionCreation";
import {
  getPRSummaryFulfilled,
  getPRSummaryRejected,
  getPRSettingsFulfilled,
  getPRSettingsRejected,
  postPRListFulfilled,
  postPRListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./prReducers";

const prState: any = {
  data: {},
  isLoading: false,
};

export const prSlice = createSlice({
  name: "prSummary",
  initialState: prState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPRSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPRSummary.fulfilled, (state, action) => {
      getPRSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPRSummary.rejected, (state, action) => {
      getPRSummaryRejected(state, action);
    })
  ),
});

export const prSettingsSlice = createSlice({
  name: "prSettings",
  initialState: prState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getPRSettings.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getPRSettings.fulfilled, (state, action) => {
      getPRSettingsFulfilled(state, action);
    }),
    builder.addCase(getPRSettings.rejected, (state, action) => {
      getPRSettingsRejected(state, action);
    })
  ),
});

export const prListSlice = createSlice({
  name: "prDrugList",
  initialState: prState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPRList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPRList.fulfilled, (state, action) => {
      postPRListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPRList.rejected, (state, action) => {
      postPRListRejected(state, action);
    })
  ),
});

export const prRemoveDrugSlice = createSlice({
  name: "prRemoveDrug",
  initialState: prState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemovePRDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemovePRDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemovePRDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const prReplaceDrugSlice = createSlice({
  name: "prReplaceDrug",
  initialState: prState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplacePRDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplacePRDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplacePRDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
