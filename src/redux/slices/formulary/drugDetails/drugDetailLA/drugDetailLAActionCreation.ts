import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_LA = BASE_URL1 + "api/1/formulary-drug-summary-la/3303?entity_id=3303";

// const POST_LA_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-la/3303/MCR?index=0&limit=10&entity_id=3303";

// const POST_REPLACE_LA_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-la/3298/MCR/replace?entity_id=3298";

// const POST_REMOVE_LA_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-la/3106/MCR/remove?entity_id=3106";

export const getDrugDetailsLASummary = createAsyncThunk(
  "drug_details/LA_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsLAList = createAsyncThunk(
  "drug_details/LA_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceLADrug = createAsyncThunk(
  "drug_details/postReplaceLADrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveLADrug = createAsyncThunk(
  "drug_details/postRemoveLADrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
