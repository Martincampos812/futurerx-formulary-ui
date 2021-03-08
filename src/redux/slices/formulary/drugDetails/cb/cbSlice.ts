import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsCBSummary,
  getExcludedDrugsCBList,
  getCBCriteriaList,
  postRemoveCBDrug,
  postReplaceCBDrug,
} from "./cbActionCreation";
import {
  getCBSummaryFulfilled,
  getCBSummaryRejected,
  postCBListFulfilled,
  postCBListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./cbReducers";

const cbState: any = {
  data: {},
  isLoading: false,
};

export const cbSlice = createSlice({
  name: "cbSummary",
  initialState: cbState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsCBSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsCBSummary.fulfilled, (state, action) => {
      getCBSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsCBSummary.rejected, (state, action) => {
      getCBSummaryRejected(state, action);
    })
  ),
});

export const cbListExcludedSlice = createSlice({
  name: "cbDrugListExcluded",
  initialState: cbState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getExcludedDrugsCBList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getExcludedDrugsCBList.fulfilled, (state, action) => {
      postCBListFulfilled(state, action);
    }),
    builder.addCase(getExcludedDrugsCBList.rejected, (state, action) => {
      postCBListRejected(state, action);
    })
  ),
});

export const cbReplaceDrugSlice = createSlice({
  name: "cbReplaceDrug",
  initialState: cbState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceCBDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceCBDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceCBDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const cbCriteriaSlice = createSlice({
  name: "cbCriteriaList",
  initialState: cbState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getCBCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getCBCriteriaList.fulfilled, (state, action) => {
      getCBSummaryFulfilled(state, action);
    }),
    builder.addCase(getCBCriteriaList.rejected, (state, action) => {
      getCBSummaryRejected(state, action);
    })
  ),
});

export const cbRemoveDrugSlice = createSlice({
  name: "cbRemoveDrug",
  initialState: cbState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveCBDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveCBDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveCBDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
