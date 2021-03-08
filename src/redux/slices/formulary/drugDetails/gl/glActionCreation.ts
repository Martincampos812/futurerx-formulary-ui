import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_GL = BASE_URL1 + "api/1/formulary-drug-summary-gl/3326?entity_id=3326"

// const POST_GL_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-gl/3302/COMM?index=0&limit=10&entity_id=3302"

// const POST_GL_REPLACE = BASE_URL1 + "api/1/apply-formulary-drug-gl/3345/COMM/replace?entity_id=3345"

// const POST_GL_CL = BASE_URL1 + "api/1/criteria-list-gl/3345?entity_id=3345

export const getDrugDetailsGLSummary = createAsyncThunk(
  "drug_details/gl_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsGLList = createAsyncThunk(
  "drug_details/GL_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplaceGLDrug = createAsyncThunk(
  "drug_details/postReplaceGLDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postGLCriteriaList = createAsyncThunk(
  "drug_details/postGLCriteriaList",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemoveGLDrug = createAsyncThunk(
  "drug_details/postRemoveGLDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
