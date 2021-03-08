import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsFFFSummary,
  getDrugDetailsFFFList,
  postRemoveFFFDrug,
  postReplaceFFFDrug,
} from "./fffActionCreation";
import {
  getFFFSummaryFulfilled,
  getFFFSummaryRejected,
  postFFFListFulfilled,
  postFFFListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./fffReducers";

const fffState: any = {
  data: {},
  isLoading: false,
};

export const fffSlice = createSlice({
  name: "fffSummary",
  initialState: fffState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsFFFSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsFFFSummary.fulfilled, (state, action) => {
      getFFFSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsFFFSummary.rejected, (state, action) => {
      getFFFSummaryRejected(state, action);
    })
  ),
});

export const fffListSlice = createSlice({
  name: "fffDrugList",
  initialState: fffState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsFFFList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsFFFList.fulfilled, (state, action) => {
      postFFFListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsFFFList.rejected, (state, action) => {
      postFFFListRejected(state, action);
    })
  ),
});

// postRemoveDrug
export const fffRemoveDrugSlice = createSlice({
  name: "fffRemoveDrug",
  initialState: fffState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveFFFDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveFFFDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveFFFDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

// postReplaceDrug
export const fffReplaceDrugSlice = createSlice({
  name: "fffReplaceDrug",
  initialState: fffState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceFFFDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceFFFDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceFFFDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
