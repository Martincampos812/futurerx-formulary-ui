import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildUrl, getHeaders, postHeaders, fetchRequest } from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_CB = BASE_URL1 + "api/1/formulary-drug-summary-cb/3303?entity_id=3303";

// const POST_CB_EXCLUDED_DRUGS = BASE_URL1 + "api/1/formulary-drugs-cb/3298/ExD?index=0&limit=10&entity_id=3298";

// const POST_CB_REPLACE = BASE_URL1 + "api/1/apply-formulary-drug-cb/3303/ExD/replace?entity_id=3303";

// const POST_CB_CRITERIA_LIST = BASE_URL1 + "api/1/criteria-list-cb/3303/ExD?entity_id=3303";

export const getDrugDetailsCBSummary = createAsyncThunk(
  "drug_details/CB_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getExcludedDrugsCBList = createAsyncThunk(
  "drug_details/CB_Excluded_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getCBCriteriaList = createAsyncThunk(
  "drug_details/CB_criteria_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceCBDrug = createAsyncThunk(
  "drug_details/postReplaceCBDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveCBDrug = createAsyncThunk(
  "drug_details/postRemoveCBDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
