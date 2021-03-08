import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsPOSSummary,
  getDrugDetailsPOSSettings,
  getDrugDetailsPOSGridData,
  postPOSCriteriaList,
  postRemovePOSDrug,
  postReplacePOSDrug,
} from "./posActionCreation";
import {
  getPOSSummaryFulfilled,
  getPOSSummaryRejected,
  getPOSSettingsFulfilled,
  getPOSSettingsRejected,
  postPOSListFulfilled,
  postPOSListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./posReducers";

const posState: any = {
  data: {},
  isLoading: false,
};

export const posSlice = createSlice({
  name: "posSummary",
  initialState: posState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPOSSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPOSSummary.fulfilled, (state, action) => {
      getPOSSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPOSSummary.rejected, (state, action) => {
      getPOSSummaryRejected(state, action);
    })
  ),
});

export const posSettingsSlice = createSlice({
  name: "posSettings",
  initialState: posState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPOSSettings.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPOSSettings.fulfilled, (state, action) => {
      getPOSSettingsFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPOSSettings.rejected, (state, action) => {
      getPOSSettingsRejected(state, action);
    })
  ),
});

export const posListSlice = createSlice({
  name: "posDrugList",
  initialState: posState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPOSGridData.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPOSGridData.fulfilled, (state, action) => {
      postPOSListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPOSGridData.rejected, (state, action) => {
      postPOSListRejected(state, action);
    })
  ),
});

export const posCriteriaSlice = createSlice({
  name: "posCriteriaList",
  initialState: posState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postPOSCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postPOSCriteriaList.fulfilled, (state, action) => {
      getPOSSummaryFulfilled(state, action);
    }),
    builder.addCase(postPOSCriteriaList.rejected, (state, action) => {
      getPOSSummaryRejected(state, action);
    })
  ),
});

export const posRemoveDrugSlice = createSlice({
  name: "posRemoveDrug",
  initialState: posState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemovePOSDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemovePOSDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemovePOSDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const posReplaceDrugSlice = createSlice({
  name: "posReplaceDrug",
  initialState: posState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplacePOSDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplacePOSDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplacePOSDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
