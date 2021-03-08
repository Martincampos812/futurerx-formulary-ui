import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequestApi,
  postRequestApi,
  mapNotesToValidations,
} from "./validationServices";
// import {
//   getValidationList,
//   getValidationListNotes,
//   postValidationListNote,
//   clearValidationListNotes,
// } from "./validationActionCreation";
// import {
//   actionFulfilled,
//   actionRejected,
//   actionValidationNotesListFulfilled,
//   actionValidationNotesListRejected,
// } from "./validationReducers";
interface ValidationStateModel {
  isLoading: true | false;
  payload: {
    validations: any;
    notes: any | null;
    response: any | null;
  };
  error: any | any[] | null;
}

// Initial state
const validationState: ValidationStateModel = {
  isLoading: false,
  payload: {
    validations: {},
    notes: null,
    response: null,
  },
  error: null,
};

function loading(state) {
  state.isLoading = true;
}

function catchFailure(state: ValidationStateModel, payload) {
  state.isLoading = false;
  state.error = payload;
}

// Slice for validations
export const validationSlice = createSlice({
  name: "VALIDATION_API_ACTIONS",
  initialState: validationState,
  reducers: {
    startLoading: loading,
    failure: catchFailure,
    reloadStateSuccess: (state, { payload }: any) => {
      state.isLoading = payload.isLoading;
      state.payload = { ...payload.payload };
      state.error = payload.error;
    },
    getValidationsSuccess: (state, { payload }: any | any[]) => {
      state.payload.validations = {
        summary: payload.result.validation_summary,
        list: payload.result.validations,
      };
      state.isLoading = false;
    },
    getNotesSuccess: (state, { payload }: any | any[]) => {
      const valId = payload.id;
      const notes = payload.result;
      state.payload.validations.list.forEach((val) => {
        if (valId === val.id_formulary_validation) {
          val["notes"] = notes;
        }
      });
      state.payload.notes = { ...state.payload.notes, [valId]: notes };
      state.isLoading = false;
    },
    postNoteSuccess: (state, { payload }: any | any[]) => {
      const { id, validations, notes, response } = mapNotesToValidations(
        payload
      );
      state.payload.validations = {
        ...state.payload.validations,
        list: validations,
      };
      state.payload.notes = { ...state.payload.notes, [id]: notes };
      state.payload.response = response;
      state.isLoading = false;
    },
  },
  // extraReducers:
});

// action to refresh validation state
export const loadInitialState = createAsyncThunk(
  "Validation-InitialStateLoad",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(reloadStateSuccess(payload));
    } catch (err) {
      dispatch(failure(err));
    }
  }
);

// actions fetch validations
export const fetchValidations = createAsyncThunk(
  "Validation-GetAallValidations",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(startLoading());
      const response: any = await getRequestApi(payload);
      if (response.message === "ok") {
        dispatch(getValidationsSuccess(response));
      } else {
        dispatch(failure(response));
      }
    } catch (err) {
      dispatch(failure(err));
    }
  }
);

// actions fetch notes per validation
export const fetchNotes = createAsyncThunk(
  "Validation-GetAllNotes",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(startLoading());
      const response: any = await getRequestApi(payload);
      response.id = payload.pathParams;
      if (response.message === "ok") {
        dispatch(getNotesSuccess(response));
      } else {
        dispatch(failure(response));
      }
    } catch (err) {
      dispatch(failure(err));
    }
  }
);

// actions to create note per validation
export const postNote = createAsyncThunk(
  "Validation-PostNote",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(startLoading());
      const addNoteRes: any = await postRequestApi(payload.addNote);
      if (addNoteRes.message === "ok") {
        const valRes: any = await getRequestApi(payload.getValidations);
        if (valRes.message === "ok") {
          const notesRes: any = await getRequestApi(payload.mapNotes);
          notesRes.id = payload.mapNotes.pathParams;
          if (notesRes.message === "ok") {
            dispatch(
              postNoteSuccess({
                id: notesRes.id,
                list: valRes.result,
                notes: notesRes.result,
                response: addNoteRes,
              })
            );
          } else {
            dispatch(failure(notesRes));
          }
        } else {
          dispatch(failure(valRes));
        }
      } else {
        dispatch(failure(addNoteRes));
      }
    } catch (err) {
      dispatch(failure(err));
    }
  }
);

export const {
  startLoading,
  failure,
  reloadStateSuccess,
  getValidationsSuccess,
  getNotesSuccess,
  postNoteSuccess,
} = validationSlice.actions;

export default validationSlice.reducer;

// interface ValidationNotes {
//   validationNotesListData: object;
//   isLoading: boolean;
// }

// // Init State
// const validationState: any = {
//   validationData: {},
//   isLoading: false,
// };
// const validationNoteState: ValidationNotes = {
//   validationNotesListData: {},
//   isLoading: false,
// };

// Slice
// export const validationList = createSlice({
//   name: "validation-formulary",
//   initialState: validationState,
//   reducers: {},
//   extraReducers: (builder) => (
//     builder.addCase(getValidationList.pending, (state, action) => {
//       state.isLoading = true;
//     }),
//     builder.addCase(getValidationList.fulfilled, (state, action) => {
//       actionFulfilled(state, action);
//     }),
//     builder.addCase(getValidationList.rejected, (state, action) => {
//       actionRejected(state, action);
//     })
//   ),
// });

// // Slice
// export const validationNotesList = createSlice({
//   name: "validation-formulary/notes",
//   initialState: validationNoteState,
//   reducers: {},
//   extraReducers: (builder) => (
//     builder.addCase(getValidationListNotes.pending, (state, action) => {
//       state.isLoading = true;
//     }),
//     builder.addCase(getValidationListNotes.fulfilled, (state, action) => {
//       actionValidationNotesListFulfilled(state, action);
//     }),
//     builder.addCase(getValidationListNotes.rejected, (state, action) => {
//       actionValidationNotesListRejected(state, action);
//     })
//     // builder.addCase(postValidationListNote.pending, (state, action) => {
//     //   // state.validationNotesListData = action.payload;
//     // }),
//     // builder.addCase(postValidationListNote.fulfilled, (state, action) => {
//     //   // state.validationNotesListData = action.payload;
//     // }),
//     // builder.addCase(postValidationListNote.rejected, (state, action) => {
//     //   // state.validationNotesListData = action.payload;
//     // })
//   ),
// });
