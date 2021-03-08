import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_MONM = BASE_URL1 + "api/1/formulary-drug-summary-monm/3303?entity_id=3303";

// const POST_MO_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-monm/3303/MCR/MO?index=0&limit=10&entity_id=3303";

// const POST_REPLACE_MO_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-monm/3207/MCR/MO/replace?entity_id=3207"; monm_trademark:"MO"

// const POST_REPLACE_NM_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-monm/3207/MCR/NM/replace?entity_id=3207"; monm_trademark:"NM"

// const POST_REMOVE_MO_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-monm/3207/MCR/MO/remove?entity_id=3207"; monm_trademark:"MO", "selected_criteria_ids":["MO/NM"]

// const POST_REMOVE_NM_FORMULARY_DRUG = BASE_URL1 + "api/1/apply-formulary-drug-monm/3207/MCR/NM/remove?entity_id=3207"; monm_trademark:"NM", "selected_criteria_ids":["MO/NM"]

export const getDrugDetailsMOMNSummary = createAsyncThunk(
  "drug_details/MOMN_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsMOList = createAsyncThunk(
  "drug_details/MO_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceMONMDrug = createAsyncThunk(
  "drug_details/postReplaceMONMDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveMONMDrug = createAsyncThunk(
  "drug_details/postRemoveMONMDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
