import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getformularies } from "./dashboardService";

interface DashboardState {
  formulary_count: number;
  formulary_list: any[];
  isLoading: boolean;
  error: string | null;
}

const dashboardInitialState: DashboardState = {
  formulary_count: 0,
  formulary_list: [],
  isLoading: true,
  error: null,
};

export interface DashboardResult {
  list: any[];
  count: number;
}

function startLoading(state: DashboardState) {
  state.isLoading = true;
}

function loadingFailed(state: DashboardState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const dashboard = createSlice({
  name: "dashboard",
  initialState: dashboardInitialState,
  reducers: {
    getformulariesStart: startLoading,
    getFormulariesSuccess(state, { payload }: PayloadAction<DashboardResult>) {
      // console.log("***** getFormulariesSuccess ");
      const { list, count } = payload;
      // console.log("COUNT : ", count);
      // console.log("LIST : ", list);
      state.formulary_list = list;
      state.formulary_count = count;
      state.isLoading = false;
      state.error = null;
    },
    getFormalariesFailure: loadingFailed,
  },
});

export const {
  getformulariesStart,
  getFormulariesSuccess,
  getFormalariesFailure,
} = dashboard.actions;

export default dashboard.reducer;

export const fetchFormularies = createAsyncThunk(
  "dashboard",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      dispatch(getformulariesStart());
      const formularies = await getformularies(arg);
      dispatch(getFormulariesSuccess(formularies));
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(getFormalariesFailure(err.toString()));
    }
  }
);
