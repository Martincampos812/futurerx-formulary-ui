import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildUrl, getHeaders, postHeaders, fetchRequest } from "../../../../../api/http-drug-details";

// const GET_DRUG_FGC = BASE_URL1 + "api/1/formulary-tiers/3298?entity_id=3298";

// const POST_FGC_APPLY = BASE_URL1 + "api/1/apply-formulary-drug-fgc/3298/MCR";

export const getDrugDetailsFGCTiers = createAsyncThunk(
  "drug_details/FGC",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const postApplyFGCDrug = createAsyncThunk(
  "drug_details/postApplyFGCDrug",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
