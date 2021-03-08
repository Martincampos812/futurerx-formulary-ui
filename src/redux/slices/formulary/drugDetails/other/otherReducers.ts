export const getOTHERSummaryFulfilled = (state, action) => {
  console.log("Reducer::getOTHERSummaryFulfilled");
  state.isLoading = false;
  console.log("getOTHERSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getOTHERSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe OTHER Summary Action = ", action);
  console.log("THe OTHER Summary Action Payload = ", action.payload);
  state.data = data;
};

export const getOTHERSummaryRejected = (state, action) => {
  console.log("Reducer::getOTHERSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postOTHERListFulfilled = (state, action) => {
  console.log("Reducer::postOTHERListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postOTHERListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postOTHERListRejected = (state, action) => {
  console.log("Reducer::postOTHERListRejected");
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
