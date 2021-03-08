import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getImportFiles,
  getImportFileDetails,
  getChangeReports,
  getErrorDetails,
  downloadReportApi
} from "./formularyImportService";
import { postMessage } from "./../messaging/messagingSlice";

export interface ImportFile {
  id_formulary_file: number;
  file_name: string;
  code_value: string;
  file_type: string;
  import_status: null;
  user: string;
  logo_path: string;
  date_time: string;
  children: ImportFileChild[];
}
export interface ImportFileChild {
  id_formulary_file: number;
  file_name: string;
  code_value: string;
  file_type: string;
  import_status: null;
  user: string;
  logo_path: string;
  date_time: string;
}

export interface ImportFileDetails {
  id_formulary_import: number;
  import_file_name: string;
  server_file_path: string;
  import_status: string;
  user: string;
  logo_path: string;
  date_time: string;
  added_drug_count: number;
  removed_drug_count: number;
  updated_drug_count: number;
  total_drugs_processed: number;
  total_error_count: number;
  contract_year: number;
  formulary_name: string;
  cms_formulary_id: number;
  version_number: number;
}

export interface DetailsRequest {
  id_formulary: number;
  id_formulary_file: number;
  index: number;
  limit: number;
}

export interface ChangeDetail {
  id_formulary_change_log: number;
  record_value: string;
  file_type: string;
  change_type: string;
  filed_name: string;
  prior_value: string;
  new_value: string;
  date_time: string;
}

export interface ErrorDetail {
  id_formulary_error_log: number;
  record_value: string;
  file_type: string;
  field_value: string;
  error_description: string;
  filed_name: string;
  date_time: string;
}

export interface ChangeErrorRequest {
  id_formulary_import: number;
  index: number;
  limit: number;
  payload:any;
}
//  payload: { filter: []; search_key: string };

export interface FormularyImportState {
  isLoading: boolean;
  error: string | null;
  importFiles: ImportFile[];
  importFilesCount: number;
  importFileDetails: ImportFileDetails[];
  importFileDetailsCount: number;
  changeReports: ChangeDetail[];
  changeReportsCount: 0;
  errorDetails: ErrorDetail[];
  errorDetailsCount: 0;
}

const formularyImportStateInitial: FormularyImportState = {
  isLoading: false,
  error: null,
  importFiles: [],
  importFilesCount: 0,
  importFileDetails: [],
  importFileDetailsCount: 0,
  changeReports: [],
  changeReportsCount: 0,
  errorDetails: [],
  errorDetailsCount: 0,
};

function startLoading(state: FormularyImportState) {
  state.isLoading = true;
}

function loadingFailed(
  state: FormularyImportState,
  action: PayloadAction<string>
) {
  state.isLoading = false;
  state.error = action.payload;
}

