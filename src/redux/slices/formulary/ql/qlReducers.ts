export const getQlFulfilled = (state, action) => {
  console.log("Reducer::getQlFulfilled");
  state.isLoading = false;
  if (
    action.payload.result === undefined ||
    action.payload.result.length === 0
  ) {
    console.log("getQlFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.data = data;
};

export const getQlRejected = (state, action) => {
  console.log("Reducer::getQlRejected");
  state.isLoading = false;
  state.data = {};
};

export const getQlDescriptionFulfilled = (state, action) => {
  console.log("Reducer::getQlFulfilled");
  state.isLoading = false;
  if (action.payload.data === undefined || action.payload.data.length === 0) {
    console.log("getQlFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.description = data;
};

export const getQlDescriptionRejected = (state, action) => {
  console.log("Reducer::getQlRejected");
  state.isLoading = false;
  state.description = {};
};

export const getVersionFulfilled = (state, action) => {
  state.isLoading = false;
  if (action.payload.data === undefined || action.payload.data.length === 0) {
    console.log("getStepTherapyFulfilled: Payload invalid");
    return;
  }
  const stVersion = action.payload.data;
  // Response stored in the redux store.
  state.paVersion = stVersion;
};

export const getVersionRejected = (state, action) => {
  console.log("Reducer::getStepTherapyRejected");
  state.isLoading = false;
  state.paVersion = {};
};
