export const getPRSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPRSummaryFulfilled");
  state.isLoading = false;
  console.log("getPRSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPRSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe PR Summary Action = ", action);
  console.log("THe PR Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPRSummaryRejected = (state, action) => {
  console.log("Reducer::getPRSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const getPRSettingsFulfilled = (state, action) => {
  console.log("Reducer::getPRSettingsFulfilled");
  state.isLoading = false;
  console.log("getPRSettingsFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPRSettingsFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe PR Settings Action = ", action);
  console.log("THe PR Settings Action Payload = ", action.payload);
  state.data = data;
};
export const getPRSettingsRejected = (state, action) => {
  console.log("Reducer::getPRSettingsRejected");
  state.isLoading = false;
  state.data = {};
};

export const postPRListFulfilled = (state, action) => {
  console.log("Reducer::postPRListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postPRListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postPRListRejected = (state, action) => {
  console.log("Reducer::postPRListRejected");
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
