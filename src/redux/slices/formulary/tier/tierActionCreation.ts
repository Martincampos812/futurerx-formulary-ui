import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";
import * as constants from "../../../../api/http-commons";
const URL = BASE_URL1;

const TIERS_URL = BASE_URL1 + "/api/1/formulary-tiers/";
const GET_TIER_LABAELS_URL = BASE_URL1 + "/api/1/tier-labels/6/0/";
const GET_FORMULARY_SETUP_URL = BASE_URL1 + "/api/1/formulary-setup/";
const POST_MAINTENACE_DRUG_TIER_URL = BASE_URL1 + "/api/1/maintenance-drugs-tier/";

const GET_MAINTENACE_FORMULARY_TIER_URL = BASE_URL1 + "/api/1/maintenance-formulary-tiers/";
const POST_ADD_MAINTENANCE_URL = BASE_URL1 + "/api/1/add-maintenance-drugs/";

export const getTier = createAsyncThunk(
  "tier/getTier",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let GET_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      GET_URL = GET_URL + "?" + keyVals.join('&');
    }
    console.log("getTier action creator:: url: " + GET_URL);
    const requestHeaders  = {
        /*method: 'POST',
        body: JSON.stringify(messageBody),*/
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(GET_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getFormularyTiers: ", json);
        return json;
      });
  }
);

export const getTierLabels = createAsyncThunk(
  "tier/getTierLabels",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let GET_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      GET_URL = GET_URL + "?" + keyVals.join('&');
    }
    console.log("getTier action creator:: url: " + GET_URL);
    const requestHeaders  = {
        /*method: 'POST',
        body: JSON.stringify(messageBody),*/
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(GET_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getTierLabels: ", json);
        return json;
      });
  }
);
export const postMaintenaceDrugTier = createAsyncThunk(
  "tier/postMaintenaceDrugTier",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_MAINTENACE_DRUG_TIER_URL + pathParams ;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postMaintenaceDrugTier action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postMaintenaceDrugPA: ", json);
        return json;
      });
  }
);

export const getMaintenanceFormularyTiers = createAsyncThunk(
  "tier/getMaintenanceFormularyTiers",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = GET_MAINTENACE_FORMULARY_TIER_URL + pathParams ;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("getMaintenanceFormularyTiers action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'GET',
        body: JSON.stringify(messageBody),
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postMaintenaceDrugPA: ", json);
        return json;
      });
  }
);

export const postTierApplyInfo = createAsyncThunk(
  "tier/postTierApplyInfo",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postTierApplyInfo action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postTierApplyInfo: ", json);
        return json;
      });
  }
);

export const postNewTier = createAsyncThunk(
  "tier/postNewTier",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postTierApplyInfo action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postNewTier: ", json);
        return json;
      });
  }
);

export const replaceTier = createAsyncThunk(
  "tier/replaceTier",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("replaceTier action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'PUT',
        body: JSON.stringify(messageBody),
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("replaceTier: ", json);
        return json;
      });
  }
);

export const deleteTier = createAsyncThunk(
  "tier/deleteTier",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let GET_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      GET_URL = GET_URL + "?" + keyVals.join('&');
    }
    console.log("deleteTier action creator:: url: " + GET_URL);
    const requestHeaders  = {
        method: 'DELETE',
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(GET_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("deleteTier: ", json);
        return json;
      });
  }
);

export const reassignTier = createAsyncThunk(
  "tier/reassignTier",
  async (apiDetails: any) => {
    let apiPart = apiDetails.apiPart;
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = URL + apiPart + pathParams;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("reassignTier action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'PUT',
        body: JSON.stringify(messageBody),
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("reassignTier: ", json);
        return json;
      });
  }
);


export const postAddMaintenanceDrugs = createAsyncThunk(
  "tier/postAddMaintenanceDrugs",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_ADD_MAINTENANCE_URL + pathParams ;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postAddMaintenanceDrugs action creator:: url: " + POST_URL);
    const requestHeaders  = {
        method: 'POST',
        body: JSON.stringify(messageBody),
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postMaintenaceDrugPA: ", json);
        return json;
      });
  }
);