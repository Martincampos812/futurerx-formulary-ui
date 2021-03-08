import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsHISummary,
  getDrugDetailsHIList,
  postReplaceHIDrug,
  postRemoveHIDrug,
} from "./hiActionCreation";
import {
  getHISummaryFulfilled,
  getHISummaryRejected,
  postHIListFulfilled,
  postHIListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./hiReducers";

const hiState: any = {
  data: {},
  isLoading: false,
};

export const hiSlice = createSlice({
  name: "hiSummary",
  initialState: hiState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsHISummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsHISummary.fulfilled, (state, action) => {
      getHISummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsHISummary.rejected, (state, action) => {
      getHISummaryRejected(state, action);
    })
  ),
});

export const hiListSlice = createSlice({
  name: "hiDrugList",
  initialState: hiState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsHIList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsHIList.fulfilled, (state, action) => {
      postHIListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsHIList.rejected, (state, action) => {
      postHIListRejected(state, action);
    })
  ),
});

// postReplaceDrug
export const hiReplaceDrugSlice = createSlice({
  name: "hiReplaceDrug",
  initialState: hiState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceHIDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceHIDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceHIDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

// postRemoveDrug
export const hiRemoveDrugSlice = createSlice({
  name: "hiRemoveDrug",
  initialState: hiState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveHIDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveHIDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveHIDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
