


export const getPaFulfilled = (state, action) => {
  console.log("Reducer::getPaFulfilled");
  state.isLoading = false;
  if(action.payload.result === undefined || (action.payload.result.length === 0)) {
    console.log("getPaFulfilled: Payload invalid");
    return;
  }
  let data = action.payload.result;
  // Response stored in the redux store.
  state.data = data;
  
}

export const getPaRejected = (state, action) => {
  console.log("Reducer::getPaRejected");
  state.isLoading = false;
  state.data = {};

}

export const getPaDescriptionFulfilled = (state, action) => {
  console.log("Reducer::getPaFulfilled");
  state.isLoading = false;
  if(action.payload.data === undefined || (action.payload.data.length === 0)) {
    console.log("getPaFulfilled: Payload invalid");
    return;
  }
  let data = action.payload.data;
  // Response stored in the redux store.
  state.description = data;
  
}

export const getPaDescriptionRejected = (state, action) => {
  console.log("Reducer::getPaRejected");
  state.isLoading = false;
  state.description = {};

}

export const getPaDescriptionsFulfilled = (state, action) => {
  console.log("Reducer::getPaFulfilled");
  state.isLoading = false;
  if(action.payload.data === undefined || (action.payload.data.length === 0)) {
    console.log("getPaFulfilled: Payload invalid");
    return;
  }
  let data = action.payload.data;
  // Response stored in the redux store.
  state.descriptions = data;
  
}

export const getPaDescriptionsRejected = (state, action) => {
  console.log("Reducer::getPaRejected");
  state.isLoading = false;
  state.descriptions = {};

}

export const getVersionFulfilled = (state, action) => {
  state.isLoading = false;
  let stVersion;
  if(action.payload.data === undefined || (action.payload.data.length === 0)) {
    stVersion = action.payload.data;
    // Response stored in the redux store.
    state.paVersion = stVersion;
    console.log("getStepTherapyFulfilled: Payload invalid");
    return;
  }else{
    stVersion = action.payload.data;
    // Response stored in the redux store.
    state.paVersion = stVersion;
  }
  
}

export const getVersionRejected = (state, action) => {
  console.log("Reducer::getStepTherapyRejected");
  state.isLoading = false;
  state.paVersion = {}
}