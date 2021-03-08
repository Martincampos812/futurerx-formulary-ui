import { FORMULARY_STATE_TYPE } from "../../../model/FormularyState";


export const getTierFulfilled = (state, action) => {
  console.log("Reducer::getTierFulfilled");
  state.isLoading = false;
  console.log(action)
  if(action.payload.data === undefined || !Array.isArray(action.payload.data) || (action.payload.data.length === 0)) {
    console.log("getTierFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.data = data;
  
}

export const getTierRejected = (state, action) => {
  console.log("Reducer::getTierRejected");
  state.isLoading = false;
  state.data = {};

}

export const getTierLabelFulfilled = (state, action) => {
  console.log("Reducer::getTierLabelFulfilled");
  state.isLoading = false;
  console.log(action)
  if(action.payload.data === undefined || !Array.isArray(action.payload.data) || (action.payload.data.length === 0)) {
    console.log("getTierLabelFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.tierLabels = data;
  
}

export const getTierLabelRejected = (state, action) => {
  console.log("Reducer::getTierLabelRejected");
  state.isLoading = false;
  state.tierLabels = {};

}

export const postTierApplyFulfilled = (state, action) => {
  console.log("Reducer::postTierApplyFulfilled");
  state.isLoading = false;
  console.log(action)
  if(action.payload.result === undefined || !Array.isArray(action.payload.result) || (action.payload.result.length === 0)) {
    console.log("postTierApplyFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
  
}

export const postTierApplyRejected = (state, action) => {
  console.log("Reducer::postTierApplyRejected");
  state.isLoading = false;
  state.applyData = {};

}

export const postTierNewFulfilled = (state, action) => {
  console.log("Reducer::postTierNewFulfilled");
  state.isLoading = false;
  console.log(action)
  if(action.payload) {
    console.log("postTierNewFulfilled: Payload invalid");
    return;
  }
  const data = action.payload;
  // Response stored in the redux store.
  state.tierAddNewResponse = data;
  
}

export const postTierNewRejected = (state, action) => {
  console.log("Reducer::postTierNewRejected");
  state.isLoading = false;
  state.tierAddNewResponse = {};

}

export const getMaintenanceFormularyTiersFulfilled = (state, action) => {
  console.log("Reducer::postTierNewFulfilled");
  debugger;
  state.isLoading = false;
  console.log(action.payload)
  if(action.payload.data==undefined) {
    console.log("postTierNewFulfilled: Payload invalid");
    return;
  }
  let data = action.payload.data;
  // Response stored in the redux store.
  state.maintenanceFormularyTiers = data;
}

export const getMaintenanceFormularyTiersRejected = (state, action) => {
  console.log("Reducer::postTierNewRejected");
  state.isLoading = false;
  state.maintenanceFormularyTiers = {};
}

