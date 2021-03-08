export const getGLSummaryFulfilled = (state, action) => {
  console.log("Reducer::getGLSummaryFulfilled");
  state.isLoading = false;
  console.log("getGLSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getGLSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe GL Summary Action = ", action);
  console.log("THe GL Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getGLSummaryRejected = (state, action) => {
  console.log("Reducer::getGLSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postGLListFulfilled = (state, action) => {
  console.log("Reducer::postGLListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postGLListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postGLListRejected = (state, action) => {
  console.log("Reducer::postGLListRejected");
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
