import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_PR = BASE_URL1 + "api/1/formulary-drug-summary-patrs/3326?entity_id=3326";

// const GET_PR_SETTINGS_LIST = BASE_URL1 + "api/1/patient-residences

// const POST_PR_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-patrs/3345/COMM?index=0&limit=10&entity_id=3345

// const REMOVE_PR_FORMULARY_DRUGS = BASE_URL1 + "api/1/apply-formulary-drug-patrs/3345/COMM/remove?entity_id=3345";

export const getDrugDetailsPRSummary = createAsyncThunk(
  "drug_details/pr_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getPRSettings = createAsyncThunk(
  "drug_details/pr_settings",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsPRSettings = createAsyncThunk(
  "drug_details/pr1_settings",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsPRList = createAsyncThunk(
  "drug_details/pr_list_data",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getDrugDetailsRemoveTab = createAsyncThunk(
  "drug_details/remove_tab_settings",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplacePRDrug = createAsyncThunk(
  "drug_details/postReplacePRDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemovePRDrug = createAsyncThunk(
  "drug_details/postRemovePRDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
