import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveStGroup,editStGroup,deleteStGroup,cloneStGroup,archiveStGroup,newVersionStGroup } from "./services";

interface GDMState {
  formulary_id: number;
  isLoading: boolean;
  error: string | null;
  current_group_id:any;
  current_group_des_id:any;
  success:any;
}

const GDMInitialState: GDMState = {
  formulary_id: 0,
  isLoading: true,
  error: null,
  current_group_id:0,
  current_group_des_id:0,
  success:null
};

export interface GDMSaveResponse {
  success:any;
}

interface StGroupResult {
  formulary_id: any;
  current_group_id: any;
  current_group_des_id: any
}

interface StMessage {
  error: any;
  success:any;
}


function startLoading(state: GDMState) {
  state.isLoading = true;
}

function loadingFailed(state: GDMState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.success = null;
  state.error = (action.payload["data"].errors)?action.payload["data"].errors:action.payload;
}

const gdm = createSlice({
  name: "gdm",
  initialState: GDMInitialState,
  reducers: {
    getPending: startLoading,
    getSuccess(state, { payload }: PayloadAction<GDMSaveResponse>) {
      state.error = null
      state.success = payload.success.data;
    },
    getFailed: loadingFailed,
    setStGroupDetails(state, { payload }: PayloadAction<StGroupResult>) {
      const {
        formulary_id,
        current_group_id,
        current_group_des_id,
      } = payload;
      state.formulary_id = formulary_id;
      state.current_group_id = current_group_id;
      state.current_group_des_id = current_group_des_id;
    },
    cleanMessages(state, { payload }: PayloadAction<StMessage>){
      state.error = payload.error;
      state.success = payload.error;
    }
  },
});

export const {
  getPending,
  getSuccess,
  getFailed,
  setStGroupDetails,
  cleanMessages
} = gdm.actions;

export default gdm.reducer;

export const saveGDM = createAsyncThunk(
  "gdm",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getPending());
      const response = await saveStGroup(arg);
      dispatch(getSuccess(response));
      return response;
    } catch (err) {
      dispatch(getFailed(err));
      return err;
    }
  }
);

export const editGDM = createAsyncThunk(
  "gdm",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getPending());
      const response = await editStGroup(arg);
      dispatch(getSuccess(response));
      return response;
    } catch (err) {
      dispatch(getFailed(err));
      return err;
    }
  }
);

export const getSTGroupDetails = createAsyncThunk(
  "gdmdetail",
  async (arg: any, { dispatch }) => {
    const obj = {
      formulary_id: arg.formulary_id,
      current_group_id: arg.current_group_id,
      current_group_des_id: arg.current_group_des_id
    };
    dispatch(setStGroupDetails(obj));
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
      const response = await deleteStGroup(arg);
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
      const response = await cloneStGroup(arg);
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
      const response = await archiveStGroup(arg);
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
      const response = await newVersionStGroup(arg);
      dispatch(getSuccess(response));
      return response;
    } catch (err) {
      dispatch(getFailed(err));
      return err;
    }
  }
);
