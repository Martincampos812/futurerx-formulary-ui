import {createSlice} from "@reduxjs/toolkit";

import { getTier, postTierApplyInfo, getTierLabels, postNewTier,getMaintenanceFormularyTiers } from "./tierActionCreation";
import { getTierFulfilled,getTierRejected,postTierApplyFulfilled,postTierApplyRejected,
  getTierLabelFulfilled,getTierLabelRejected,postTierNewFulfilled,postTierNewRejected,
getMaintenanceFormularyTiersFulfilled,getMaintenanceFormularyTiersRejected} from "./tierReducers";
  
const tierState: any = {
  data: {},
  isLoading: false,
  applyData: {}, 
  tierLabels: {},
  tierAddNewResponse: {},
  maintenanceFormularyTiers:{}
}
  

export const tierSlice = createSlice({
  name: "tier",
  initialState: tierState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getTier.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getTier.fulfilled, (state, action) => {
      getTierFulfilled(state, action);
    }),
    builder.addCase(getTier.rejected, (state, action) => {
      getTierRejected(state, action);
    }),
    builder.addCase(postTierApplyInfo.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postTierApplyInfo.fulfilled, (state, action) => {
      postTierApplyFulfilled(state, action);
    }),
    builder.addCase(postTierApplyInfo.rejected, (state, action) => {
      postTierApplyRejected(state, action);
    }),
    builder.addCase(getTierLabels.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getTierLabels.fulfilled, (state, action) => {
      getTierLabelFulfilled(state, action);
    }),
    builder.addCase(getTierLabels.rejected, (state, action) => {
      getTierLabelRejected(state, action);
    }),
    builder.addCase(postNewTier.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postNewTier.fulfilled, (state, action) => {
      postTierNewFulfilled(state, action);
    }),
    builder.addCase(postNewTier.rejected, (state, action) => {
      postTierNewRejected(state, action);
    }),
    builder.addCase(getMaintenanceFormularyTiers.fulfilled, (state, action) => {
      getMaintenanceFormularyTiersFulfilled(state, action);
    }),
    builder.addCase(getMaintenanceFormularyTiers.rejected, (state, action) => {
      getMaintenanceFormularyTiersFulfilled(state, action);
    })
  )
});