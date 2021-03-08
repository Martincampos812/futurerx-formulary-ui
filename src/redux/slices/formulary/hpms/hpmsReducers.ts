// export const getHpmsFormularyFileFulfilled = (state, action) => {
//   console.log("Reducer::getHpmsFormularyFileFulfilled");
//   state.isLoading = false;
//   if (action.payload.result === undefined || (action.payload.result.length === 0)) {
//     console.log("getHpmsFormularyFileFulfilled: Payload invalid");
//     return;
//   }
//   let data = action.payload.result;
//   // Response stored in the redux store.
//   state.data = data;

// }

// export const getHpmsFormularyFileRejected = (state, action) => {
//   console.log("Reducer::getHpmsFormularyFileRejected");
//   state.isLoading = false;
//   state.data = {};
// }

export const getHpmsReportsFulfilled = (state, action) => {
  debugger;
  console.log("Reducer::getHpmsReportsFulfilled");
  state.isLoading = false;
  if (action.payload.data === undefined || (action.payload.data.length === 0)) {
    console.log("getHpmsReportsFulfilled: Payload invalid");
    return;
  }
  let data = action.payload.data;
  // Response stored in the redux store.
  state.hpmsReports = data;

}

export const getHpmsReportsRejected = (state, action) => {
  debugger;

  console.log("Reducer::getHpmsReportsRejected");
  state.isLoading = false;
  state.hpmsReports = {};
}

export const getStandardReportsFulfilled = (state, action) => {
  debugger;
  console.log("Reducer::getStandardReportsFulfilled");
  state.isLoading = false;
  if (action.payload.data === undefined || (action.payload.data.length === 0)) {
    console.log("getStandardReportsFulfilled: Payload invalid");
    return;
  }
  let data = action.payload.data;
  // Response stored in the redux store.
  state.standardReports = data;

}

export const getStandardReportsRejected = (state, action) => {
  debugger;

  console.log("Reducer::getStandardReportsRejected");
  state.isLoading = false;
  state.standardReports = {};
}