import { MEMBERS_STATE_TYPE } from "../../model/MembersState";
import { MEMBER_SUMMARY_TYPE } from "./MemberSummaryModel";

export const getMemberSummaryFulfilled = (state, action) => {
  console.log("Reducer::getMemberSummaryFulfilled");
  state.isLoading = false;
  if(action.payload.data === undefined || !Array.isArray(action.payload.data) || (action.payload.data.length === 0)) {
    console.log("getMemberSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  // Response stored in the redux store.
  state.memberDetails = data;
  state.id_member_info = data.id_member_info;
}

export const getMemberSummaryRejected = (state, action) => {
  console.log("Reducer::getMemberSummaryRejected");
  state.isLoading = false;
  state.id_member_info = -1;
  state.memberDetails = {};
}

export const getMemberAddressFulfilled = (state, action) => {
  console.log("Reducer::getMemberAddressFulfilled");
  state.isLoading = false;
  if(action.payload.data === undefined || !Array.isArray(action.payload.data) || (action.payload.data.length === 0)) {
    console.log("getMemberAddressFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  // Response stored in the redux store.
  state.memberAddress = data;
  state.id_member_info = data.id_member_info;
}

export const getMemberAddressRejected = (state, action) => {
  console.log("Reducer::getMemberSummaryRejected");
  state.isLoading = false;
  state.id_member_info = -1;
  state.memberAddress = {};
}