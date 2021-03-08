import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getformularyVersionHistory } from "./version-history.service";

interface FormularyVersionHistoryState {
  formulary_version_history: any[];
  isLoading: boolean;
  error: string | null;
}

const formularyVersionhistoryInitialState: FormularyVersionHistoryState = {
  formulary_version_history: [],
  isLoading: false,
  error: null
};

export interface FormularyVersionHistoryResult {
  formulary_version_history: any[];
}

function startLoading(state: FormularyVersionHistoryState) {
  state.isLoading = true;
}

function loadingFailed(
  state: FormularyVersionHistoryState,
  action: PayloadAction<string>
) {
  state.isLoading = false;
  state.error = action.payload;
}

export const formularyVersionHistorySlice = createSlice({
  name: "formularyVersionHistory",
  initialState: formularyVersionhistoryInitialState,
  reducers: {
    getformularyVersionHistoryStart: startLoading,
    getformularyVersionHistorySuccess(
      state,
      { payload }: PayloadAction<FormularyVersionHistoryResult>
    ) {
      const { formulary_version_history } = payload;
      state.formulary_version_history = formulary_version_history;
      state.isLoading = false;
      state.error = null;
    },
    getformularyVersionHistoryFailure: loadingFailed
  }
});

export const {
  getformularyVersionHistoryStart,
  getformularyVersionHistorySuccess,
  getformularyVersionHistoryFailure
} = formularyVersionHistorySlice.actions;

export default formularyVersionHistorySlice.reducer;

export const fetchFormularyVersionHistory = createAsyncThunk(
  "formularyVersionHistory",
  async (
    arg: { formularyBaseId: number; index: number; limit: number },
    { dispatch }
  ) => {
    try {
      dispatch(getformularyVersionHistoryStart());
      const formularyVersions = await getformularyVersionHistory(arg);
      dispatch(getformularyVersionHistorySuccess(formularyVersions));
    } catch (err) {
      dispatch(getformularyVersionHistoryFailure(err.toString()));
    }
  }
);
