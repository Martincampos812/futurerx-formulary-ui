export const getLaSummaryFulfilled = (state, action) => {
  console.log("Reducer::getLaSummaryFulfilled");
  state.isLoading = false;
  console.log("getLaSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getLaSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe LA Summary Action = ", action);
  console.log("THe LA Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getLaSummaryRejected = (state, action) => {
  console.log("Reducer::getLaSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postLAListFulfilled = (state, action) => {
  console.log("Reducer::postLAListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postLAListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postLAListRejected = (state, action) => {
  console.log("Reducer::postLAListRejected");
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
  state.replaceLADrug = data;
};

export const postReplaceDrugRejected = (state, action) => {
  console.log("Reducer::postReplaceDrugRejected");
  state.isLoading = false;
  state.replaceLADrug = {};
};
