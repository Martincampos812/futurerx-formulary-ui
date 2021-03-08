export const getSOSummaryFulfilled = (state, action) => {
  console.log("Reducer::getSOSummaryFulfilled");
  state.isLoading = false;
  console.log("getSOSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getSOSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe SO Summary Action = ", action);
  console.log("THe SO Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getSOSummaryRejected = (state, action) => {
  console.log("Reducer::getSOSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postSOListFulfilled = (state, action) => {
  console.log("Reducer::postSOListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postSOListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postSOListRejected = (state, action) => {
  console.log("Reducer::postSOListRejected");
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
