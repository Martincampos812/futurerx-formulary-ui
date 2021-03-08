import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsLISSummary,
  getDrugDetailsLISList,
  getLISCriteriaList,
  postRemoveLISDrug,
  postReplaceLISDrug,
} from "./lisActionCreation";
import {
  getLISSummaryFulfilled,
  getLISSummaryRejected,
  postLISListFulfilled,
  postLISListRejected,
  postReplaceDrugFulfilled,
  postReplaceDrugRejected,
} from "./lisReducers";

const lisState: any = {
  data: {},
  isLoading: false,
};

export const lisSlice = createSlice({
  name: "lisSummary",
  initialState: lisState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsLISSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsLISSummary.fulfilled, (state, action) => {
      getLISSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsLISSummary.rejected, (state, action) => {
      getLISSummaryRejected(state, action);
    })
  ),
});

export const lisListSlice = createSlice({
  name: "lisDrugList",
  initialState: lisState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsLISList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsLISList.fulfilled, (state, action) => {
      postLISListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsLISList.rejected, (state, action) => {
      postLISListRejected(state, action);
    })
  ),
});

export const lisReplaceDrugSlice = createSlice({
  name: "lisReplaceDrug",
  initialState: lisState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postReplaceLISDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postReplaceLISDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postReplaceLISDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});

export const lisCriteriaSlice = createSlice({
  name: "lisCriteriaList",
  initialState: lisState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getLISCriteriaList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getLISCriteriaList.fulfilled, (state, action) => {
      getLISSummaryFulfilled(state, action);
    }),
    builder.addCase(getLISCriteriaList.rejected, (state, action) => {
      getLISSummaryRejected(state, action);
    })
  ),
});

export const lisRemoveDrugSlice = createSlice({
  name: "lisRemoveDrug",
  initialState: lisState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(postRemoveLISDrug.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(postRemoveLISDrug.fulfilled, (state, action) => {
      postReplaceDrugFulfilled(state, action);
    }),
    builder.addCase(postRemoveLISDrug.rejected, (state, action) => {
      postReplaceDrugRejected(state, action);
    })
  ),
});
