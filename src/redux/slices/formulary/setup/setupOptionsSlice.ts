import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Formulary } from "./formulary";
import {
  getGeneralOptions,
  getSubMthsOptions,
  getStatesOptions,
  getMedicareOptions,
  getMedicaidOptions,
  getDesignOptions,
  getSupplementalOptions,
  getTierOptions,
  getResemblingFormularies,
} from "./setupOptionsService";

interface SetupOptionsState {
  generalOptions: GeneralOptions | any;
  medicareOptions: MedicareOptions | any;
  medicaidOptions: MedicaidOptions | any;
  designOptions: DesignOptions | any;
  supplementalOptions: SupplementalOptions | any;
  tierOptions: TierOptions | any;
  isLoading: boolean;
  error: string | null;
}

const setupOptionsInitialState: SetupOptionsState = {
  generalOptions: null,
  medicareOptions: null,
  medicaidOptions: null,
  designOptions: null,
  supplementalOptions: null,
  tierOptions: null,
  isLoading: false,
  error: null,
};

export interface GeneralOptions {
  formularyType: any[];
  contractYear: any[];
  submission_months: any[];
  classification_systems: any[];
  states: any[];
  clone_source_formularies: any[];
  resembling_formularies: any[];
}

const generalOptionsInitialState: GeneralOptions = {
  formularyType: [],
  contractYear: [],
  submission_months: [],
  classification_systems: [],
  states: [],
  clone_source_formularies: [],
  resembling_formularies: [],
};

export interface MedicareOptions {
  contract_types: any[];
}

export interface MedicaidOptions {
  carve_outs: any[];
}

export interface DesignOptions {
  designs: any[];
}

export interface SupplementalOptions {
  supplementals: any[];
}

export interface TierOptions {
  tier: any[];
}

interface TypeAndId {
  type: number;
  id: number;
}

function startLoading(state: SetupOptionsState) {
  state.isLoading = true;
}

function loadingFailed(
  state: SetupOptionsState,
  action: PayloadAction<string>
) {
  state.isLoading = false;
  state.error = action.payload;
}

