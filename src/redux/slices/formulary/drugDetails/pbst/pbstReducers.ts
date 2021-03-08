export const getPBSTSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPBSTSummaryFulfilled");
  state.isLoading = false;
  console.log("getPBSTSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPBSTSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe PBST Summary Action = ", action);
  console.log("THe PBST Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPBSTSummaryRejected = (state, action) => {
  console.log("Reducer::getPBSTSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postPBSTListFulfilled = (state, action) => {
  console.log("Reducer::postPBSTListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postPBSTListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postPBSTListRejected = (state, action) => {
  console.log("Reducer::postPBSTListRejected");
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
