import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsPGCSummary,
  getDrugDetailsPGCList,
  getExcludedDrugsPGCList,
  postRemovePGCDrug,
  postReplacePGCDrug,
} from "./pgcActionCreation";
import {
  getPGCSummaryFulfilled,
  getPGCSummaryRejected,
  postPGCListFulfilled,
  postPGCListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./pgcReducers";

const pgcState: any = {
  data: {},
  isLoading: false,
};

export const pgcSlice = createSlice({
  name: "pgcSummary",
  initialState: pgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPGCSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPGCSummary.fulfilled, (state, action) => {
      getPGCSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPGCSummary.rejected, (state, action) => {
      getPGCSummaryRejected(state, action);
    })
  ),
});

export const pgcListSlice = createSlice({
  name: "pgcDrugList",
  initialState: pgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPGCList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPGCList.fulfilled, (state, action) => {
      postPGCListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPGCList.rejected, (state, action) => {
      postPGCListRejected(state, action);
    })
  ),
});

export const pgcListExcludedSlice = createSlice({
  name: "pgcDrugListExcluded",
  initialState: pgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getExcludedDrugsPGCList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getExcludedDrugsPGCList.fulfilled, (state, action) => {
      postPGCListFulfilled(state, action);
    }),
    builder.addCase(getExcludedDrugsPGCList.rejected, (state, action) => {
      postPGCListRejected(state, action);
    })
  ),
});

export const pgcReplaceDrugSlice = createSlice({
  name: "pgcReplaceDrug",
  initialState: pgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplacePGCDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplacePGCDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplacePGCDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const pgcRemoveDrugSlice = createSlice({
  name: "pgcRemoveDrug",
  initialState: pgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemovePGCDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemovePGCDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemovePGCDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
