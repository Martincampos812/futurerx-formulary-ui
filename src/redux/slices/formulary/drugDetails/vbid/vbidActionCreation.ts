import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../../api/http-helper";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_VBID = BASE_URL1 + "api/1/formulary-drug-summary-vbid/3323?entity_id=3323";

// const POST_VBID_DRUGS = BASE_URL1 + "api/1/formulary-drugs-vbid/3086/MCR?index=0&limit=10&entity_id=3086";

// const GET_VBID_ASSOCIATED_CONTRACTS = BASE_URL1 + "api/1/formulary-associated-contracts/3086?entity_id=3086";

// const GET_VBID_ASSICOIATED_PBPS = BASE_URL1 + "api/1/formulary-associated-pbps/3086/S1234?entity_id=3086";

// const GET_VBID_CRITERIA_LIST = BASE_URL1 + "api/1/criteria-list-vbid/3086/MCR?entity_id=3086";

// const POST_VBID_REPLACE = BASE_URL1 + "api/1/apply-formulary-drug-vbid/3086/MCR/replace?entity_id=3086";

export const getDrugDetailsVBIDSummary = createAsyncThunk(
  "drug_details/VBID_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsVBIDList = createAsyncThunk(
  "drug_details/VBID_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getVBIDContracts = createAsyncThunk(
  "drug_details/VBID_contracts",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getVBIDpbps = createAsyncThunk(
  "drug_details/VBID_pbps",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getVBIDCriteriaList = createAsyncThunk(
  "drug_details/VBID_criteriaList",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceVBIDDrug = createAsyncThunk(
  "drug_details/postReplaceVBIDDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveVBIDDrug = createAsyncThunk(
  "drug_details/postRemoveVBIDDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
