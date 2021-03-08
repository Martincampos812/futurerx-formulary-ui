import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsGLSummary,
  getDrugDetailsGLList,
  postReplaceGLDrug,
  postGLCriteriaList,
  postRemoveGLDrug,
} from "./glActionCreation";
import {
  getGLSummaryFulfilled,
  getGLSummaryRejected,
  postGLListFulfilled,
  postGLListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./glReducers";

const glState: any = {
  data: {},
  isLoading: false,
};

export const glSlice = createSlice({
  name: "glSummary",
  initialState: glState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsGLSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsGLSummary.fulfilled, (state, action) => {
      getGLSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsGLSummary.rejected, (state, action) => {
      getGLSummaryRejected(state, action);
    })
  ),
});

export const glListSlice = createSlice({
  name: "glDrugList",
  initialState: glState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsGLList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsGLList.fulfilled, (state, action) => {
      postGLListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsGLList.rejected, (state, action) => {
      postGLListRejected(state, action);
    })
  ),
});

export const glReplaceDrugSlice = createSlice({
  name: "glReplaceDrug",
  initialState: glState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceGLDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceGLDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceGLDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const glCriteriaSlice = createSlice({
  name: "glCriteriaList",
  initialState: glState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postGLCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postGLCriteriaList.fulfilled, (state, action) => {
      getGLSummaryFulfilled(state, action);
    }),
    builder.addCase(postGLCriteriaList.rejected, (state, action) => {
      getGLSummaryRejected(state, action);
    })
  ),
});

export const glRemoveDrugSlice = createSlice({
  name: "glRemoveDrug",
  initialState: glState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveGLDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveGLDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveGLDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
