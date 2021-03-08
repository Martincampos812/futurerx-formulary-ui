import { FORMULARY_STATE_TYPE } from "../../../model/FormularyState";


export const getClassificationSystemsFulfilled = (state, action) => {
  console.log("Reducer::getClassificationSystemsFulfilled");
  state.isLoading = false;
  console.log(action)
  if(action.payload.data === undefined || !Array.isArray(action.payload.data) || (action.payload.data.length === 0)) {
    console.log("getClassificationSystemsFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.classificationSystems = data;
  
}

export const getClassificationSystemsRejected = (state, action) => {
  console.log("Reducer::getClassificationSystemsFulfilled");
  state.isLoading = false;
  state.classificationSystems = {};
}

export const postDrugsCategoryFulfilled = (state, action) => {
  console.log("Reducer::postDrugsCategoryFulfilled");
  state.isLoading = false;
  console.log(action)
  if(action.payload.result === undefined || !Array.isArray(action.payload.result) || (action.payload.result.length === 0)) {
    console.log("postDrugsCategoryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.categoryData = data;
  
}

export const postDrugsCategoryRejected = (state, action) => {
  console.log("Reducer::postDrugsCategoryRejected");
  state.isLoading = false;
  state.categoryData = {};
}

export const getIntelliscenseSearchFulfilled = (state, action) => {
  console.log("Reducer::getIntelliscenseSearchFulfilled");
  state.isLoading = false;
  console.log(action)
  if(action.payload.data === undefined || !Array.isArray(action.payload.data) || (action.payload.data.length === 0)) {
    console.log("getIntelliscenseSearchFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.intelliscenseData = data;
  
}

export const getIntelliscenseSearchRejected = (state, action) => {
  console.log("Reducer::getIntelliscenseSearchRejected");
  state.isLoading = false;
  state.intelliscenseData = {};
}

export const getCategoryClassesFulfilled = (state, action) => {
  console.log("Reducer::getCategoryClassesFulfilled");
  state.isLoading = false;
  console.log(action)
  if(action.payload.data === undefined) {
    console.log("getCategoryClassesFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data;
  // Response stored in the redux store.
  state.categoryClassData = data;
  
}

export const getCategoryClassesRejected = (state, action) => {
  console.log("Reducer::getCategoryClassesRejected");
  state.isLoading = false;
  state.categoryClassData = {};
}

export const postDrugsClassCategoryOverrideFulfilled = (state, action) => {
  console.log("Reducer::postDrugsClassCategoryOverride");
  state.isLoading = false;
  console.log(action)
  if(action.payload) {
    console.log("postDrugsClassCategoryOverride: Payload invalid");
    return;
  }
  const data = action.payload;
  // Response stored in the redux store.
  state.overrideResponse = data;
  
}

export const postDrugsClassCategoryOverrideRejected = (state, action) => {
  console.log("Reducer::postDrugsClassCategoryOverride");
  state.isLoading = false;
  state.overrideResponse = {};
}
