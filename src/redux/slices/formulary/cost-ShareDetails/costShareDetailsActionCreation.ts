import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";
import { AnyARecord } from "dns";

const GET_PA_SUMMARY_URL = BASE_URL1 + "/api/1/costsharestatus/";

const slash = "/";
///api/1/formulary-drug-version-changes/3322?index=0&limit=10

export const getCostShareDetailsData = createAsyncThunk(
    "formulary_costShareDetails/getCostShareDetailsData",
  async ( id:any ) =>
  {
    
    console.log( "getPaSummary action creator:: url: " + GET_PA_SUMMARY_URL + slash + id );
    
      const requestHeaders  = {
           method: 'GET',
          // body: JSON.stringify(summary_id),
          headers: commonConstants.REQUEST_HEADER
      }
      console.log("Line 22:" , requestHeaders.headers );
      
      return  fetch(GET_PA_SUMMARY_URL + id ,requestHeaders)
        .then( ( response ) =>
        {
          console.log( "Line 25:" + response );
          if ( !response.ok ) throw Error( response.statusText );
          console.log("data")
          return response.json();
        })
        .then((json) => {
          console.log("getCostShareData: ", json);
          return json;
        });
    }
  );