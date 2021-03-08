import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsPTSummary,
  getPTDrugList,
  postPTCriteriaList,
  postRemovePTDrug,
  postReplacePTDrug,
} from "./ptActionCreation";
import {
  getPTSummaryFulfilled,
  getPTSummaryRejected,
  postPTListFulfilled,
  postPTListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./ptReducers";

const ptState: any = {
  data: {},
  isLoading: false,
};

export const ptSlice = createSlice({
  name: "ptSummary",
  initialState: ptState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPTSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPTSummary.fulfilled, (state, action) => {
      getPTSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPTSummary.rejected, (state, action) => {
      getPTSummaryRejected(state, action);
    })
  ),
});

export const ptListSlice = createSlice({
  name: "ptDrugList",
  initialState: ptState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getPTDrugList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getPTDrugList.fulfilled, (state, action) => {
      postPTListFulfilled(state, action);
    }),
    builder.addCase(getPTDrugList.rejected, (state, action) => {
      postPTListRejected(state, action);
    })
  ),
});

export const ptCriteriaSlice = createSlice({
  name: "ptCriteriaList",
  initialState: ptState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postPTCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postPTCriteriaList.fulfilled, (state, action) => {
      getPTSummaryFulfilled(state, action);
    }),
    builder.addCase(postPTCriteriaList.rejected, (state, action) => {
      getPTSummaryRejected(state, action);
    })
  ),
});

export const ptRemoveDrugSlice = createSlice({
  name: "ptRemoveDrug",
  initialState: ptState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemovePTDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemovePTDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemovePTDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const ptReplaceDrugSlice = createSlice({
  name: "ptReplaceDrug",
  initialState: ptState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplacePTDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplacePTDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplacePTDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
