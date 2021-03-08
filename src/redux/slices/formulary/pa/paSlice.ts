import { createSlice } from "@reduxjs/toolkit";

import {
  getPaSummary,
  getPaGrouptDescriptionVersions,
  getPaGrouptDescription,
  getPaGrouptDescriptions,
} from "./paActionCreation";

import {
  getPaFulfilled,
  getPaRejected,
  getVersionFulfilled,
  getVersionRejected,
  getPaDescriptionFulfilled,
  getPaDescriptionRejected,
  getPaDescriptionsFulfilled,
  getPaDescriptionsRejected,
} from "./paReducers";

const paState: any = {
  data: {},
  isLoading: false,
  paVersion: {},
  description: {},
  descriptions: {},
};

export const paSlice = createSlice({
  name: "paSummary",
  initialState: paState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getPaSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getPaSummary.fulfilled, (state, action) => {
      getPaFulfilled(state, action);
    }),
    builder.addCase(getPaSummary.rejected, (state, action) => {
      getPaRejected(state, action);
    }),
    builder.addCase(getPaGrouptDescription.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getPaGrouptDescription.fulfilled, (state, action) => {
      getPaDescriptionFulfilled(state, action);
    }),
    builder.addCase(getPaGrouptDescription.rejected, (state, action) => {
      getPaDescriptionRejected(state, action);
    }),
    builder.addCase(getPaGrouptDescriptions.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getPaGrouptDescriptions.fulfilled, (state, action) => {
      getPaDescriptionsFulfilled(state, action);
    }),
    builder.addCase(getPaGrouptDescriptions.rejected, (state, action) => {
      getPaDescriptionsRejected(state, action);
    })
  ),
});

export const paVersionSlice = createSlice({
  name: "version",
  initialState: paState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getPaGrouptDescriptionVersions.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(
      getPaGrouptDescriptionVersions.fulfilled,
      (state, action) => {
        getVersionFulfilled(state, action);
      }
    ),
    builder.addCase(
      getPaGrouptDescriptionVersions.rejected,
      (state, action) => {
        getVersionRejected(state, action);
      }
    )
  ),
});
