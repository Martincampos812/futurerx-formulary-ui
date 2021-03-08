import {createSlice} from "@reduxjs/toolkit";

import { postHpmsReports, postStandardReports } from "./hpmsActionCreation";

import { getHpmsReportsRejected,getHpmsReportsFulfilled,
  getStandardReportsRejected,getStandardReportsFulfilled } from "./hpmsReducers";

const hpmsState: any = {
  data: {},
  hpmsReports:{},
  standardReports: {},
  isLoading: false,
}
  

export const hpmsSlice = createSlice({
  name: "hpms",
  initialState: hpmsState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(postHpmsReports.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postHpmsReports.fulfilled, (state, action) => {
      getHpmsReportsFulfilled(state, action);
    }),
    builder.addCase(postHpmsReports.rejected, (state, action) => {
      getHpmsReportsRejected(state, action);
    }),
    builder.addCase(postStandardReports.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postStandardReports.fulfilled, (state, action) => {
      getStandardReportsFulfilled(state, action);
    }),
    builder.addCase(postStandardReports.rejected, (state, action) => {
      getStandardReportsRejected(state, action);
    })
  )
});
