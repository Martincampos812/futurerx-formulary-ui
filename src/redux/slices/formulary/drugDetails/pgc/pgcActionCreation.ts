import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_PGC = BASE_URL1 + "api/1/formulary-drug-summary-pgc/3303?entity_id=3303";

// const POST_PGC_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-pgc/3303/FAOTC?index=0&limit=10&entity_id=3303";

// const POST_PGC_EXCLUDED_DRUGS = BASE_URL1 + "api/1/formulary-drugs-pgc/3303/ExD?index=0&limit=10&entity_id=3303";

// const POST_APPLY_PGC = BASE_URL1 + "api/1/apply-formulary-drug-pgc/3298/FAOTC/replace?entity_id=3298";

export const getDrugDetailsPGCSummary = createAsyncThunk(
  "drug_details/PGC_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsPGCList = createAsyncThunk(
  "drug_details/PGC_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const getExcludedDrugsPGCList = createAsyncThunk(
  "drug_details/PGC_Excluded_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postReplacePGCDrug = createAsyncThunk(
  "drug_details/postReplacePGCDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);

export const postRemovePGCDrug = createAsyncThunk(
  "drug_details/postRemovePGCDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
