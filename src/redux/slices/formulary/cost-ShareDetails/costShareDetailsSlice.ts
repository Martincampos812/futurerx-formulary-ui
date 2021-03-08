import { createSlice } from "@reduxjs/toolkit";

import
    {
        getCostShareDetailsData
} from "./costShareDetailsActionCreation";
import {
    getDetailsFulfilled,
    getDetailsRejected,
    
} from "./costShareDetailsReducer";
  
const paState: any = {
  
    
  data: [
    {
      tierNumber: "Tier 0",
      tierDescription: "Tier Description",
      costShare: "Copay",
      costVal: "Copay",
    },
    {
      tierNumber: "Tier 1",
      tierDescription: "Tier Description",
      costShare: "Co-Insurance",
      costVal: "Co-Insurance",
    },
    {
      tierNumber: "Tier 2",
      tierDescription: "Tier Description",
      costShare: "Copay",
      costVal: "Copay",
    },
    {
      tierNumber: "Tier 3",
      tierDescription: "Tier Description",
      costShare: "Copay",
      costVal: "Copay",
    },
    {
      tierNumber: "Tier 4",
      tierDescription: "Tier Description",
      costShare: "Co-Insurance",
      costVal: "Co-Insurance",
    },
    {
      tierNumber: "Tier 5",
      tierDescription: "Tier Description",
      costShare: "Copay",
      costVal: "Copay",
    },
    {
      tierNumber: "Tier 6",
      tierDescription: "Tier Description",
      costShare: "Copay",
      costVal: "Copay",
    },
  ],
   
    
    isLoading: false,
    
  };
  
  export const costShareDetailsSlice = createSlice({
    name: "nocReport",
    initialState: paState,
    reducers: {},
    extraReducers: (builder) => (
      // builder.addCase(getNocReportData.pending, (state, action) => {
      //   state.isLoading = true;
      // }),
      builder.addCase(getCostShareDetailsData.fulfilled, (state, action) => {
        getDetailsFulfilled(state, action);
      }),
      builder.addCase(getCostShareDetailsData.rejected, (state, action) => {
        getDetailsRejected(state, action);
      })
    ),
    
  });