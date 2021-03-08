import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { import_FL } from "./importFLService";

interface ImportFormularyState {
  isLoading: boolean;
  error: string | null;
}

const importFormularyInitialState: ImportFormularyState = {
  isLoading: true,
  error: null,
};

export interface ImportFormularyResult {
  list: any[];
  count: number;
}

function startLoading(state: ImportFormularyState) {
  state.isLoading = true;
}

function loadingFailed(state: ImportFormularyState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const importFL = createSlice({
  name: "importFL",
  initialState: importFormularyInitialState,
  reducers: {
    importFormularyStart: startLoading,
    importFormularySuccess(state, { payload }: PayloadAction<ImportFormularyResult>) {
      // console.log("***** getFormulariesSuccess ");
      state.isLoading = false;
      state.error = null;
    },
    importFormularyFailure: loadingFailed,
  },
});
const importedFLFiles = createSlice({
  name: "importedFLFiles",
  initialState: importFormularyInitialState,
  reducers: {
    importedFLFilesStart: startLoading,
    importedFLFilesSuccess(state, { payload }: PayloadAction<ImportFormularyResult>) {
      // console.log("***** getFormulariesSuccess ");
      state.isLoading = false;
      state.error = null;
    },
    importedFLFilesFailure: loadingFailed,
  },
});

export const {
  importFormularyStart,
  importFormularySuccess,
  importFormularyFailure
} = importFL.actions;

export const {
  importedFLFilesStart,
  importedFLFilesSuccess,
  importedFLFilesFailure,
} = importedFLFiles.actions;

export default importFL.reducer;

export const import_Formulary = createAsyncThunk(
  "importFL",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      dispatch(importFormularyStart());
      const import_file = await import_FL(arg);
      dispatch(importFormularySuccess(import_file));
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(importFormularyFailure(err.toString()));
    }
  }
);
// export const importedFLFiles_list = createAsyncThunk(
//   "importFL",
//   async (arg: any, { dispatch }) => {
//     // console.log("***** fetchFormularies ");
//     try {
//       dispatch(importedFLFilesStart());
//       const import_file = await import_FL(arg);
//       dispatch(importedFLFilesSuccess(import_file));
//     } catch (err) {
//       // console.log("***** fetchFormularies - ERROR ");
//       dispatch(importFormularyFailure(err.toString()));
//     }
//   }
// );
