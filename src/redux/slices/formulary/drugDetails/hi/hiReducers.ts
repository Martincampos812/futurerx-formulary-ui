export const getHISummaryFulfilled = (state, action) => {
  console.log("Reducer::getHISummaryFulfilled");
  state.isLoading = false;
  console.log("getHISummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getHISummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe HI Summary Action = ", action);
  console.log("THe HI Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getHISummaryRejected = (state, action) => {
  console.log("Reducer::getHISummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postHIListFulfilled = (state, action) => {
  console.log("Reducer::postHIListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postHIListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postHIListRejected = (state, action) => {
  console.log("Reducer::postHIListRejected");
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
  // Response stored in the redux store.
  state.data = data;
};

export const postReplaceDrugRejected = (state, action) => {
  console.log("Reducer::postReplaceDrugRejected");
  state.isLoading = false;
  state.data = {};
};
