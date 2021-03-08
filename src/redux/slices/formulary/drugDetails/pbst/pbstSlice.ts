import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsPBSTSummary,
  getDrugDetailsPBSTList,
  postRemovePBSTDrug,
  postReplacePBSTDrug,
} from "./pbstActionCreation";
import {
  getPBSTSummaryFulfilled,
  getPBSTSummaryRejected,
  postPBSTListFulfilled,
  postPBSTListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./pbstReducers";

const pbstState: any = {
  data: {},
  isLoading: false,
};

export const pbstSlice = createSlice({
  name: "pbstSummary",
  initialState: pbstState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPBSTSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPBSTSummary.fulfilled, (state, action) => {
      getPBSTSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPBSTSummary.rejected, (state, action) => {
      getPBSTSummaryRejected(state, action);
    })
  ),
});

export const pbstListSlice = createSlice({
  name: "pbstDrugList",
  initialState: pbstState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPBSTList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPBSTList.fulfilled, (state, action) => {
      postPBSTListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPBSTList.rejected, (state, action) => {
      postPBSTListRejected(state, action);
    })
  ),
});

export const pbstReplaceDrugSlice = createSlice({
  name: "pbstReplaceDrug",
  initialState: pbstState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplacePBSTDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplacePBSTDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplacePBSTDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const pbstRemoveDrugSlice = createSlice({
  name: "pbstRemoveDrug",
  initialState: pbstState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemovePBSTDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemovePBSTDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemovePBSTDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
