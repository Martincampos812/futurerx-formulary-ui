import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";

const GET_PA_SUMMARY_URL = BASE_URL1 + "/api/1/download-analytics";
const GET_PA_TYPES_URL = BASE_URL1 + "/api/1/pa-types/4";
const GET_DRUG_LIST_URL = BASE_URL1 + "/api/1/drug-lists/";
const limit = "?index=0&limit=10"

///api/1/formulary-drug-version-changes/3322?index=0&limit=10

export const getWebAnalyticalData = createAsyncThunk(
    "formulary_webAnalytical/getWebAnalyticalData",
  async ( summary_id:any) =>
  {
    console.log( "line 17:", summary_id );
      console.log("getWebAnalyticalData action creator:: url: " + GET_PA_SUMMARY_URL );
      const requestHeaders  = {
           method: 'POST',
           body: JSON.stringify(summary_id),
          headers: commonConstants.REQUEST_HEADER
      }
      console.log("Line 22:" , requestHeaders.headers );
      
      return fetch(GET_PA_SUMMARY_URL ,requestHeaders)
        .then( ( response ) =>
        {
          console.log( "Line 25:" , response );
          if ( !response.ok ) throw Error( response.statusText );
          console.log("data")
          return response.json();
        })
        .then((json) => {
          console.log("getWebAnalyticalData: ", json);
          return json;
        });
    }
  );