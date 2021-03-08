import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_OTHER_CRITERIA_LIST = BASE_URL1 + "api/1/criteria-list-edoth/3345?entity_id=3345

// const POST_OTHER_DRUGS = BASE_URL1 + "api/1/formulary-drugs-edoth/3345/COMM?index=0&limit=10&entity_id=3345

// const POST_OTHER_REPLACE = BASE_URL1 + "api/1/apply-formulary-drug-edoth/3345/COMM/replace?entity_id=3345";

export const getDrugDetailsOTHERSummary = createAsyncThunk(
  "drug_details/OTHER_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getOTHERCriteriaList = createAsyncThunk(
  "drug_details/OTHER_Criteria_List",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsOtherList = createAsyncThunk(
  "drug_details/other_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceOtherDrug = createAsyncThunk(
  "drug_details/postReplaceOtherDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveOtherDrug = createAsyncThunk(
  "drug_details/postRemoveOtherDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
