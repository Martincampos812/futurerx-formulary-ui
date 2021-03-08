export const getWebFulfilled = (state, action) => {
    console.log("Reducer::getPaFulfilled");
  state.isLoading = false;
  console.log( "Line 4:", action.payload.result );
  console.log( "Line 5:", action );
    if(action.payload.file === undefined ) {
      console.log("getPaFulfilled: Payload invalid");
      return;
    }
    let data = action.payload.file;
    // Response stored in the redux store.
    state.data = data;
    
  }
  
  export const getWebRejected = (state, action) => {
    console.log("Reducer::getPaRejected");
    state.isLoading = false;
    state.data = {};
  
  }