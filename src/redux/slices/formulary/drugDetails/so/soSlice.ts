import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsSOSummary,
  getDrugDetailsSOList,
  getSOCriteriaList,
  postRemoveSODrug,
  postReplaceSODrug,
} from "./soActionCreation";
import {
  getSOSummaryFulfilled,
  getSOSummaryRejected,
  postSOListFulfilled,
  postSOListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./soReducers";

const soState: any = {
  data: {},
  isLoading: false,
};

export const soSlice = createSlice({
  name: "soSummary",
  initialState: soState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsSOSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsSOSummary.fulfilled, (state, action) => {
      getSOSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsSOSummary.rejected, (state, action) => {
      getSOSummaryRejected(state, action);
    })
  ),
});

export const soListSlice = createSlice({
  name: "soDrugList",
  initialState: soState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsSOList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsSOList.fulfilled, (state, action) => {
      postSOListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsSOList.rejected, (state, action) => {
      postSOListRejected(state, action);
    })
  ),
});

export const sOCriteriaList = createSlice({
  name: "soCriteriaList",
  initialState: soState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getSOCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getSOCriteriaList.fulfilled, (state, action) => {
      postSOListFulfilled(state, action);
    }),
    builder.addCase(getSOCriteriaList.rejected, (state, action) => {
      postSOListRejected(state, action);
    })
  ),
});

export const soRemoveDrugSlice = createSlice({
  name: "otRemoveDrug",
  initialState: soState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveSODrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveSODrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveSODrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const soReplaceDrugSlice = createSlice({
  name: "otReplaceDrug",
  initialState: soState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceSODrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceSODrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceSODrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
