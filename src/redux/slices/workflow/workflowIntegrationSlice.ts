import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Claim,
  ClaimWorkPayload,
  NotePostPayload,
  SubTaskPayload,
  WorkflowRoutePayload,
  WorkflowState,
} from "./workflowAncillary";
import {
  getClaim,
  determineCase,
  getClaimStage,
  tryClaimWork,
  getNotes,
  postNote,
  getloadTaskDetails,
  postStageComplete,
  postSubTask,
} from "./workflowService";

const defaultWorkflowState: WorkflowState = {
  case: 0,
  claim: null,
  claimStage: null,
  taskDetails: null,
  notes: [],
  isLoading: false,
  error: null,
};

const workflow = createSlice({
  name: "workflow",
  initialState: defaultWorkflowState,
  reducers: {
    loadingStarted: onLoadingStarted,
    loadingFailed: onLoadingFailed,

    loadClaimSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** loadClaimSuccess ");

      console.log(payload);

      if (payload.code === "200") {
        state.claim = payload;
        state.case = determineCase(payload);
        state.isLoading = false;
        state.error = null;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    loadClaimStageSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** loadClaimStageSuccess ");

      console.log(payload);

      if (payload.code === "200") {
        state.claimStage = payload;
        state.isLoading = false;
        state.error = null;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    claimWorkSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** claimWorkSuccess ");

      console.log(payload);

      if (payload.code === "200") {
        state.isLoading = false;
        state.error = null;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    loadNotesSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** loadNotesSuccess ");
      console.log(payload);
      if (payload.code === "200") {
        state.notes = payload?.data;
        state.isLoading = false;
        state.error = null;
      } else {
        state.notes = [];
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    saveNoteSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** saveNoteSuccess ");
      console.log(payload);
      if (payload.code === "200") {
        state.isLoading = false;
        state.error = null;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    loadTaskDetailsSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** loadTaskDetailsSuccess ");
      console.log(payload);
      if (payload.code === "200") {
        state.taskDetails = payload.data;
        state.isLoading = false;
        state.error = null;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    stageCompleteSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** stageCompleteSuccess ");
      console.log(payload);
      if (payload.code === "200") {
        state.isLoading = false;
        state.error = null;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    saveSubTaskSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** saveSubTaskSuccess ");
      console.log(payload);
      if (payload.code === "200") {
        state.isLoading = false;
        state.error = null;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    }


  },
});

export const loadClaim = createAsyncThunk(
  "workflow",
  async (id_formulary: number, { dispatch }) => {
    console.log("***** loadClaim - Start");
    try {
      dispatch(loadingStarted);
      const response: any = await getClaim(id_formulary);
      if (response) {
        dispatch(loadClaimSuccess(response));
      }
    } catch (error) {
      console.log("***** loadClaim - Error ");
      dispatch(loadingFailed(error.toString()));
    }
  }
);



export const loadClaimStage = createAsyncThunk(
  "workflow",
  async (stage_id: number, { dispatch }) => {
    console.log("***** loadClaimStage - Start");
    try {
      dispatch(loadingStarted);
      const response: any = await getClaimStage(stage_id);
      if (response) {
        dispatch(loadClaimStageSuccess(response));
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.log("***** loadClaimStage - Error ");
      dispatch(loadingFailed(error.toString()));
    }
  }
);


export const loadTaskDetails = createAsyncThunk(
  "workflow",
  async (instance_id: number, { dispatch }) => {
    console.log("***** loadTaskDetails - Start");
    try {
      dispatch(loadingStarted);
      const response: any = await getloadTaskDetails(instance_id);
      if (response) {
        dispatch(loadTaskDetailsSuccess(response));
      }
    } catch (err) {
      console.log("***** loadTaskDetails - Error ");
      dispatch(loadingFailed(err.toString()));
    }
  }
);

export const claimWork = createAsyncThunk(
  "workflow",
  async (payload: ClaimWorkPayload, { dispatch }) => {
    console.log("***** claimWork - Start");
    try {
      dispatch(loadingStarted);
      const response: any = await tryClaimWork(payload);
      if (response) {
        dispatch(claimWorkSuccess(response));
      }
      return response;
    } catch (error) {
      console.log("***** claimWork - Error ");
      dispatch(loadingFailed(error.toString()));
    }
  }
);


export const stageComplete = createAsyncThunk(
  "workflow",
  async (payload: WorkflowRoutePayload, { dispatch }) => {
    console.log("***** stageComplete - Start");
    try {
      dispatch(loadingStarted);
      const response: any = await postStageComplete(payload);
      if (response) {
        dispatch(stageCompleteSuccess(response));
      }
      return response;
    } catch (err) {
      console.log("***** stageComplete - Error ");
      dispatch(loadingFailed(err.toString()));
    }
  }
);


export const saveSubTask = createAsyncThunk(
  "workflow",
  async (payload: SubTaskPayload, { dispatch }) => {
    console.log("***** saveNewTask - Start");
    try {
      dispatch(loadingStarted);
      const response: any = await postSubTask(payload);
      if (response) {
        dispatch(saveSubTaskSuccess(response));
        return response;
      }
    } catch (err) {
      console.log("***** saveSubTask - Error ");
      dispatch(loadingFailed(err.toString()));
    }
  }
);




export const loadNotes = createAsyncThunk(
  "workflow",
  async (instance_id: number, { dispatch }) => {
    console.log("***** loadNotes - Start");
    try {
      dispatch(loadingStarted);
      const response: any = await getNotes(instance_id);
      if (response) {
        dispatch(loadNotesSuccess(response));
      }
    } catch (err) {
      console.log("***** loadNotes - Error ");
      dispatch(loadingFailed(err.toString()));
    }
  }
);




export const saveNote = createAsyncThunk(
  "workflow",
  async (payload: NotePostPayload, { dispatch }) => {
    console.log("***** saveNote - Start");
    try {
      dispatch(loadingStarted);
      const response: any = await postNote(payload);
      if (response) {
        dispatch(saveNoteSuccess(response));
        return response;
      }
    } catch (err) {
      console.log("***** saveNote - Error ");
      dispatch(loadingFailed(err.toString()));
    }
  }
);

function onLoadingStarted(state: WorkflowState) {
  state.isLoading = true;
}

function onLoadingFailed(state: WorkflowState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

export const {
  loadingStarted,
  loadingFailed,
  loadClaimSuccess,
  loadClaimStageSuccess,
  claimWorkSuccess,
  loadNotesSuccess,
  saveNoteSuccess,
  loadTaskDetailsSuccess,
  stageCompleteSuccess,
  saveSubTaskSuccess
} = workflow.actions;

export default workflow.reducer;
