import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsSSMSummary,
  getDrugDetailsSSMList,
  getSSMCriteriaList,
  postRemoveSSMDrug,
  postReplaceSSMDrug,
} from "./ssmActionCreation";
import {
  getSSMSummaryFulfilled,
  getSSMSummaryRejected,
  postSSMListFulfilled,
  postSSMListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./ssmReducers";

const ssmState: any = {
  data: {},
  isLoading: false,
};

export const ssmSlice = createSlice({
  name: "ssmSummary",
  initialState: ssmState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsSSMSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsSSMSummary.fulfilled, (state, action) => {
      getSSMSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsSSMSummary.rejected, (state, action) => {
      getSSMSummaryRejected(state, action);
    })
  ),
});

export const ssmListSlice = createSlice({
  name: "ssmDrugList",
  initialState: ssmState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsSSMList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsSSMList.fulfilled, (state, action) => {
      postSSMListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsSSMList.rejected, (state, action) => {
      postSSMListRejected(state, action);
    })
  ),
});

export const ssmReplaceDrugSlice = createSlice({
  name: "ssmReplaceDrug",
  initialState: ssmState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceSSMDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceSSMDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceSSMDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const ssmCriteriaSlice = createSlice({
  name: "ssmCriteriaList",
  initialState: ssmState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getSSMCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getSSMCriteriaList.fulfilled, (state, action) => {
      getSSMSummaryFulfilled(state, action);
    }),
    builder.addCase(getSSMCriteriaList.rejected, (state, action) => {
      getSSMSummaryRejected(state, action);
    })
  ),
});

export const ssmRemoveDrugSlice = createSlice({
  name: "ssmRemoveDrug",
  initialState: ssmState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveSSMDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveSSMDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveSSMDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
