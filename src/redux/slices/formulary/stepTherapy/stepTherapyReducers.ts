
export const getStepTherapyFulfilled = (state, action) => {
  console.log("Reducer::getStepTherapyFulfilled");
  state.isLoading = false;
  if(action.payload.result === undefined || (action.payload.result.length === 0)) {
    console.log("getStepTherapyFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.data = data;
  
}

export const getStepTherapyRejected = (state, action) => {
  console.log("Reducer::getStepTherapyRejected");
  state.isLoading = false;
  state.data = {}
}



export const getStDescriptionFulfilled = (state, action) => {
  console.log("Reducer::getPaFulfilled");
  state.isLoading = false;
  if(action.payload.data === undefined || (action.payload.data.length === 0)) {
    console.log("getPaFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.description = data;
  
}

export const getStDescriptionRejected = (state, action) => {
  console.log("Reducer::getPaRejected");
  state.isLoading = false;
  state.description = {};

}

export const postApplyFormularyDrugSTFulfilled = (state, action) => {
  console.log("Reducer::postApplyFormularyDrugST");
  state.isLoading = false;
  if(action.payload.data === undefined || (action.payload.data.length === 0)) {
    console.log("postApplyFormularyDrugST: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.description = data;
  
}

export const postApplyFormularyDrugSTRejected = (state, action) => {
  console.log("Reducer::postApplyFormularyDrugST");
  state.isLoading = false;
  state.description = {};

}


export const getStDescriptionsFulfilled = (state, action) => {
  console.log("Reducer::getPaFulfilled");
  state.isLoading = false;
  if(action.payload.data === undefined || (action.payload.data.length === 0)) {
    console.log("getPaFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.descriptions = data;
  
}

export const getStDescriptionsRejected = (state, action) => {
  console.log("Reducer::getPaRejected");
  state.isLoading = false;
  state.descriptions = {};

}


export const getVersionFulfilled = (state, action) => {
  state.isLoading = false;
  let stVersion
  if(action.payload.data === undefined || (action.payload.data.length === 0)) {
    stVersion = action.payload.data;
    // Response stored in the redux store.
    state.stVersion = stVersion;
    console.log("getStepTherapyFulfilled: Payload invalid");
    return;
  }else{
    stVersion = action.payload.data;
    // Response stored in the redux store.
    state.stVersion = stVersion;
  }
}

export const getVersionRejected = (state, action) => {
  console.log("Reducer::getStepTherapyRejected");
  state.isLoading = false;
  state.stVersion = {}
}