import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_IBF = BASE_URL1 + "api/1/formulary-drug-summary-ibf/3323?entity_id=3323";

// const POST_IBF_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-ibf/3298/MCR?index=0&limit=10&entity_id=3298";

// const GET_IBF_CUIS = BASE_URL1 + "api/1/drug-me-shcuis"

// const POST_REPLACE_IBF_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-ibf/3298/MCR/replace?entity_id=3298"; {"selected_drug_ids":["33df986c40ed34ca16210f83dd9fc938"],"id_me_shcui":3,"me_shcui":"test3"}

// const POST_REMOVE_IBF_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-ibf/3298/MCR/remove?entity_id=3298"; {"selected_drug_ids":["33df986c40ed34ca16210f83dd9fc938"],"selected_criteria_ids":[3],"me_shcui":"test3"}

// const POST_CRITERIA_LIST = BASE_URL1 + "api/1/criteria-list-ibf/3086/MCR?entity_id=3086

export const getDrugDetailsIBFSummary = createAsyncThunk(
  "drug_details/IBF_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getIBFCuids = createAsyncThunk(
  "drug_details/IBF_Cuids",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getIBFCriteriaList = createAsyncThunk(
  "drug_details/IBF_criteria_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getDrugDetailsIBFList = createAsyncThunk(
  "drug_details/IBF_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceIBFDrug = createAsyncThunk(
  "drug_details/postReplaceIBFDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveIBFDrug = createAsyncThunk(
  "drug_details/postRemoveIBFDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
