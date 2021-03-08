export const getPGCSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPGCSummaryFulfilled");
  state.isLoading = false;
  console.log("getPGCSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPGCSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe PGC Summary Action = ", action);
  console.log("THe PGC Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPGCSummaryRejected = (state, action) => {
  console.log("Reducer::getPGCSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postPGCListFulfilled = (state, action) => {
  console.log("Reducer::postPGCListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postPGCListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postPGCListRejected = (state, action) => {
  console.log("Reducer::postPGCListRejected");
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
