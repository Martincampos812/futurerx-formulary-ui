import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_LIS = BASE_URL1 + "api/1/formulary-drug-summary-lis/3323?entity_id=3323";

// const POST_LIS_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-lis/3298/MCR?index=0&limit=10&entity_id=3298";

export const getDrugDetailsLISSummary = createAsyncThunk(
  "drug_details/LIS_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsLISList = createAsyncThunk(
  "drug_details/LIS_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getLISCriteriaList = createAsyncThunk(
  "drug_details/LIS_criteria_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceLISDrug = createAsyncThunk(
  "drug_details/postReplaceLISDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveLISDrug = createAsyncThunk(
  "drug_details/postRemoveLISDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
