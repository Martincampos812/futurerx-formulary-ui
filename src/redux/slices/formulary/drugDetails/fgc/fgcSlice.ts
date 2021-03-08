import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsFGCTiers, postApplyFGCDrug } from "./fgcActionCreation";
import {
  getFGCFulfilled,
  getFGCRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./fgcReducers";

const fgcState: any = {
  data: {},
  isLoading: false,
};

export const fgcSlice = createSlice({
  name: "fgcData",
  initialState: fgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsFGCTiers.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsFGCTiers.fulfilled, (state, action) => {
      getFGCFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsFGCTiers.rejected, (state, action) => {
      getFGCRejected(state, action);
    })
  ),
});
export const fgcApplyDrugSlice = createSlice({
  name: "fgcApplyDrug",
  initialState: fgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postApplyFGCDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postApplyFGCDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postApplyFGCDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
