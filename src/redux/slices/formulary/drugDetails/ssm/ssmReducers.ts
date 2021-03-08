export const getSSMSummaryFulfilled = (state, action) => {
  console.log("Reducer::getSSMSummaryFulfilled");
  state.isLoading = false;
  console.log("getSSMSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getSSMSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe SSM Summary Action = ", action);
  console.log("THe SSM Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getSSMSummaryRejected = (state, action) => {
  console.log("Reducer::getSSMSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postSSMListFulfilled = (state, action) => {
  console.log("Reducer::postSSMListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postSSMListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postSSMListRejected = (state, action) => {
  console.log("Reducer::postSSMListRejected");
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
