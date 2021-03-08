import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";

const GET_ST_SUMMARY_URL = BASE_URL1 + "/api/1/st-summary/";
//const GET_ST_GROUP_DESCRIPTIONS_URL = BASE_URL1 + "api/1/mcr-st-group-descriptions";
const GET_ST_TYPES_URL = BASE_URL1 + "/api/1/st-types/4";
const GET_DRUG_LIST_URL = BASE_URL1 + "/api/1/drug-lists/";
//const GET_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "/api/1/st-group-description/";
//const GET_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/mcr-st-group-description/";
//const GET_ST_GROUP_DESCRIPTION_VERSTIONS_URL = BASE_URL1 + "api/1/mcr-st-group-description-versions/";
const GET_LOB_FORMULARIES_URL = BASE_URL1 + "/api/1/lob-formularies/";





const GET_ST_GROUP_DESCRIPTIONS_URL = BASE_URL1 + "api/1/mcr-st-group-descriptions/";
const GET_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/mcr-st-group-description/";
const GET_ST_GROUP_DESCRIPTION_VERSTIONS_URL = BASE_URL1 + "api/1/mcr-st-group-description-versions/";
const POST_ST_GROUP_DESCRIPTION_VERSTION_URL = BASE_URL1 + "/api/1/mcr-st-group-description-version/";
const GET_ST_GROUP_DESCRIPTION_DETAIL_URL = BASE_URL1 + "/api/1/mcr-st-group-description/462?entity_id=0";
const POSt_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/mcr-st-group-description/1/";
const PUT_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/mcr-st-group-description/";
const POSt_APPLY_ST_GROUP_DESCRIPTION_FORMULARIES_URL = BASE_URL1 + "api/1/apply-st-group-description-formulary/";
const POSt_ST_GROUP_DESCRIPTION_FORMULARIES_URL = BASE_URL1 + "api/1/mcr-st-group-description-formularies/";

const GET_ST_COMM_GROUP_DESCRIPTIONS_URL = BASE_URL1 + "/api/1/st-group-descriptions/";
const GET_ST_COMM_GROUP_DESCRIPTION_URL = BASE_URL1 + "/api/1/st-group-description/";
const GET_ST_COMM_GROUP_DESCRIPTION_VERSTIONS_URL = BASE_URL1 + "api/1/st-group-description-versions/";
const POST_ST_COMM_GROUP_DESCRIPTION_VERSTION_URL = BASE_URL1 + "/api/1/st-group-description-version/";
const GET_ST_COMM_GROUP_DESCRIPTION_DETAIL_URL = BASE_URL1 + "/api/1/st-group-description/462?entity_id=0";
const POSt_ST_COMM_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/st-group-description/1/";
const PUT_ST_COMM_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/st-group-description/";
const POSt_APPLY_ST_COMM_GROUP_DESCRIPTION_FORMULARIES_URL = BASE_URL1 + "api/1/apply-st-group-description-formulary/";
const POSt_ST_COMM_GROUP_DESCRIPTION_FORMULARIES_URL = BASE_URL1 + "api/1/st-group-description-formularies/";


const POST_FORUMULARY_DRUG_ST_URL = BASE_URL1 + "api/1/formulary-drugs-st/";
const POST_APPLY_FORUMULARY_DRUG_ST_URL = BASE_URL1 + "api/1/apply-formulary-drug-st/";

const POST_CRITERIA_LIST_ST_URL = BASE_URL1 + "api/1/criteria-list-st/";

export const getStSummary = createAsyncThunk(
  "formulary_summary/getStSummary",
  async (summary_id: string) => {
    console.log("getStSummary action creator:: url: " + GET_ST_SUMMARY_URL + summary_id);
    const requestHeaders  = {
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(GET_ST_SUMMARY_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getStSummary: ", json);
        return json;
      });
  }
);

export const getLobFormularies = createAsyncThunk(
  "formulary_summary/getLobFormularies",
  async (apiDetails: any) => {
    console.log("getLobFormularies action creator:: url: " + GET_LOB_FORMULARIES_URL + apiDetails.formulary_type_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(GET_LOB_FORMULARIES_URL + apiDetails.formulary_type_id +'/'+apiDetails.formulary_lob_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getLobFormularies: ", json);
        return json;
      });
  }
);

export const getStGrouptDescriptions = createAsyncThunk(
  "formulary_summary/getStGrouptDescriptions",
  async (apiDetails: any) => {
    console.log("getStGrouptDescriptions action creator:: url: " + GET_ST_GROUP_DESCRIPTIONS_URL + '/1?entity_id=0');
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL ="";
    if (apiDetails.lob_type==1){
      POST_URL = GET_ST_GROUP_DESCRIPTIONS_URL + pathParams ;
    }else {
      POST_URL = GET_ST_COMM_GROUP_DESCRIPTIONS_URL + pathParams ;
    }
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }

    const requestHeaders  = {
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getStGrouptDescriptions: ", json);
        return json;
      });
  }
);

