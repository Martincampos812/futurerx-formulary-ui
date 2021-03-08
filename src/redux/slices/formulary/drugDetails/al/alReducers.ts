export const getALSummaryFulfilled = (state, action) => {
  console.log("Reducer::getALSummaryFulfilled");
  state.isLoading = false;
  console.log("getALSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getALSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe AL Summary Action = ", action);
  console.log("THe AL Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getALSummaryRejected = (state, action) => {
  console.log("Reducer::getALSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postALListFulfilled = (state, action) => {
  console.log("Reducer::postALListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postALListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postALListRejected = (state, action) => {
  console.log("Reducer::postALListRejected");
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
