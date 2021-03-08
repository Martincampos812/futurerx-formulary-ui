import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getLandingData } from "./maintenanceService";
import {
  getcontractYeares,
  getFormularyList,
  getSubmissionMonths,
  saveSetup,
  saveAndContinueSetup,
} from "./maintenanceSetupService";
import {
  getLandingData,
  getMassMaintenanceCompleteData,
  getMassMaintenanceTierAssignmentData,
  getMaintenanceFormulariesInfoData,
} from "./maintenanceService";

interface MaintenanceState {
  landing: LandingData | any;
  isLoading: boolean;
  error: string | null;
  setupOptions: SetupData;
  selectedFormularies: LandingData | any;
  tierAssignment: LandingData | any;
  selectedRow: any;
  maintenanceFormularies: any;
}

export interface LandingData {
  list: any[];
  count: number;
}

export interface SetupData {
  list: any[];
  count: number;
  contract_year: any[];
  submission_months: any[];
  id_formulary_maintenance: any;
  
}

const maintenanceStateInitial: MaintenanceState = {
  landing: { list: [], count: 0 },
  isLoading: false,
  error: null,
  setupOptions: {
    list: [],
    count: 0,
    contract_year: [],
    submission_months: [],
    id_formulary_maintenance: null,
  },
  selectedFormularies: { list: [], count: 0 },
  tierAssignment: { list: [], count: 0 },
  selectedRow: {},
  maintenanceFormularies:{},
};

function startLoading(state: MaintenanceState) {
  state.isLoading = true;
}

function loadingFailed(state: MaintenanceState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const maintenance = createSlice({
  name: "maintenance",
  initialState: maintenanceStateInitial,
  reducers: {
    getLandingDataStart: startLoading,
    getSelectedFormulariesSuccess(
      state,
      { payload }: PayloadAction<LandingData>
    ) {
      console.log("***** getFormulariesSuccess ");
      const { list, count } = payload;
      //   console.log("COUNT : ", count);
      //   console.log("LIST : ", list);
      state.selectedFormularies.list = list;
      state.selectedFormularies.count = count;
      state.isLoading = false;
      state.error = null;
    },
    getTierAssignSuccess(state, { payload }: PayloadAction<LandingData>) {
      console.log("***** getFormulariesSuccess ");
      const { list, count } = payload;
      //   console.log("COUNT : ", count);
      //   console.log("LIST : ", list);
      state.tierAssignment.list = list;
      state.tierAssignment.count = count;
      state.isLoading = false;
      state.error = null;
    },
    getLandingDataSuccess(state, { payload }: PayloadAction<LandingData>) {
      console.log("***** getFormulariesSuccess ");
      const { list, count } = payload;
      //   console.log("COUNT : ", count);
      //   console.log("LIST : ", list);
      state.landing.list = list;
      state.landing.count = count;
      state.isLoading = false;
      state.error = null;
    },
    getSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },
    getLandingDataFailure: loadingFailed,
    getcontractYearesSuccess(state, { payload }) {
      console.log(state.setupOptions);
      console.log(payload);
      state.setupOptions.contract_year = payload.data;
    },
    getFomularyListSuccess(state, { payload }) {
      console.log("{payload}:", payload);
      state.setupOptions.list = payload.data.data;
      state.setupOptions.count = payload.data.count;
    },
    getMaintenanceFormulariesInfoSuccess(state, { payload }) {
      console.log("{payload}:", payload);
      debugger;
      state.maintenanceFormularies.list = payload.list;
      state.maintenanceFormularies.count = payload.count;
    },
    getSubmissionMonthsSuccess(state, { payload }) {
      console.log("{payload}:", payload);
      state.setupOptions.submission_months = payload.data.data;
      //   state.setupOptions.count = payload.data.count;
    },
    setFormularyMaintenanceId(state, { payload }) {
      console.log("{payload}", payload);
      state.setupOptions.id_formulary_maintenance =
        payload.id_formulary_maintenance;
    },
  },
});

export const fetchLandingData = createAsyncThunk(
  "LandingData",
  async (payload: any, { dispatch }) => {
    console.log("***** fetchLandingData");
    try {
      dispatch(getLandingDataStart());
      const data: any = await getLandingData(payload);
      console.log("DATA : ", data);
      if (data) {
        dispatch(getLandingDataSuccess(data));
      }
    } catch (err) {
      console.log("***** fetchLandingData - Error ");
      dispatch(getLandingDataFailure(err.toString()));
    }
  }
);

