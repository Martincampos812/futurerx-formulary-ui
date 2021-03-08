export const getAFSummaryFulfilled = (state, action) => {
  console.log("Reducer::getAFSummaryFulfilled");
  state.isLoading = false;
  console.log("getAFSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getAFSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe AF Summary Action = ", action);
  console.log("THe AF Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getAFSummaryRejected = (state, action) => {
  console.log("Reducer::getAFSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postAFListFulfilled = (state, action) => {
  console.log("Reducer::postAFListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postAFListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postAFListRejected = (state, action) => {
  console.log("Reducer::postAFListRejected");
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
