import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_ICD = BASE_URL1 + "api/1/formulary-drug-summary-icdl/3326?entity_id=3326"

// const POST_ICD_DRUGS = BASE_URL1 + "api/1/formulary-drugs-icdl/3345/COMM?index=0&limit=10&entity_id=3345";

// const POST_ICD_CL = BASE_URL1 + "api/1/criteria-list-icdl/3345?entity_id=3345";

// const POST_ICD_REPLACE = BASE_URL1 + "api/1/apply-formulary-drug-icdl/3345/COMM/replace?entity_id=3345";

export const getDrugDetailsICDSummary = createAsyncThunk(
  "drug_details/icd_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsICDList = createAsyncThunk(
  "drug_details/icd_drug_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getICDReplaceSrch = createAsyncThunk(
  "drug_details/ICD_replace_srch",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const postICDCriteriaList = createAsyncThunk(
  "drug_details/postICDCriteriaList",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceICDDrug = createAsyncThunk(
  "drug_details/postReplaceICDDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveICDDrug = createAsyncThunk(
  "drug_details/postRemoveICDDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
