import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_PT = BASE_URL1 + "api/1/formulary-drug-summary-prtx/3326?entity_id=3326";

// const POST_PT_DRUGS = BASE_URL1 + "api/1/formulary-drugs-prtx/3345/COMM?index=0&limit=10&entity_id=3345";

// const POST_PT_CRITERIA_LIST = BASE_URL1 + "api/1/criteria-list-prtx/3345?entity_id=3345";

// const POST_PT_REPLACE = BASE_URL1 + "api/1/apply-formulary-drug-prtx/3345/COMM/remove?entity_id=3345";

// const POST_PT_REMOVE = BASE_URL1 + "api/1/apply-formulary-drug-prtx/3345/COMM/replace?entity_id=3345

export const getDrugDetailsPTSummary = createAsyncThunk(
  "drug_details/pt_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getPTDrugList = createAsyncThunk(
  "drug_details/PT_drug_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getPTReplaceSrch = createAsyncThunk(
  "drug_details/PT_replace_srch",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getPCHLSearch = createAsyncThunk(
  "drug_details/PCHL_search",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const postPTCriteriaList = createAsyncThunk(
  "drug_details/postPTCriteriaList",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemovePTDrug = createAsyncThunk(
  "drug_details/postRemovePTDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplacePTDrug = createAsyncThunk(
  "drug_details/postReplacePTDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
