import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { savePaGroup,deletePaGroup,clonePaGroup,archivePaGroup,newVersionPaGroup } from "./services";

interface PAGDMState {
  formulary_id: number;
  isLoading: boolean;
  error: string | null;
  current_group_id:any;
  current_group_des_id:any;
  success:any;
}

const PAGDMInitialState: PAGDMState = {
  formulary_id: 0,
  isLoading: true,
  error: null,
  current_group_id:0,
  current_group_des_id:0,
  success:null
};

interface PaMessage {
  error: any;
  success:any;
}


export interface PAGDMSaveResponse {
  success:any;
}

interface StGroupResult {
  formulary_id: any;
  current_group_id: any;
  current_group_des_id: any
}

function startLoading(state: PAGDMState) {
  state.isLoading = true;
}

function loadingFailed(state: PAGDMState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.success = null;
  state.error = (action.payload["data"].errors)?action.payload["data"].errors:action.payload;
}

const gdm = createSlice({
  name: "gdm",
  initialState: PAGDMInitialState,
  reducers: {
    getPending: startLoading,
    getSuccess(state, { payload }: PayloadAction<PAGDMSaveResponse>) {
      state.error = null
      state.success = payload.success.data;
    },
    getFailed: loadingFailed,
    setPaGroupDetails(state, { payload }: PayloadAction<StGroupResult>) {
      const {
        formulary_id,
        current_group_id,
        current_group_des_id,
      } = payload;
      state.formulary_id = formulary_id;
      state.current_group_id = current_group_id;
      state.current_group_des_id = current_group_des_id;
    },
    cleanMessages(state, { payload }: PayloadAction<PaMessage>){
      state.error = payload.error;
      state.success = payload.error;
    }
  },
});

export const {
  getPending,
  getSuccess,
  getFailed,
  setPaGroupDetails,
  cleanMessages
} = gdm.actions;

export default gdm.reducer;

export const savePAGDM = createAsyncThunk(
  "gdm",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getPending());
      const response = await savePaGroup(arg);
      dispatch(getSuccess(response));
      return response;
    } catch (err) {
      dispatch(getFailed(err));
      return err;
    }
  }
);

export const getPAGroupDetails = createAsyncThunk(
  "gdmdetail",
  async (arg: any, { dispatch }) => {
    const obj = {
      formulary_id: arg.formulary_id,
      current_group_id: arg.current_group_id,
      current_group_des_id: arg.current_group_des_id
    };
    dispatch(setPaGroupDetails(obj));
  }
);

export const cleanMessage = createAsyncThunk(
  "gdmdetail",
  async (arg: any, { dispatch }) => {
    const obj = {
      error: arg.error,
      success: arg.success,
    }
    dispatch(cleanMessages(obj));
    
  }
);

export const deleteGroupDescription = createAsyncThunk(
  "delete_group_desc",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getPending());
      const response = await deletePaGroup(arg);
      dispatch(getSuccess(response));
      return response;
    } catch (err) {
      dispatch(getFailed(err));
      return err;
    }
  }
);

export const cloneGroupDescription = createAsyncThunk(
  "clone_group_desc",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getPending());
      const response = await clonePaGroup(arg);
      dispatch(getSuccess(response));
      return response;
    } catch (err) {
      dispatch(getFailed(err));
      return err;
    }
  }
);

export const archiveGroupDescription = createAsyncThunk(
  "archive_group_desc",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getPending());
      const response = await archivePaGroup(arg);
      dispatch(getSuccess(response));
      return response;
    } catch (err) {
      dispatch(getFailed(err));
      return err;
    }
  }
);

export const newVersionGroupDescription = createAsyncThunk(
  "newversion_group_desc",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getPending());
      const response = await newVersionPaGroup(arg);
      dispatch(getSuccess(response));
      return response;
    } catch (err) {
      dispatch(getFailed(err));
      return err;
    }
  }
);