const formularyImport = createSlice({
  name: "component",
  initialState: formularyImportStateInitial,
  reducers: {
    getImportFilesStart: startLoading,
    getImportFilesSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** getImportFilesSuccess ");
      if (payload.status === 200) {
        state.isLoading = false;
        state.error = null;
        state.importFiles = payload?.list;
        state.importFilesCount = payload?.count;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    getImportFilesFailure: loadingFailed,
    downloadReportSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** downloadReport ");
    },
    getImportFileDetailsStart: startLoading,
    getImportFileDetailsSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** getImportFilesSuccess ");
      if (payload.status === 200) {
        state.isLoading = false;
        state.error = null;
        state.importFileDetails = payload?.list;
        state.importFileDetailsCount = payload?.count;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    getImportFileDetailsFailure: loadingFailed,

    getChangeReportsStart: startLoading,
    getChangeReportsSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** getImportFilesSuccess ");
      if (payload.status === 200) {
        state.isLoading = false;
        state.error = null;
        state.changeReports = payload?.list;
        state.changeReportsCount = payload?.count;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    getChangeReportsFailure: loadingFailed,
    getErrorDetailsStart: startLoading,
    getErrorDetailsSuccess(state, { payload }: PayloadAction<any>) {
      console.log("***** getImportFilesSuccess ");
      if (payload.status === 200) {
        state.isLoading = false;
        state.error = null;
        state.errorDetails = payload?.list;
        state.errorDetailsCount = payload?.count;
      } else {
        state.isLoading = false;
        state.error = payload?.data?.message;
      }
    },
    getErrorDetailsFailure: loadingFailed,
  },
});

export const downloadReport = createAsyncThunk(
  "IMPORT_FL-DownloadReportAPI",
  async (payload: number, { dispatch }) => {
    try {
      dispatch(getImportFilesStart());
      const resp: any = await downloadReportApi(payload);
      if (resp) {
        debugger
        console.log(" -- download report -- ")
        dispatch(downloadReportSuccess(resp));
        if (resp.status == 200) {
        } else {
          dispatch(
            postMessage({
              message: resp?.data?.message,
              type: "error",
            })
          );
        }
      }
    } catch (err) {
      dispatch(getImportFilesFailure(err.toString()));
    }
  }
)

export const loadImportFiles = createAsyncThunk(
  "dashboard",
  async (id_formulary: number, { dispatch }) => {
    console.log("***** getImportFilesStart - Start");
    try {
      dispatch(getImportFilesStart());
      const resp: any = await getImportFiles(id_formulary);
      console.log("getImportFiles : ", resp);
      if (resp) {
        dispatch(getImportFilesSuccess(resp));
        if (resp.status == 200) {
        } else {
          dispatch(
            postMessage({
              message: resp?.data?.message,
              type: "error",
            })
          );
        }
      }
    } catch (err) {
      console.log("***** loadImportFiles - Error ");
      dispatch(getImportFilesFailure(err.toString()));
    }
  }
);

export const loadImportFileDetails = createAsyncThunk(
  "dashboard",
  async (request: DetailsRequest, { dispatch }) => {
    console.log("***** loadImportFileDeatils - Start");
    try {
      dispatch(getImportFileDetailsStart());
      const resp: any = await getImportFileDetails(request);
      console.log("getImportFileDetails : ", resp);
      if (resp) {
        dispatch(getImportFileDetailsSuccess(resp));
        if (resp.status == 200) {
        } else {
          dispatch(
            postMessage({
              message: resp?.data?.message,
              type: "error",
            })
          );
        }
      }
    } catch (err) {
      console.log("***** loadImportFileDeatils - Error ");
      dispatch(getImportFileDetailsFailure(err.toString()));
    }
  }
);

export const loadChangeReports = createAsyncThunk(
  "dashboard",
  async (request: ChangeErrorRequest, { dispatch }) => {
    console.log("***** loadChangeReports - Start");
    try {
      dispatch(getChangeReportsStart());
      const resp: any = await getChangeReports(request);
      console.log("getChangeReports : ", resp);
      if (resp) {
        dispatch(getChangeReportsSuccess(resp));
        if (resp.status == 200) {
        } else {
          dispatch(
            postMessage({
              message: resp?.data?.message,
              type: "error",
            })
          );
        }
      }
    } catch (err) {
      console.log("***** loadChangeReports - Error ");
      dispatch(getChangeReportsFailure(err.toString()));
    }
  }
);

export const loadErrorDetails = createAsyncThunk(
  "dashboard",
  async (request: ChangeErrorRequest, { dispatch }) => {
    console.log("***** loadErrorDetails - Start");
    try {
      dispatch(getErrorDetailsStart());
      const resp: any = await getErrorDetails(request);
      console.log("getErrorDetails : ", resp);
      if (resp) {
        dispatch(getErrorDetailsSuccess(resp));
        if (resp.status == 200) {
        } else {
          dispatch(
            postMessage({
              message: resp?.data?.message,
              type: "error",
            })
          );
        }
      }
    } catch (err) {
      console.log("***** loadErrorDetails - Error ");
      dispatch(getErrorDetailsFailure(err.toString()));
    }
  }
);

export const {
  getImportFilesStart,
  getImportFilesSuccess,
  getImportFilesFailure,

  getImportFileDetailsStart,
  getImportFileDetailsSuccess,
  getImportFileDetailsFailure,

  getChangeReportsStart,
  getChangeReportsSuccess,
  getChangeReportsFailure,
  getErrorDetailsStart,
  getErrorDetailsSuccess,
  getErrorDetailsFailure,

  downloadReportSuccess
} = formularyImport.actions;

export default formularyImport.reducer;
