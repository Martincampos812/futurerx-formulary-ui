import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFormularyLobs,
  postAlternative,
  getRequestApi,
  postRequestApi,
  putRequestApi,
} from "./alternativeServices";
import { IFormularyLobs } from "./alternativeResponseModel";

// Alternative Model
interface AlternativeStateModel {
  isLoading: true | false;
  payload: {
    lobs: IFormularyLobs | null;
    drugs: any | null;
    alternatives: any[];
    formularies: any | null;
    alternativesSearch: any[];
    response: any | null;
  };
  error: any | any[] | null;
}

// Initial state
const alternativeState: AlternativeStateModel = {
  isLoading: false,
  payload: {
    lobs: null,
    drugs: null,
    alternatives: [],
    formularies: null,
    alternativesSearch: [],
    response: null,
  },
  error: null,
};

function loading(state) {
  state.isLoading = true;
}

function catchFailure(state: AlternativeStateModel, { payload }) {
  state.isLoading = false;
  state.error = payload;
}

// Slice for alternatives
export const alternativeSlice = createSlice({
  name: "ALTERNATIVE_API_ACTIONS",
  initialState: alternativeState,
  reducers: {
    startLoading: loading,
    failure: catchFailure,
    reloadStateSuccess: (state, { payload }: any) => {
      state.isLoading = payload.isLoading;
      state.payload = { ...payload.payload };
      state.error = payload.error;
    },
    getFormularyLobsSuccess: (state, { payload }: any | any[]) => {
      state.isLoading = false;
      state.payload.lobs = payload.result;
      state.error = null;
    },
    getDrugsListSuccess: (state, { payload }: any | any[]) => {
      state.payload.drugs = payload;
      state.error = null;
      state.isLoading = false;
    },
    getAlternativesListSuccess: (state, { payload }: any | any[]) => {
      state.payload.alternatives = payload.data.map((rowData, index) => {
        const row = { ...rowData };
        row["priority"] = index + 1;
        row["index"] = index + 1;
        row["key"] = (index + 1).toString();
        return row;
      });
      state.error = null;
      state.isLoading = false;
    },
    getFormulariesListSuccess: (state, { payload }: any | any[]) => {
      state.payload.formularies = payload;
      state.error = null;
      state.isLoading = false;
    },
    saveFormulariesListSuccess: (state, { payload }: any | any[]) => {
      state.payload.response = payload;
      state.error = null;
      state.isLoading = false;
    },
    searchAlternativesSuccess: (state, { payload }: any | any[]) => {
      state.payload.alternativesSearch = payload.data.slice(0, 8);
      state.error = null;
    },
    saveAlternativeSuccess: (state, { payload }: any | any[]) => {
      state.payload.alternatives.some((alternative, index) => {
        if (alternative.id_alternative_drug === null) {
          // setting the updated value here
          state.payload.alternatives[index] = {
            id_alternative_drug: payload.id_alternative_drug,
            alternative_rxcui: alternative.alternative_rxcui,
            priority: alternative.priority,
            label_name: alternative.label_name,
            index: alternative.priority,
            key: alternative.priority.toString(),
          };
          return true;
        }
        return null;
      });
      state.error = null;
      state.isLoading = false;
    },
  },
  // extraReducers:
});

// action to refresh alternative state
export const loadInitialState = createAsyncThunk(
  "Alternative-InitialStateLoad",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(reloadStateSuccess(payload));
    } catch (err) {
      dispatch(failure(err.toString()));
    }
  }
);

// actions fetch lobs
export const fetchFormularyLobs = createAsyncThunk(
  "Alternative-FormularyLobs",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(startLoading());
      const response: any = await getFormularyLobs();
      if (response.message === "ok") {
        dispatch(getFormularyLobsSuccess(response));
      } else {
        dispatch(failure(response));
      }
    } catch (err) {
      dispatch(failure(err.toString()));
    }
  }
);

// actions for fetch drugs list
export const fetchDrugsList = createAsyncThunk(
  "Alternative-DrugsList",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(startLoading());
      const response: any = await postRequestApi(payload);
      if (response.message === "ok") {
        dispatch(getDrugsListSuccess(response));
      } else {
        dispatch(failure(response));
      }
    } catch (err) {
      dispatch(failure(err.toString()));
    }
  }
);

// actions for post alternatives-drugs and fetch alternatives list
export const updateDrugsListAlternativeAndFetchAlternatives = createAsyncThunk(
  "Alternative-DrugsListUpdateAndAlternativesList",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(startLoading());
      const response: any = await postRequestApi(payload.update);
      if (response.message === "ok") {
        const alternativesList: any = await postRequestApi(
          payload.alternatives
        );
        if (alternativesList.message === "ok") {
          dispatch(getAlternativesListSuccess(alternativesList));
        } else {
          dispatch(failure(alternativesList));
        }
      } else {
        dispatch(failure(response));
      }
    } catch (err) {
      dispatch(failure(err.toString()));
    }
  }
);

// actions for post alternatives-drugs and fetch alternatives list
export const updateAlternatives = createAsyncThunk(
  "Alternative-UpdateAlternatives",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(startLoading());
      dispatch(getAlternativesListSuccess(payload));
    } catch (err) {
      dispatch(failure(err.toString()));
    }
  }
);

// actions for put priorities list update and fetch formularies list
export const updatePrioritiesListAndFetchFormulariesList = createAsyncThunk(
  "Alternative-PrioritiesUpdateAndFormularies",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(startLoading());
      let response: any;
      if (payload.onlyFetchFormulariesList) response = { message: "ok" };
      else response = await putRequestApi(payload.update);
      if (response.message === "ok") {
        const formulariesList: any = await postRequestApi(payload.formularies);
        if (formulariesList.message === "ok") {
          dispatch(getFormulariesListSuccess(formulariesList));
        } else {
          dispatch(failure(formulariesList));
        }
      } else {
        dispatch(failure(response));
      }
    } catch (err) {
      dispatch(failure(err.toString()));
    }
  }
);

// actions for save formulary with added alternatives
export const saveFormularyWithAddedAlternatives = createAsyncThunk(
  "Alternative-SaveFormularyWithAddedAlternatives",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(startLoading());
      const response: any = await postRequestApi(payload);
      if (response.message === "ok") {
        dispatch(saveFormulariesListSuccess(response));
      } else {
        dispatch(failure(response));
      }
    } catch (err) {
      dispatch(failure(err.toString()));
    }
  }
);

// actions for searching alternative
export const searchAlternatives = createAsyncThunk(
  "Alternative-SearchAlternatives",
  async (payload: any, { dispatch }) => {
    try {
      const response: any = await getRequestApi(payload);
      if (response.message === "ok") {
        dispatch(searchAlternativesSuccess(response));
      } else {
        dispatch(failure(response));
      }
    } catch (err) {
      dispatch(failure(err.toString()));
    }
  }
);

// actions for searching alternative
export const addAlternative = createAsyncThunk(
  "Alternative-AddAlternative",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(startLoading());
      const response: any = await postAlternative(payload);
      if (response.message === "ok") {
        dispatch(saveAlternativeSuccess(response));
      } else {
        dispatch(failure(response));
      }
    } catch (err) {
      dispatch(failure(err.toString()));
    }
  }
);

export const {
  startLoading,
  failure,
  reloadStateSuccess,
  getFormularyLobsSuccess,
  getDrugsListSuccess,
  getAlternativesListSuccess,
  getFormulariesListSuccess,
  saveFormulariesListSuccess,
  searchAlternativesSuccess,
  saveAlternativeSuccess,
} = alternativeSlice.actions;

export default alternativeSlice.reducer;
