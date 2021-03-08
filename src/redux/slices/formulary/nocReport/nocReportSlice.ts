import { createSlice } from "@reduxjs/toolkit";

import
    {
        getNocReportData
} from "./nocReportActionCreation";
import {
    getNocFulfilled,
    getNocRejected,
    
} from "./nocReportReducer";
  
const paState: any = {
  
    
  data: [
    {
      id: 1,
      key: 1,
      drugName: "drug name",
      descriptionOfChange: "drug added",
      reasonforchange: "new reason",
      changeType: "positive change",
      alternativeDrugName: "",
      costShareType: "",
    },
    {
      id: 2,
      key: 2,
      drugName: "drug name",
      descriptionOfChange: "drug added",
      reasonforchange: "new reason",
      changeType: "positive change",
      alternativeDrugName: "",
      costShareType: "",
    },
    {
      id: 3,
      key: 3,
      drugName: "drug name",
      descriptionOfChange: "drug added",
      reasonforchange: "new reason",
      changeType: "positive change",
      alternativeDrugName: "",
      costShareType: "",
    },
    {
      id: 4,
      key: 4,
      drugName: "drug name",
      descriptionOfChange: "drug added",
      reasonforchange: "new reason",
      changeType: "positive change",
      alternativeDrugName: "",
      costShareType: "",
    },
    {
      id: 5,
      key: 5,
      drugName: "drug name",
      descriptionOfChange: "drug added",
      reasonforchange: "new reason",
      changeType: "positive change",
      alternativeDrugName: "",
      costShareType: "",
    },
    {
      id: 6,
      key: 6,
      drugName: "drug name",
      descriptionOfChange: "drug added",
      reasonforchange: "new reason",
      changeType: "positive change",
      alternativeDrugName: "",
      costShareType: "",
    },
  ],
   
    
    isLoading: false,
    
  };
  
  export const nocReportSlice = createSlice({
    name: "nocReport",
    initialState: paState,
    reducers: {},
    extraReducers: (builder) => (
      // builder.addCase(getNocReportData.pending, (state, action) => {
      //   state.isLoading = true;
      // }),
      builder.addCase(getNocReportData.fulfilled, (state, action) => {
        getNocFulfilled(state, action);
      }),
      builder.addCase(getNocReportData.rejected, (state, action) => {
        getNocRejected(state, action);
      })
    ),
    
  });