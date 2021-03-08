import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_PBST = BASE_URL1 + "api/1/formulary-drug-summary-pbst/3323?entity_id=3323";

// const POST_PBST_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-pbst/3298/MCR?index=0&limit=10&entity_id=3298";

// const POST_REPLACE_PBST_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-pbst/3298/MCR/replace?entity_id=3298";

// const POST_REMOVE_PBST_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-pbst/3298/MCR/remove?entity_id=3298";

export const getDrugDetailsPBSTSummary = createAsyncThunk(
  "drug_details/PBST_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsPBSTList = createAsyncThunk(
  "drug_details/PBST_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplacePBSTDrug = createAsyncThunk(
  "drug_details/postReplacePBSTDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemovePBSTDrug = createAsyncThunk(
  "drug_details/postRemovePBSTDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
