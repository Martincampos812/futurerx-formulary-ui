export const getFFFSummaryFulfilled = (state, action) => {
  console.log("Reducer::getFFFSummaryFulfilled");
  state.isLoading = false;
  console.log("getFFFSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getFFFSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe FFF Summary Action = ", action);
  console.log("THe FFF Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getFFFSummaryRejected = (state, action) => {
  console.log("Reducer::getFFFSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postFFFListFulfilled = (state, action) => {
  console.log("Reducer::postFFFListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postFFFListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postFFFListRejected = (state, action) => {
  console.log("Reducer::postFFFListRejected");
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