const setup = createSlice({
  name: "setupOptions",
  initialState: setupOptionsInitialState,
  reducers: {
    getGeneralOptionsStart: startLoading,
    getGeneralOptionsSuccess(
      state,
      { payload }: PayloadAction<GeneralOptions>
    ) {
      if (!state.generalOptions) {
        state.generalOptions = {};
        state.generalOptions = generalOptionsInitialState;
      }
      state.generalOptions.formularyType = payload?.formularyType;
      state.generalOptions.contractYear = payload?.contractYear;
      state.generalOptions.classification_systems =
        payload?.classification_systems;
      state.generalOptions.clone_source_formularies =
        payload?.clone_source_formularies;
      state.isLoading = false;
      state.error = null;
    },
    getGeneralOptionsFailure: loadingFailed,

    getSubMthsOptionsStart: startLoading,
    getSubMthsOptionsSuccess(
      state,
      { payload }: PayloadAction<GeneralOptions>
    ) {
      if (!state.generalOptions) {
        state.generalOptions = {};
        state.generalOptions = generalOptionsInitialState;
      }
      state.generalOptions.submission_months = payload?.submission_months;
      state.isLoading = false;
      state.error = null;
    },
    getSubMthsOptionsFailure: loadingFailed,

    getStatesOptionsStart: startLoading,
    getStatesOptionsSuccess(state, { payload }: PayloadAction<GeneralOptions>) {
      if (!state.generalOptions) {
        state.generalOptions = {};
        state.generalOptions = generalOptionsInitialState;
      }
      state.generalOptions.states = payload?.states;
      state.isLoading = false;
      state.error = null;
    },
    getStatesOptionsFailure: loadingFailed,

    getResemblingFlsOptionsStart: startLoading,
    getResemblingFlsOptionsSuccess(
      state,
      { payload }: PayloadAction<GeneralOptions>
    ) {
      if (!state.generalOptions) {
        state.generalOptions = {};
        state.generalOptions = generalOptionsInitialState;
      }
      state.generalOptions.resembling_formularies =
        payload?.resembling_formularies;
      state.isLoading = false;
      state.error = null;
    },
    getResemblingFlsOptionsFailure: loadingFailed,

    getMedicareOptionsStart: startLoading,
    getMedicareOptionsSuccess(
      state,
      { payload }: PayloadAction<MedicareOptions>
    ) {
      state.medicareOptions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getMedicareOptionsFailure: loadingFailed,

    getMedicaidOptionsStart: startLoading,
    getMedicaidOptionsSuccess(
      state,
      { payload }: PayloadAction<MedicaidOptions>
    ) {
      state.medicaidOptions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getMedicaidOptionsFailure: loadingFailed,

    getDesignOptionsStart: startLoading,
    getDesignOptionsSuccess(state, { payload }: PayloadAction<DesignOptions>) {
      state.designOptions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getDesignOptionsFailure: loadingFailed,

    getTierOptionsStart: startLoading,
    getTierOptionsSuccess(state, { payload }: PayloadAction<TierOptions>) {
      state.tierOptions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getTierOptionsFailure: loadingFailed,

    getSupplementalOptionsStart: startLoading,
    getSupplementalOptionsSuccess(
      state,
      { payload }: PayloadAction<SupplementalOptions>
    ) {
      state.supplementalOptions = payload;
      state.isLoading = false;
      state.error = null;
    },
    getSupplementalOptionsFailure: loadingFailed,

    clearSetupOptions(state, { payload }: PayloadAction<any>) {
      state.medicareOptions = null;
      state.designOptions = null;
      state.supplementalOptions = null;
      state.tierOptions = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const fetchGeneralOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    //console.log("***** fetchGeneralOptions : " + input);
    try {
      dispatch(getGeneralOptionsStart());
      const genOptions: any = await getGeneralOptions(input.type, input.id);
      //console.log("*** genOptions : ", genOptions);
      dispatch(getGeneralOptionsSuccess(genOptions));
    } catch (err) {
      //console.log("***** fetchGeneralOptions AC - ERROR ");
      dispatch(getGeneralOptionsFailure(err.toString()));
    }
  }
);

export const fetchSubMthsOptions = createAsyncThunk(
  "setupOptions",
  async (year: number, { dispatch }) => {
    // console.log("***** fetchSubMthsOptions");
    try {
      dispatch(getSubMthsOptionsStart());
      const options: any = await getSubMthsOptions(year);
      // console.log("*** options : ", options);
      dispatch(getSubMthsOptionsSuccess(options));
    } catch (err) {
      //console.log("*****  AC - ERROR ");
      dispatch(getSubMthsOptionsFailure(err.toString()));
    }
  }
);

export const fetchStatesOptions = createAsyncThunk(
  "setupOptions",
  async (type: number, { dispatch }) => {
    // console.log("***** fetchStatesOptions (" + formulary_type + ")");
    try {
      dispatch(getStatesOptionsStart());
      const options: any = await getStatesOptions(type);
      // console.log("*** options : ", options);
      dispatch(getStatesOptionsSuccess(options));
    } catch (err) {
      //console.log("***** fetchStatesOptions AC - ERROR ");
      dispatch(getStatesOptionsFailure(err.toString()));
    }
  }
);

export const fetchResemblingFlsOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    // console.log("***** fetchSubMthsOptions");
    try {
      dispatch(getResemblingFlsOptionsStart());
      const options: any = await getResemblingFormularies(input.type);
      // console.log("*** options : ", options);
      dispatch(getResemblingFlsOptionsSuccess(options));
    } catch (err) {
      //console.log("*****  AC - ERROR ");
      dispatch(getResemblingFlsOptionsFailure(err.toString()));
    }
  }
);

export const fetchMedicareOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    // console.log("***** fetchMedicareOptions  " + input);
    try {
      dispatch(getMedicareOptionsStart());
      const options: any = await getMedicareOptions(input.type, input.id);
      //console.log("*** options : ", options);
      dispatch(getMedicareOptionsSuccess(options));
    } catch (err) {
      //console.log("*****  AC - ERROR ");
      dispatch(getMedicareOptionsFailure(err.toString()));
    }
  }
);

export const fetchMedicaidOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    console.log("***** fetchMedicaidOptions  " + input);
    try {
      dispatch(getMedicaidOptionsStart());
      const options: any = await getMedicaidOptions(input.type, input.id);
      //console.log("*** options : ", options);
      dispatch(getMedicaidOptionsSuccess(options));
    } catch (err) {
      //console.log("*****  AC - ERROR ");
      dispatch(getMedicaidOptionsFailure(err.toString()));
    }
  }
);

