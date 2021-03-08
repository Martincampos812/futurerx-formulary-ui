import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_PN = BASE_URL1 + "api/1/formulary-drug-summary-phnw/3326?entity_id=3326"

// const POST_PN_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-phnw/3345/COMM?index=0&limit=10&entity_id=3345";

// const POST_PN_CRITERIA_LIST = BASE_URL1 + "api/1/criteria-list-phnw/3345?entity_id=3345";

// const POST_PN_REPLACE = BASE_URL1 + "api/1/apply-formulary-drug-phnw/3345/COMM/remove?entity_id=3345";

// const POST_PN_REMOVE = BASE_URL1 + "api/1/apply-formulary-drug-phnw/3345/COMM/replace?entity_id=3345";

export const getDrugDetailsPNSummary = createAsyncThunk(
  "drug_details/pn_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsPNList = createAsyncThunk(
  "drug_details/pn_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getPNReplaceSrch = createAsyncThunk(
  "drug_details/PN_replace_srch",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const postPNCriteriaList = createAsyncThunk(
  "drug_details/postPNCriteriaList",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemovePNDrug = createAsyncThunk(
  "drug_details/postRemovePNDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplacePNDrug = createAsyncThunk(
  "drug_details/postReplacePNDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);