import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getstc } from "./stcService";

interface stcState {
  
  stc_list: any[];
  isLoading: boolean;
  error: string | null;
}

const stcInitialState: stcState = {
  stc_list: [],
  isLoading: true,
  error: null,
};

export interface stcResult {
  data: any[];
 
}

function startLoading(state: stcState) {
  state.isLoading = true;
}

function loadingFailed(state: stcState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const stc = createSlice({
  name: "stc",
  initialState: stcInitialState,
  reducers: {
    getstcStart: startLoading,
    getstcSuccess(state, { payload }: PayloadAction<stcResult>) {
      // console.log("***** getFormulariesSuccess ");
      const data = payload;
      // console.log("COUNT : ", count);
      // console.log("LIST : ", list);
      // state.formulary_list = list;
      // state.formulary_count = count;
      // state.isLoading = false;
      // state.error = null;
    },
    getstcFailure: loadingFailed,
  },
});

export const {
  getstcStart,
  getstcSuccess,
  getstcFailure,
} = stc.actions;

export default stc.reducer;

export const fetchstc = createAsyncThunk(
  "stc",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    console.log("payload",arg)
    try {
      dispatch(getstcStart());
      const formularies = await getstc(arg);
      dispatch(getstcSuccess(formularies));
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(getstcFailure(err.toString()));
    }
  }
);