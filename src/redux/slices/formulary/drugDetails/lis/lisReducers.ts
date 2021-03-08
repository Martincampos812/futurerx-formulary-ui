export const getLISSummaryFulfilled = (state, action) => {
  console.log("Reducer::getLISSummaryFulfilled");
  state.isLoading = false;
  console.log("getLISSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getLISSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe LIS Summary Action = ", action);
  console.log("THe LIS Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getLISSummaryRejected = (state, action) => {
  console.log("Reducer::getLISSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postLISListFulfilled = (state, action) => {
  console.log("Reducer::postLISListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postLISListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postLISListRejected = (state, action) => {
  console.log("Reducer::postLISListRejected");
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