export const fetchDesignOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    // console.log("***** fetchDesignOptions AC ");
    try {
      dispatch(getDesignOptionsStart());
      const options: any = await getDesignOptions(input.type, input.id);
      //console.log("*** options : ", options);
      dispatch(getDesignOptionsSuccess(options));
    } catch (err) {
      //console.log("*****  AC - ERROR ");
      dispatch(getDesignOptionsFailure(err.toString()));
    }
  }
);

export const fetchTierOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    //console.log("***** fetchTierOptions AC ");
    try {
      dispatch(getTierOptionsStart());
      const options: any = await getTierOptions(input.type, input.id, 0);
      //console.log("*** options : ", options);
      if (input.type === 5 || input.type === 6) {
        let AddNew: any = {
          id_tier_label: -1,
          tier_label: "Add New",
          display_text: "",
          code_value: "",
        };
        let optionsWithAddNew: any = [AddNew, ...options];
        //console.log(optionsWithAddNew);
        dispatch(getTierOptionsSuccess(optionsWithAddNew));
      } else {
        dispatch(getTierOptionsSuccess(options));
      }
    } catch (err) {
      //console.log("***** fetchTierOptions AC - ERROR ");
      dispatch(getTierOptionsFailure(err.toString()));
    }
  }
);

export const fetchSupplementalOptions = createAsyncThunk(
  "setupOptions",
  async (input: TypeAndId, { dispatch }) => {
    //console.log("***** fetchSupplementalOptions AC ");
    try {
      dispatch(getSupplementalOptionsStart());
      const options: any = await getSupplementalOptions(input.type, input.id);
      //console.log("*** options : ", options);
      dispatch(getSupplementalOptionsSuccess(options));
    } catch (err) {
      //console.log("*****  AC - ERROR ");
      dispatch(getSupplementalOptionsFailure(err.toString()));
    }
  }
);

// export const manageFormularyType = createAsyncThunk(
//   "setupOptions",
//   async (input: TypeAndId, { dispatch }) => {
//     const type = input.type;
//     const id = input.id;

//     console.log(" TYPE :: " + type + " - " + id);

//     if (type === -1) {
//       dispatch(fetchGeneralOptions({ type: 1, id: -1 }));
//       return;
//     }

//     dispatch(fetchGeneralOptions({ type: type, id: id }));
//     dispatch(fetchDesignOptions({ type: type, id: id }));
//     dispatch(fetchTierOptions({ type: type, id: id }));

//     if (type === 1) {
//       dispatch(fetchMedicareOptions({ type: type, id: id }));
//       dispatch(fetchSupplementalOptions({ type: type, id: id }));
//     } else if (type === 2) {
//       dispatch(fetchStatesOptions(type));
//       dispatch(fetchMedicareOptions({ type: type, id: id }));
//       dispatch(fetchSupplementalOptions({ type: type, id: id }));
//     } else if (type === 3) {
//       // TODO ... MEDICADE...
//       dispatch(fetchStatesOptions(0));
//     } else if (type === 4) {
//       // TODO ... MEDICADE...
//       dispatch(fetchStatesOptions(0));
//     } else if (type === 5) {
//     } else if (type === 6) {
//       // COMMERCIAL...
//     }
//     dispatch(fetchSubMthsOptions(2021));
//   }
// );

export const {
  getGeneralOptionsStart,
  getGeneralOptionsSuccess,
  getGeneralOptionsFailure,

  getStatesOptionsStart,
  getStatesOptionsSuccess,
  getStatesOptionsFailure,

  getSubMthsOptionsStart,
  getSubMthsOptionsSuccess,
  getSubMthsOptionsFailure,

  getResemblingFlsOptionsStart,
  getResemblingFlsOptionsSuccess,
  getResemblingFlsOptionsFailure,

  getMedicareOptionsStart,
  getMedicareOptionsSuccess,
  getMedicareOptionsFailure,

  getMedicaidOptionsStart,
  getMedicaidOptionsSuccess,
  getMedicaidOptionsFailure,

  getDesignOptionsStart,
  getDesignOptionsSuccess,
  getDesignOptionsFailure,
  getTierOptionsStart,
  getTierOptionsSuccess,
  getTierOptionsFailure,
  getSupplementalOptionsStart,
  getSupplementalOptionsSuccess,
  getSupplementalOptionsFailure,
  clearSetupOptions,
} = setup.actions;

export default setup.reducer;
