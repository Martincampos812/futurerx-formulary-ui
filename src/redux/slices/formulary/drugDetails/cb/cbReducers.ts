export const getCBSummaryFulfilled = (state, action) => {
  console.log("Reducer::getCBSummaryFulfilled");
  state.isLoading = false;
  console.log("getCBSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getCBSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe CB Summary Action = ", action);
  console.log("THe CB Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getCBSummaryRejected = (state, action) => {
  console.log("Reducer::getCBSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postCBListFulfilled = (state, action) => {
  console.log("Reducer::postCBListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postCBListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postCBListRejected = (state, action) => {
  console.log("Reducer::postCBListRejected");
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
