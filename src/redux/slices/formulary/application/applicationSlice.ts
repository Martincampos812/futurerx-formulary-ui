import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getformularyVersions } from "./applicationService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Formulary } from "../setup/formulary";

interface ApplicationState {
  mode: string;
  formulary: any;
  formulary_id: number;
  formulary_lob_id: number;
  formulary_type_id: number;
  versions: any[];
  clientId: number;
  location: number;
  location_home: number;
  setupComplete: boolean;
  current_lob: number;
  isLoading: boolean;
  error: string | null;
}

const applicationInitialState: ApplicationState = {
  mode: "",
  formulary: null,
  formulary_id: 0,
  formulary_lob_id: NaN,
  formulary_type_id: NaN,
  versions: [],
  clientId: 1,
  location: 0,
  location_home: 0,
  setupComplete: false,
  current_lob: 0,
  isLoading: false,
  error: null,
};

interface ApplicationResult {
  formulary_id: number;
  formulary: any;
  formulary_lob_id: number;
  formulary_type_id: number;
  mode: string;
  setupComplete: boolean;
}

function startLoading(state: ApplicationState) {
  state.isLoading = true;
}

function loadingFailed(state: ApplicationState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const application = createSlice({
  name: "application",
  initialState: applicationInitialState,
  reducers: {
    setFormularyDetails(state, { payload }: PayloadAction<ApplicationResult>) {
      // console.log("***** setFormularyDetails ");
      const {
        formulary_id,
        formulary,
        formulary_lob_id,
        formulary_type_id,
        mode,
        setupComplete,
      } = payload;
      state.formulary_id = formulary_id;
      state.formulary = formulary;
      state.formulary_lob_id = formulary_lob_id;
      state.formulary_type_id = formulary_type_id;
      state.mode = mode;
      state.setupComplete = setupComplete;
      state.isLoading = false;
      state.error = null;
      //console.log("CLIENT ID", sessionStorage.getItem('client_id'));
      //state.clientId = sessionStorage.getItem('client_id') ? parseInt(sessionStorage.getItem('client_id')) : 0;
      state.clientId = 1;
    },
    setLocation(state, { payload }: PayloadAction<number>) {
      // console.log(" SET LOCATION : " + payload);
      state.location = payload;
    },
    setLocationHome(state, { payload }: PayloadAction<number>) {
      // console.log(" SET LOCATION : " + payload);
      state.location_home = payload;
    },

    clearApplication(state, { payload }: PayloadAction<number>) {
      console.log("***** CLEAR APP ");
      state.mode = "";
      state.formulary_id = 0;
      state.formulary = null;
      state.formulary_lob_id = NaN;
      state.formulary_type_id = NaN;
      state.clientId = 1;
      state.location = 0;
      state.location_home = 0;
      state.setupComplete = false;
      state.isLoading = false;
      state.error = null;
    },

    setModeLob(state, { payload }: PayloadAction<number>) {
      // console.log(" SET MODE LOB : " + payload);
      state.current_lob = payload;
    },

    getFormularyVersionsStart: startLoading,
    getFormularyVersionsSuccess(state, { payload }: PayloadAction<any>) {
      console.log(" getFormularyVersionsSuccess ", payload);
      state.versions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getFormularyVersionsFailure: loadingFailed,
  },
});

export const setFormulary = createAsyncThunk(
  "application",
  async (arg: any, { dispatch }) => {
    console.log("***** setFormulary ", arg);

    const obj = {
      formulary_id: arg?.id_formulary,
      formulary: arg,
      formulary_lob_id: arg?.id_lob,
      formulary_type_id: arg?.id_formulary_type,
      mode: "EXISTING",
      setupComplete: arg?.is_setup_complete,
    };
    dispatch(setFormularyDetails(obj));
  }
);

export const setFullFormulary = createAsyncThunk(
  "application",
  async (value: Formulary, { dispatch }) => {
    // console.log("***** setFullFormulary ", value);

    const obj = {
      formulary_id: value?.id_formulary,
      formulary: value,
      formulary_lob_id: value?.formulary_type_info?.id_lob,
      formulary_type_id: value?.formulary_type_info?.id_formulary_type,
      mode: "EXISTING",
      setupComplete: value?.formulary_info?.is_setup_complete,
    };
    dispatch(setFormularyDetails(obj));
  }
);

export const addNewFormulary = createAsyncThunk(
  "application",
  async (arg: any = null, { dispatch }) => {
    const obj = {
      formulary_id: 0,
      formulary: null,
      formulary_lob_id: 0,
      formulary_type_id: 0,
      mode: "NEW",
      setupComplete: false,
    };
    dispatch(setFormularyDetails(obj));
  }
);

export const fetchFormularyVersions = createAsyncThunk(
  "application",
  async (base_id: number, { dispatch }) => {
    console.log("***applicatoion.fetchFormularyVersions");
    try {
      dispatch(getFormularyVersionsStart());
      const list = await getformularyVersions(base_id);
      console.log(list);
      dispatch(getFormularyVersionsSuccess(list));
    } catch (error) {
      dispatch(getFormularyVersionsFailure(error.toString));
    }
  }
);

export const {
  setFormularyDetails,
  setLocation,
  setLocationHome,
  clearApplication,
  setModeLob,
  getFormularyVersionsStart,
  getFormularyVersionsSuccess,
  getFormularyVersionsFailure,
} = application.actions;

export default application.reducer;
