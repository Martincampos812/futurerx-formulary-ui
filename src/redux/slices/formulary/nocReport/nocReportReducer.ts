export const getNocFulfilled = (state, action) => {
    console.log("Reducer::getPaFulfilled");
  state.isLoading = false;
  console.log( "line 4 reducer:", action );
  console.log( "line 5", action.payload.result );
    if(action.payload.result === undefined) {
      console.log("getPaFulfilled: Payload invalid");
      return;
    }
  let data = action.payload.result;
  console.log( "line 11", data );
    // Response stored in the redux store.
  state.data = data;
  console.log( "line 14", state.data );
    
  }
  
  export const getNocRejected = (state, action) => {
    console.log("Reducer::getPaRejected");
    state.isLoading = false;
    state.data = {};
  
  }