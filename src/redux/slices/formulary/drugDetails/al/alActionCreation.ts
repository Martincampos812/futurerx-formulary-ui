import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_AL = BASE_URL1 + "api/1/formulary-drug-summary-al/3301?entity_id=3301

// const POST_AL_DRUGS = BASE_URL1 + "api/1/formulary-drugs-al/3326/COMM?index=0&limit=10&entity_id=3326

// const POST_REPLACE_AL_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-al/3266/COMM/replace?entity_id=3266";

// const POST_AL_CRITERIA_LIST = BASE_URL1 + "api/1/criteria-list-al/3345?entity_id=3345";

// const POST_REMOVE_AL = BASE_URL1 + "api/1/apply-formulary-drug-al/3345/COMM/remove?entity_id=3345";

export const getDrugDetailsALSummary = createAsyncThunk(
  "drug_details/AL_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsALList = createAsyncThunk(
  "drug_details/AL_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getALCriteriaList = createAsyncThunk(
  "drug_details/AL_criteria_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceALDrug = createAsyncThunk(
  "drug_details/postReplaceALDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveALDrug = createAsyncThunk(
  "drug_details/postRemoveALDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
