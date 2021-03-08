export const getPOSSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPOSSummaryFulfilled");
  state.isLoading = false;
  console.log("getPOSSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPOSSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe POS Summary Action = ", action);
  console.log("THe POS Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPOSSummaryRejected = (state, action) => {
  console.log("Reducer::getPOSSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const getPOSSettingsFulfilled = (state, action) => {
  console.log("Reducer::getPOSSettingsFulfilled");
  state.isLoading = false;
  console.log("getPOSSettingsFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPOSSettingsFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe POS Settings Action = ", action);
  console.log("THe POS Settings Action Payload = ", action.payload);
  state.data = data;
};
export const getPOSSettingsRejected = (state, action) => {
  console.log("Reducer::getPOSSettingsRejected");
  state.isLoading = false;
  state.data = {};
};

export const postPOSListFulfilled = (state, action) => {
  console.log("Reducer::postPOSListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postPOSListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postPOSListRejected = (state, action) => {
  console.log("Reducer::postPOSListRejected");
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
