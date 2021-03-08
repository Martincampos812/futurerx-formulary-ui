import {createSlice} from "@reduxjs/toolkit";
import { getMemberSummary, getMemberAddress } from "./MemberSummaryActionCreator";
import { MEMBER_SUMMARY_TYPE } from "./MemberSummaryModel";
import { getMemberAddressFulfilled, getMemberAddressRejected, getMemberSummaryFulfilled, getMemberSummaryRejected } from "./MemberSummaryReducers";
// import { getPostsFulfilled, getPostsRejected } from "./PostsReducers";

// Init State
const memberSummaryState: MEMBER_SUMMARY_TYPE = {
  id_member_info: -1,
  memberDetails: {},
  memberAddress: {},
  isLoading: false,
}

// Slice
export const memberSummarySlice = createSlice({
  name: "member_summary",
  initialState: memberSummaryState,
  reducers: {

  },
  extraReducers: builder => (
    builder.addCase(getMemberSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getMemberSummary.fulfilled, (state, action) => {
      getMemberSummaryFulfilled(state, action);
    }),
    builder.addCase(getMemberSummary.rejected, (state, action) => {
      getMemberSummaryRejected(state, action);
    }),
    builder.addCase(getMemberAddress.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getMemberAddress.fulfilled, (state, action) => {
      getMemberAddressFulfilled(state, action);
    }),
    builder.addCase(getMemberAddress.rejected, (state, action) => {
      getMemberAddressRejected(state, action);
    })
  )
});