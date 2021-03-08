import {createSlice} from "@reduxjs/toolkit";
import { getFormularySummary } from "./formularySummaryActionCreation";
import { FORMULARY_SUMMARY_TYPE } from "./formularySummaryModel";
import { getFormularySummaryFulfilled, getFormularySummaryRejected } from "./formularySummaryReducers";


// Init State
const formularySummaryState: FORMULARY_SUMMARY_TYPE = {
  id: -1,
  summary: {},
  isLoading: false,
}

// Slice
export const formularySummarySlice = createSlice({
  name: "formulary_summary",
  initialState: formularySummaryState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getFormularySummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getFormularySummary.fulfilled, (state, action) => {
      getFormularySummaryFulfilled(state, action);
    }),
    builder.addCase(getFormularySummary.rejected, (state, action) => {
      getFormularySummaryRejected(state, action);
    })
  )
});