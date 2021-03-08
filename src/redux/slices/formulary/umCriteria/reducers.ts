
export const postUmCriteriasDrugsFulfilled = (state, action) => {
  console.log("Reducer::postUmCriteriasDrugsFulfilled");
  state.isLoading = false;
  // if(action.payload === undefined ) {
  //   console.log("postUmCriteriasDrugsFulfilled: Payload invalid");
  //   return;
  // }
  let data = action.payload;
  
  state.drugs = data;
  
}

export const postUmCriteriasDrugsRejected = (state, action) => {
  console.log("Reducer::postUmCriteriasDrugsRejected");
  state.isLoading = false;
  state.drugs = {};
}


export const postUmCriteriasFulfilled = (state, action) => {
  console.log("Reducer::postUmCriteriasFulfilled");
  state.isLoading = false;
  // if(action.payload === undefined ) {
  //   console.log("postUmCriteriasFulfilled: Payload invalid");
  //   return;
  // }
  let data = action.payload;
  
  state.umCriterias = data;
  
}

export const postUmCriteriasRejected = (state, action) => {
  console.log("Reducer::postUmCriteriasRejected");
  state.isLoading = false;
  state.umCriterias = {};
}

