import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTable, publishTemplateSvc } from "./tableService";

interface MarketingMaterialState {
  table_count: number;
  table_list: any[];
  isLoading: boolean;
  error: string | null;
}

export interface MarketingMaterialResult {
  list: any[];
  count: number;
}

const marketingMaterialInitialState: MarketingMaterialState = {
  table_count: 0,
  table_list: [],
  isLoading: true,
  error: null,
};


function startLoading(state: MarketingMaterialState) {
  state.isLoading = true;
}

function loadingFailed(state: MarketingMaterialState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const table = createSlice({
  name: "marketing_materials",
  initialState: marketingMaterialInitialState,
  reducers: {
    getMaterialTableStart: startLoading,
    getMaterialTableSuccess(state, { payload }: PayloadAction< MarketingMaterialResult >) {
      const { list, count } = payload;
      state.table_list = list;
      state.table_count = count;
      state.isLoading = false;
      state.error = null;
    },
    getMaterialTableFailure: loadingFailed,
  },
});

export const {
  getMaterialTableStart,
  getMaterialTableSuccess,
  getMaterialTableFailure,
} = table.actions;

export default table.reducer;

export const fetchTable = createAsyncThunk(
  "marketing_materials",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      dispatch(getMaterialTableStart());
      const formularies = await getTable(arg);
      dispatch(getMaterialTableSuccess(formularies));
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(getMaterialTableFailure(err.toString()));
    }
  }
);

export const publishTemplate = createAsyncThunk(
  "marketing_materials",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      // dispatch(getMaterialTableStart());
      const formularies = await publishTemplateSvc(arg);
      // dispatch(getMaterialTableSuccess(formularies));
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      // dispatch(getMaterialTableFailure(err.toString()));
    }
  }
);
