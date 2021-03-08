import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";



const GET_PA_SUMMARY_URL = BASE_URL1 + "/api/1/formulary-drug-version-changes";


const limit = "?index=0&limit=10"
const slash = "/"

///api/1/formulary-drug-version-changes/3322?index=0&limit=10

export const getNocReportData = createAsyncThunk(
  
  "formulary_nocReport/getNocReportData",
  
  async (  payload:any, id:any  ) =>
  {
    
    console.log( "line 17:", payload.requestpayload );
    console.log( "line 17:", payload.f_id );
    
    console.log( "getPaSummary action creator:: url: " + GET_PA_SUMMARY_URL + slash + payload.f_id + limit );
    console.log( id );
      const requestHeaders  = {
           method: 'POST',
           body: JSON.stringify(payload.requestpayload ),
          headers: commonConstants.REQUEST_HEADER
      }
      console.log("Line 22:" , requestHeaders.headers );
      
      return  fetch(GET_PA_SUMMARY_URL + slash + payload.f_id + limit,requestHeaders)
        .then( ( response ) =>
        {
          console.log( "Line 25:" + response );
          if ( !response.ok ) throw Error( response.statusText );
          console.log("data")
          return response.json();
        })
        .then((json) => {
          console.log("getNocReportData: ", json);
          return json;
        });
    }
  );