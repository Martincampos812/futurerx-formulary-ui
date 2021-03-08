import { createSlice } from "@reduxjs/toolkit";

import
    {
      getWebAnalyticalData
} from "./webAnalyticalAction";
import {
    getWebFulfilled,
    getWebRejected,
    
} from "./webAnalyticalReducer";
  
const paState: any = {
  data: {
    
    file:"Web_Analyticsa66f9a41-5f46-4151-a60a-720d20c98582.xlsx",
    code: "200",
    message:"ok"
    },
    isLoading: false,
    
  };
  
  export const webAnalyticalSlice = createSlice({
    name: "nocReport",
    initialState: paState,
    reducers: {},
    extraReducers: (builder) => (
      builder.addCase(getWebAnalyticalData.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(getWebAnalyticalData.fulfilled, (state, action) => {
        getWebFulfilled(state, action);
      }),
      builder.addCase(getWebAnalyticalData.rejected, (state, action) => {
        getWebRejected(state, action);
      })
    ),
    
  });