export const getMaintenanceFormulariesInfo = createAsyncThunk(
  "maintenanceFormulariesInfo",
  async (payload: any, { dispatch }) => {
    console.log("***** maintenanceFormulariesInfo");
    try {
      dispatch(getLandingDataStart());
      const data: any = await getMaintenanceFormulariesInfoData(payload);
      console.log("DATA : ", data);
      debugger;
      if (data) {
        dispatch(getMaintenanceFormulariesInfoSuccess(data));
      }
    } catch (err) {
      console.log("***** maintenanceFormulariesInfo - Error ");
      dispatch(getLandingDataFailure(err.toString()));
    }
  }
);



export const fetchContractYearData = createAsyncThunk(
  "contractyear",
  async (pay, { dispatch }) => {
    try {
      dispatch(getLandingDataStart());
      const data: any = await getcontractYeares();
      console.log("contractyear:data", data);
      if (data) {
        dispatch(getcontractYearesSuccess(data));
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchSubmissionMonths = createAsyncThunk(
  "submissionMonths",
  async (payload: any, { dispatch }) => {
    try {
      // dispatch(getLandingDataStart());
      const data: any = await getSubmissionMonths(payload);
      console.log("contractyear:data", data);
      if (data) {
        dispatch(getSubmissionMonthsSuccess(data));
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchFormularyList = createAsyncThunk(
  "getFormularList",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(getLandingDataStart());
      const data: any = await getFormularyList(payload);
      console.log("{formularyList}:", data);
      dispatch(getFomularyListSuccess(data));
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchCompleteTabData = createAsyncThunk(
  "setupOptions",
  async (payload: any, { dispatch }) => {
    console.log("***** fetchCompleteTabData");
    try {
      dispatch(getLandingDataStart());
      const data: any = await getMassMaintenanceCompleteData(payload);
      console.log("DATA : ", data);
      if (data) {
        dispatch(getSelectedFormulariesSuccess(data));
        return data;
      }
    } catch (err) {
      console.log("***** fetchCompleteTabData - Error ");
      dispatch(getLandingDataFailure(err.toString()));
    }
  }
);

export const setSelectedRow = createAsyncThunk(
  "setupOptions",
  async (payload: any, { dispatch }) => {
    console.log("***** fetchCompleteTabData");
    try {
      // dispatch(getLandingDataStart());
      // const data: any = await getMassMaintenanceCompleteData(payload);
      // console.log("DATA : ", data);
      if (payload) {
        dispatch(getSelectedRow(payload));
      }
    } catch (err) {
      console.log("***** fetchCompleteTabData - Error ");
      // dispatch(getLandingDataFailure(err.toString()));
    }
  }
);

//setup save
export const save = createAsyncThunk(
  "setup/save",
  async (payload: any, { dispatch }) => {
    console.log("save");
    try {
      const response = await saveSetup(payload);
      console.log(response);
      if (response) {
        dispatch(setFormularyMaintenanceId(response));
        return response;
      }
    } catch (err) {
      return err;
      console.log("{save:error}", err);
    }
  }
);

export const saveAndContinue = createAsyncThunk(
  "setup/save",
  async (payload: any, { dispatch }) => {
    console.log("save");
    try {
      const response = await saveAndContinueSetup(payload);
      console.log(response);
      if (response) {
        dispatch(setFormularyMaintenanceId(response));
        return response;
      }
    } catch (err) {
      return err;
      console.log("{save:error}", err);
    }
  }
);

export const fetchTierAssignmentData = createAsyncThunk(
  "LandingData",
  async (payload: any, { dispatch }) => {
    console.log("***** fetchLandingData");
    try {
      dispatch(getLandingDataStart());
      const data: any = await getMassMaintenanceTierAssignmentData(payload);
      console.log("DATA : ", data);
      if (data) {
        dispatch(getTierAssignSuccess(data));
      }
    } catch (err) {
      console.log("***** fetchLandingData - Error ");
      dispatch(getLandingDataFailure(err.toString()));
    }
  }
);

export const {
  getLandingDataStart,
  getLandingDataSuccess,
  getcontractYearesSuccess,
  getFomularyListSuccess,
  getSubmissionMonthsSuccess,
  getLandingDataFailure,
  getSelectedFormulariesSuccess,
  getMaintenanceFormulariesInfoSuccess,
  getTierAssignSuccess,
  getSelectedRow,
  setFormularyMaintenanceId,
} = maintenance.actions;

export default maintenance.reducer;
