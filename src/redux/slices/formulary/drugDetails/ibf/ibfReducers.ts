export const getIBFSummaryFulfilled = (state, action) => {
  console.log("Reducer::getIBFSummaryFulfilled");
  state.isLoading = false;
  console.log("getIBFSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getIBFSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe IBF Summary Action = ", action);
  console.log("THe IBF Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getIBFSummaryRejected = (state, action) => {
  console.log("Reducer::getIBFSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postIBFListFulfilled = (state, action) => {
  console.log("Reducer::postIBFListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postIBFListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postIBFListRejected = (state, action) => {
  console.log("Reducer::postIBFListRejected");
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
