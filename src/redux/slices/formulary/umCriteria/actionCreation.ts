import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";

const POST_UM_CRITERIAS = BASE_URL1 + "/api/1/formulary-drug-um-criterias";
const POST_UM_CRITERIAS_DRUGS = BASE_URL1 + "/api/1/um-criteria-formulary-drugs";

export const postFormularyDrugUmCriterias = createAsyncThunk(
  "umCriterias/postFormularyDrugUmCriterias",
  async (apiDetails: any) => {
    console.log("postFormularyDrugUmCriterias action creator:: url: " );
   
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL ="";
    POST_URL = POST_UM_CRITERIAS + pathParams ;

    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }

    const requestHeaders  = {
        method: 'GET',
        headers: commonConstants.REQUEST_HEADER
    }

    return fetch(POST_URL ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postFormularyDrugUmCriterias: ", json);
        return json;
      });
  }
);


export const postUmCriteriasDrugs = createAsyncThunk(
  "umCriterias/postUmCriteriasDrugs",
  async (apiDetails: any) => {
    console.log("postUmCriteriasDrugs action creator:: url: " );
   
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL ="";
    POST_URL = POST_UM_CRITERIAS_DRUGS + pathParams ;

    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }

    const requestHeaders  = {
        method: 'POST',
        headers: commonConstants.REQUEST_HEADER
    }

    return fetch(POST_URL ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postUmCriteriasDrugs: ", json);
        return json;
      });
  }
);