import { createSlice } from "@reduxjs/toolkit";

import {
  getQlSummary,
  // getQlGrouptDescriptionVersions,
  // getQlGrouptDescription,
} from "./qlActionCreation";

import {
  getQlFulfilled,
  getQlRejected,
  getVersionFulfilled,
  getVersionRejected,
  getQlDescriptionFulfilled,
  getQlDescriptionRejected,
} from "./qlReducers";

const qlState: any = {
  data: {},
  isLoading: false,
  paVersion: {},
  description: {},
};

// export const paSlice = createSlice({
//   name: "paSummary",
//   initialState: qlState,
//   reducers: {},
//   extraReducers: (builder) => (
//     builder.addCase(getPaSummary.pending, (state, action) => {
//       state.isLoading = true;
//     }),
//     builder.addCase(getPaSummary.fulfilled, (state, action) => {
//       getQlFulfilled(state, action);
//     }),
//     builder.addCase(getPaSummary.rejected, (state, action) => {
//       getQlRejected(state, action);
//     }),
//     builder.addCase(getPaGrouptDescription.pending, (state, action) => {
//       state.isLoading = true;
//     }),
//     builder.addCase(getPaGrouptDescription.fulfilled, (state, action) => {
//       getQlDescriptionFulfilled(state, action);
//     }),
//     builder.addCase(getPaGrouptDescription.rejected, (state, action) => {
//       getQlDescriptionRejected(state, action);
//     })
//   ),
// });

// ql

export const qlSlice = createSlice({
  name: "qlSummary",
  initialState: qlState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getQlSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getQlSummary.fulfilled, (state, action) => {
      getQlFulfilled(state, action);
    }),
    builder.addCase(getQlSummary.rejected, (state, action) => {
      getQlRejected(state, action);
    })
    // builder.addCase(getQlGrouptDescription.pending, (state, action) => {
    //   state.isLoading = true;
    // }),
    // builder.addCase(getQlGrouptDescription.fulfilled, (state, action) => {
    //   getQlDescriptionFulfilled(state, action);
    // }),
    // builder.addCase(getQlGrouptDescription.rejected, (state, action) => {
    //   getQlDescriptionRejected(state, action);
    // })
  ),
});

//

// export const paVersionSlice = createSlice({
//   name: "version",
//   initialState: qlState,
//   reducers: {},
//   extraReducers: (builder) => (
//     builder.addCase(getQlGrouptDescriptionVersions.pending, (state, action) => {
//       state.isLoading = true;
//     }),
//     builder.addCase(
//       getQlGrouptDescriptionVersions.fulfilled,
//       (state, action) => {
//         getVersionFulfilled(state, action);
//       }
//     ),
//     builder.addCase(
//       getQlGrouptDescriptionVersions.rejected,
//       (state, action) => {
//         getVersionRejected(state, action);
//       }
//     )
//   ),
// });
