import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsOTHERSummary,
  getOTHERCriteriaList,
  getDrugDetailsOtherList,
  postRemoveOtherDrug,
  postReplaceOtherDrug,
} from "./otherActionCreation";
import {
  getOTHERSummaryFulfilled,
  getOTHERSummaryRejected,
  postOTHERListFulfilled,
  postOTHERListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./otherReducers";

const otState: any = {
  data: {},
  isLoading: false,
};

export const otSlice = createSlice({
  name: "otSummary",
  initialState: otState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsOTHERSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsOTHERSummary.fulfilled, (state, action) => {
      getOTHERSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsOTHERSummary.rejected, (state, action) => {
      getOTHERSummaryRejected(state, action);
    })
  ),
});

export const otherCriteriaSlice = createSlice({
  name: "otherCriteriaList",
  initialState: otState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getOTHERCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getOTHERCriteriaList.fulfilled, (state, action) => {
      postOTHERListFulfilled(state, action);
    }),
    builder.addCase(getOTHERCriteriaList.rejected, (state, action) => {
      postOTHERListRejected(state, action);
    })
  ),
});

export const otherListSlice = createSlice({
  name: "otherDrugList",
  initialState: otState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsOtherList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsOtherList.fulfilled, (state, action) => {
      postOTHERListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsOtherList.rejected, (state, action) => {
      postOTHERListRejected(state, action);
    })
  ),
});

export const otRemoveDrugSlice = createSlice({
  name: "otRemoveDrug",
  initialState: otState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveOtherDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveOtherDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveOtherDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const otReplaceDrugSlice = createSlice({
  name: "otReplaceDrug",
  initialState: otState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceOtherDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceOtherDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceOtherDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
