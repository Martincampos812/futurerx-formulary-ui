import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getformularyVersions } from "./headerService";

interface FormularyHeaderState {
  formulary_version_list: any[];
  isLoading: boolean;
  error: string | null;
}

const formularyHeaderInitialState: FormularyHeaderState = {
  formulary_version_list: [],
  isLoading: true,
  error: null,
};

export interface FormularyVersionsResult {
  list: any[];
}

function startLoading(state: FormularyHeaderState) {
  state.isLoading = true;
}

function loadingFailed(state: FormularyHeaderState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const formularyHeader = createSlice({
  name: "formularyHeader",
  initialState: formularyHeaderInitialState,
  reducers: {
    getformularyVersionsStart: startLoading,
    getformularyVersionsSuccess(state, { payload }: PayloadAction<FormularyVersionsResult>) {
      const { list } = payload;
      state.formulary_version_list = list;
      state.isLoading = false;
      state.error = null;
    },
    getformularyVersionsFailure: loadingFailed,
  },
});

export const {
  getformularyVersionsStart,
  getformularyVersionsSuccess,
  getformularyVersionsFailure,
} = formularyHeader.actions;

export default formularyHeader.reducer;

export const fetchFormularyHeader = createAsyncThunk(
  "formularyHeader",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getformularyVersionsStart());
      const formularyVersions = await getformularyVersions(arg);
      dispatch(getformularyVersionsSuccess(formularyVersions));
    } catch (err) {
      dispatch(getformularyVersionsFailure(err.toString()));
    }
  }
);
