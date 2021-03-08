export const getICDSummaryFulfilled = (state, action) => {
  console.log("Reducer::getICDSummaryFulfilled");
  state.isLoading = false;
  console.log("getICDSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getICDSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe ICD Summary Action = ", action);
  console.log("THe ICD Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getICDSummaryRejected = (state, action) => {
  console.log("Reducer::getICDSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postICDListFulfilled = (state, action) => {
  console.log("Reducer::postICDListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postICDListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postICDListRejected = (state, action) => {
  console.log("Reducer::postICDListRejected");
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