export const getStTypes = createAsyncThunk(
  "formulary_summary/getStTypes",
  async (summary_id: string) => {
    console.log("getStTypes action creator:: url: " + GET_ST_TYPES_URL + summary_id);
    const requestHeaders  = {
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(GET_ST_TYPES_URL  ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getStTypes: ", json);
        return json;
      });
  }
);

export const getDrugLists = createAsyncThunk(
  "formulary_summary/getDrugLists",
  async (summary_id: string) => {
    console.log("getDrugLists action creator:: url: " + GET_DRUG_LIST_URL + summary_id);
    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(GET_DRUG_LIST_URL + summary_id ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getDrugLists: ", json);
        return json;
      });
  }
);

export const getStGrouptDescription = createAsyncThunk(
  "formulary_summary/getStGrouptDescription",
  async (apiDetails: any) => {
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL ="";
    if (apiDetails.lob_type==1){
      POST_URL = GET_ST_GROUP_DESCRIPTION_URL + pathParams ;
    }else{
      POST_URL =  GET_ST_COMM_GROUP_DESCRIPTION_URL + pathParams ;
    }
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }

    const requestHeaders  = {
      headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL  ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getStGrouptDescription: ", json);
        return json;
      });
  }
);

export const getStGrouptDescriptionVersions = createAsyncThunk(
  "formulary_summary/getStGrouptDescriptionVersions",
  async (apiDetails: any) => {
   
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL ="";
    if (apiDetails.lob_type==1){
      POST_URL = GET_ST_GROUP_DESCRIPTION_VERSTIONS_URL + pathParams ;
    }else {
      POST_URL =  GET_ST_COMM_GROUP_DESCRIPTION_VERSTIONS_URL + pathParams ;
    }
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }

    const requestHeaders  = {
        // method: 'POST',
        // body: JSON.stringify(summary_id),
        headers: commonConstants.REQUEST_HEADER
    }
    return fetch(POST_URL ,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getStGrouptDescriptionVersions: ", json);
        return json;
      });
  }
);


export const postFormularyDrugST = createAsyncThunk(
  "tier/postFormularyDrugPA",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_FORUMULARY_DRUG_ST_URL + pathParams ;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postFormularyDrugPA action creator:: url: " + POST_URL);
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
        console.log("postFormularyDrugPA: ", json);
        return json;
      });
  }
);

export const postApplyFormularyDrugST = createAsyncThunk(
  "tier/postApplyFormularyDrugPA",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_APPLY_FORUMULARY_DRUG_ST_URL + pathParams ;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postApplyFormularyDrugPA action creator:: url: " + POST_URL);
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
        console.log("postApplyFormularyDrugPA: ", json);
        return json;
      });
  }
);


export const postCriteriaListST = createAsyncThunk(
  "tier/postCriteriaListPA",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_CRITERIA_LIST_ST_URL + pathParams ;
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postCriteriaListPA action creator:: url: " + POST_URL);
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
        console.log("postCriteriaListPA: ", json);
        return json;
      });
  }
);

export const postSTGroupDescriptionFormularies = createAsyncThunk(
  "tier/postPAGroupDescriptionFormularies",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = pathParams.keyVals;
    let messageBody = apiDetails.messageBody;
    
    let POST_URL ="";
    if (apiDetails.lob_type==1){
      POST_URL = POSt_ST_GROUP_DESCRIPTION_FORMULARIES_URL + pathParams ;
    }else {
      POST_URL = POSt_ST_COMM_GROUP_DESCRIPTION_FORMULARIES_URL + pathParams ;
    }
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postPAGroupDescriptionFormularies action creator:: url: " + POST_URL);
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
        console.log("postPAGroupDescription: ", json);
        return json;
      });
  }
);

export const postApplySTGroupDescriptionFormularies = createAsyncThunk(
  "tier/postApplyPAGroupDescriptionFormularies",
  async (apiDetails: any) => {
    
    let pathParams = apiDetails.pathParams;
    let keyVals = pathParams.keyVals;
    let messageBody = apiDetails.messageBody;
    
    let POST_URL ="";
    if (apiDetails.lob_type==1){
      POST_URL = POSt_APPLY_ST_GROUP_DESCRIPTION_FORMULARIES_URL + pathParams ;
    }else {
      POST_URL = POSt_APPLY_ST_COMM_GROUP_DESCRIPTION_FORMULARIES_URL + pathParams ;
    }
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }
    console.log("postApplyPAGroupDescriptionFormularies action creator:: url: " + POST_URL);
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
        console.log("postApplyPAGroupDescriptionFormularies: ", json);
        return json;
      });
  }
);