import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsVBIDSummary,
  getDrugDetailsVBIDList,
  getVBIDContracts,
  getVBIDpbps,
  getVBIDCriteriaList,
  postRemoveVBIDDrug,
  postReplaceVBIDDrug,
} from "./vbidActionCreation";
import {
  getVBIDSummaryFulfilled,
  getVBIDSummaryRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
  postVBIDListFulfilled,
  postVBIDListRejected,
} from "./vbidReducers";

const vbidState: any = {
  data: {},
  isLoading: false,
};

export const vbidSlice = createSlice({
  name: "vbidSummary",
  initialState: vbidState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsVBIDSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsVBIDSummary.fulfilled, (state, action) => {
      getVBIDSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsVBIDSummary.rejected, (state, action) => {
      getVBIDSummaryRejected(state, action);
    })
  ),
});

export const vbidContractsSlice = createSlice({
  name: "vbidContracts",
  initialState: vbidState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getVBIDContracts.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getVBIDContracts.fulfilled, (state, action) => {
      getVBIDSummaryFulfilled(state, action);
    }),
    builder.addCase(getVBIDContracts.rejected, (state, action) => {
      getVBIDSummaryRejected(state, action);
    })
  ),
});

export const vbidpbpsSlice = createSlice({
  name: "vbidpbps",
  initialState: vbidState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getVBIDpbps.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getVBIDpbps.fulfilled, (state, action) => {
      getVBIDSummaryFulfilled(state, action);
    }),
    builder.addCase(getVBIDpbps.rejected, (state, action) => {
      getVBIDSummaryRejected(state, action);
    })
  ),
});

export const vbidListSlice = createSlice({
  name: "vbidDrugList",
  initialState: vbidState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsVBIDList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsVBIDList.fulfilled, (state, action) => {
      postVBIDListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsVBIDList.rejected, (state, action) => {
      postVBIDListRejected(state, action);
    })
  ),
});

export const vbidCriteriaSlice = createSlice({
  name: "vbidCriteriaList",
  initialState: vbidState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getVBIDCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getVBIDCriteriaList.fulfilled, (state, action) => {
      getVBIDSummaryFulfilled(state, action);
    }),
    builder.addCase(getVBIDCriteriaList.rejected, (state, action) => {
      getVBIDSummaryRejected(state, action);
    })
  ),
});

export const vbidRemoveDrugSlice = createSlice({
  name: "vbidRemoveDrug",
  initialState: vbidState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveVBIDDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveVBIDDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveVBIDDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const vbidReplaceDrugSlice = createSlice({
  name: "vbidReplaceDrug",
  initialState: vbidState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceVBIDDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceVBIDDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceVBIDDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
