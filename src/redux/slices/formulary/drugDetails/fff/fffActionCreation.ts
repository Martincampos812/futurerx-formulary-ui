import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_FFF = BASE_URL1 + "api/1/formulary-drug-summary-fff/3303?entity_id=3303";

// const GET_FFF_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-fff/3303/MCR?index=0&limit=10&entity_id=3303";

// const POST_REPLACE_FFF_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-fff/3207/MCR/replace?entity_id=3207

// const POST_REMOVE_FFF_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-fff/3106/MCR/remove?entity_id=3106";

export const getDrugDetailsFFFSummary = createAsyncThunk(
  "drug_details/FFF_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsFFFList = createAsyncThunk(
  "drug_details/FFF_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceFFFDrug = createAsyncThunk(
  "drug_details/postReplaceFFFDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveFFFDrug = createAsyncThunk(
  "drug_details/postRemoveFFFDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
