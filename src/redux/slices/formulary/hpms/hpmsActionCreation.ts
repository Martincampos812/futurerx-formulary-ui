import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";
import {
    buildUrl,
    getHeaders,
    postHeaders,
    fetchRequest,
  } from "../../../../api/http-drug-details";


// export const postHpmsFormularyFile = createAsyncThunk(
//     "hpms/postHpmsFormularyFile",
//     async (apiDetails: any) => {
//         let POST_URL = buildUrl({ apiDetails });
//         const requestHeaders = postHeaders(apiDetails);
//         debugger;
//         return fetchRequest(POST_URL, requestHeaders);
//     }
// ); 

export const postHpmsReports = createAsyncThunk(
    "hpms/postHpmsReports",
    async (apiDetails: any) => {
        let POST_URL = buildUrl({ apiDetails });
        const requestHeaders = postHeaders(apiDetails);
        debugger;
        return fetchRequest(POST_URL, requestHeaders);
    }
); 

export const postStandardReports = createAsyncThunk(
    "hpms/postStandardReports",
    async (apiDetails: any) => {
        let POST_URL = buildUrl({ apiDetails });
        const requestHeaders = postHeaders(apiDetails);
        debugger;
        return fetchRequest(POST_URL, requestHeaders);
    }
); 

