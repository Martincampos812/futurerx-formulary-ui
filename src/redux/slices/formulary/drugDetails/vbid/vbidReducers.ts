export const getVBIDSummaryFulfilled = (state, action) => {
  console.log("Reducer::getVBIDSummaryFulfilled");
  state.isLoading = false;
  console.log("getVBIDSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getVBIDSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe VBID Summary Action = ", action);
  console.log("THe VBID Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getVBIDSummaryRejected = (state, action) => {
  console.log("Reducer::getVBIDSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postVBIDListFulfilled = (state, action) => {
  console.log("Reducer::postVBIDListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postVBIDListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postVBIDListRejected = (state, action) => {
  console.log("Reducer::postVBIDListRejected");
  state.isLoading = false;
  state.applyData = {};
};

export const postReplaceDrugFulfilled = (state, action) => {
  console.log("Reducer::postReplaceDrugFulfilled");
  state.isLoading = false;
  console.log(action);
  if (action.payload) {
    console.log("postReplaceDrugFulfilled: Payload invalid");
    return;
  }
  const data = action.payload;
  state.data = data;
};

export const postReplaceDrugRejected = (state, action) => {
  console.log("Reducer::postReplaceDrugRejected");
  state.isLoading = false;
  state.data = {};
};
