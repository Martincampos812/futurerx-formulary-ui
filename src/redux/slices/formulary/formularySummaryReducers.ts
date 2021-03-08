import { FORMULARY_STATE_TYPE } from "../../model/FormularyState";
import { FORMULARY_SUMMARY_TYPE } from "./formularySummaryModel";

export const getFormularySummaryFulfilled = (state, action) => {
  console.log("Reducer::getFormularySummaryFulfilled");
  state.isLoading = false;
  console.log(action)
  if(action.payload.data === undefined || !Array.isArray(action.payload.data) || (action.payload.data.length === 0)) {
    console.log("getFormularySummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  // Response stored in the redux store.
  state.summary = data;
  state.id = data.id;
}

export const getFormularySummaryRejected = (state, action) => {
  console.log("Reducer::getFormularySummaryRejected");
  state.isLoading = false;
  state.id = -1;
  state.summary = {};
}