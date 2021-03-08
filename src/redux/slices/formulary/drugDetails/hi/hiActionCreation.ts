import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_HI = BASE_URL1 + "api/1/formulary-drug-summary-hi/3303?entity_id=3303";

// const POST_HI_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-hi/3298/MCR?index=0&limit=10&entity_id=3298";

// const POST_REPLACE_HI_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-hi/3303/MCR/replace?entity_id=3303";

// const POST_REMOVE_HI_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-hi/3303/MCR/remove?entity_id=3303";

export const getDrugDetailsHISummary = createAsyncThunk(
  "drug_details/HI_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsHIList = createAsyncThunk(
  "drug_details/HI_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceHIDrug = createAsyncThunk(
  "drug_details/postReplaceHIDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveHIDrug = createAsyncThunk(
  "drug_details/postRemoveHIDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
