import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { homeSearch, searchFormulary} from "./services";

interface searchState {
  isLoading: boolean;
  error: string | null;
  success:any;
  result:any;
}

const SearchInitialState: searchState = {
  isLoading: true,
  error: null,
  success:null,
  result:null
};

export interface SearchResponse {
  success:any;
  result:{}
}

function startLoading(state: searchState) {
  state.isLoading = true;
}

function loadingFailed(state: searchState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.success = null;
  state.error = action.payload;
}

const homesearch = createSlice({
  name: "homesearch",
  initialState: SearchInitialState,
  reducers: {
    getPending: startLoading,
    getSuccess(state, { payload }: PayloadAction<SearchResponse>) {
      state.error = null
      state.success = payload.success.data;
    },
    getFailed: loadingFailed,
  },
});

export const {
  getPending,
  getSuccess,
  getFailed,
} = homesearch.actions;

export default homesearch.reducer;

export const homeSearchOptions = createAsyncThunk(
  "homesearch",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getPending());
      const response = await homeSearch(arg);
      dispatch(getSuccess(response));
      return response;
    } catch (err) {
      dispatch(getFailed(err));
    }
  }
);

export const searchFormularyData = createAsyncThunk(
  "homesearch/search",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getPending());
      const response = await searchFormulary(arg);
      dispatch(getSuccess(response));
      return response;
    } catch (err) {
      dispatch(getFailed(err));
    }
  }
);