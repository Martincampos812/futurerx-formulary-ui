import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_POS = BASE_URL1 + "api/1/formulary-drug-summary-pos/3326?entity_id=3326";

// const POST_POS_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-pos/3326/COMM?index=0&limit=10&entity_id=3326";

// const POST_POS_CRITERIA_LIST = BASE_URL1 + "api/1/criteria-list-pos/3345?entity_id=3345";

// const POST_POS_REMOVE = BASE_URL1 + "api/1/apply-formulary-drug-pos/3345/COMM/remove?entity_id=3345";

export const getDrugDetailsPOSSummary = createAsyncThunk(
  "drug_details/pos_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsPOSSettings = createAsyncThunk(
  "drug_details/pos_settings",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsPOSGridData = createAsyncThunk(
  "drug_details/pos_grid_data",
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

export const postPOSCriteriaList = createAsyncThunk(
  "drug_details/postPOSCriteriaList",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemovePOSDrug = createAsyncThunk(
  "drug_details/postRemovePOSDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplacePOSDrug = createAsyncThunk(
  "drug_details/postReplacePOSDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);