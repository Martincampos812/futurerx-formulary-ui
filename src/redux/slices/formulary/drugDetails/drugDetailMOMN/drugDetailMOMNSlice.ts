import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsMOMNSummary,
  getDrugDetailsMOList,
  postReplaceMONMDrug,
  postRemoveMONMDrug,
} from "./drugDetailMOMNActionCreation";
import {
  getMOMNSummaryFulfilled,
  getMOMNSummaryRejected,
  postMOListFulfilled,
  postMOListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./drugDetailMOMNReducers";

const momnState: any = {
  data: {},
  isLoading: false,
};

export const momnSlice = createSlice({
  name: "momnSummary",
  initialState: momnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsMOMNSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsMOMNSummary.fulfilled, (state, action) => {
      getMOMNSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsMOMNSummary.rejected, (state, action) => {
      getMOMNSummaryRejected(state, action);
    })
  ),
});

// getDrugDetailsMOList
export const moListSlice = createSlice({
  name: "moDrugList",
  initialState: momnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsMOList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsMOList.fulfilled, (state, action) => {
      postMOListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsMOList.rejected, (state, action) => {
      postMOListRejected(state, action);
    })
  ),
});

export const momnReplaceDrugSlice = createSlice({
  name: "momnReplaceDrug",
  initialState: momnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceMONMDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceMONMDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceMONMDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const momnRemoveDrugSlice = createSlice({
  name: "momnRemoveDrug",
  initialState: momnState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveMONMDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveMONMDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveMONMDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
