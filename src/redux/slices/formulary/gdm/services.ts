import { GDMSaveResponse } from "./gdmSlice";
import { BASE_URL1 } from "../../../../api/http-helper";
import axios from "axios";
import * as commonConstants from "../../../../api/http-commons";

const POSt_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/mcr-st-group-description/1";
const PUT_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/mcr-st-group-description";
const DELETE_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/mcr-st-group-description/";
const CLONE_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/clone-mcr-st-group-description/";
const ARCHIVE_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/archive-mcr-st-group-description/";
const NEWVERSION_ST_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/mcr-st-group-description-version/";

const POSt_ST_COMM_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/st-group-description/1";
const PUT_ST_COMM_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/st-group-description";
const DELETE_ST_COMM_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/st-group-description/";
const CLONE_ST_COMM_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/clone-st-group-description/";
const ARCHIVE_ST_COMM_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/archive-st-group-description/";
const NEWVERSION_ST_COMM_GROUP_DESCRIPTION_URL = BASE_URL1 + "api/1/st-group-description-version/";

export async function saveStGroup(apiDetails: any): Promise<GDMSaveResponse> {
    //let url = `${BASE_URL1}api/1/mcr-st-group-description/1/${payload.formularyId}?entity_id=0`;

    let pathParams = apiDetails.pathParams;
    let keyVals = pathParams.keyVals;
    let messageBody = apiDetails.messageBody;
    
    let POST_URL ="";
    if (apiDetails.lob_type==1){
      POST_URL = POSt_ST_GROUP_DESCRIPTION_URL + pathParams ;
    }else  if (apiDetails.lob_type==4){
      POST_URL = POSt_ST_COMM_GROUP_DESCRIPTION_URL + pathParams ;
    }
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }

    try {
      const response = await axios.post(POST_URL, messageBody, {
        headers: commonConstants.REQUEST_HEADER,
      });
      return {
        success: response
      };
    } catch (error) {
      console.error(error.response)
      throw error.response;
    }
};


export async function editStGroup(apiDetails: any): Promise<GDMSaveResponse> {
    let pathParams = apiDetails.pathParams;
    let keyVals = pathParams.keyVals;
    let messageBody = apiDetails.messageBody;
    
    let POST_URL ="";
    if (apiDetails.lob_type==1){
      POST_URL = PUT_ST_GROUP_DESCRIPTION_URL + pathParams ;
    }else  if (apiDetails.lob_type==4){
      POST_URL = PUT_ST_COMM_GROUP_DESCRIPTION_URL + pathParams ;
    }
    if(keyVals){
      keyVals = keyVals.map(pair => pair.key+'='+pair.value);
      POST_URL = POST_URL + "?" + keyVals.join('&');
    }

    //let url = `${BASE_URL1}api/1/mcr-st-group-description/${payload.latestId}/${payload.formularyId}?entity_id=0`;
    try {
      const response = await axios.put(POST_URL, messageBody, {
        headers: commonConstants.REQUEST_HEADER,
      });
      return {
        success: response
      };
    } catch (error) {
      console.error(error.response)
      throw error.response;
    }
};

export async function deleteStGroup(payload: any): Promise<GDMSaveResponse> {
 // let url = `${BASE_URL1}api/1/mcr-st-group-description/${payload.current_group_des_id}/CV?entity_id=0`;
  
  let pathParams = payload.pathParams;
  let keyVals = payload.keyVals;
  
  let POST_URL ="";
  if (payload.lob_type==1){
    POST_URL = DELETE_ST_GROUP_DESCRIPTION_URL + pathParams ;
  }else  {
    POST_URL = DELETE_ST_COMM_GROUP_DESCRIPTION_URL + pathParams ;
  }
  if(keyVals){
    keyVals = keyVals.map(pair => pair.key+'='+pair.value);
    POST_URL = POST_URL + "?" + keyVals.join('&');
  }

  try {
    const response = await axios.delete(POST_URL,{
      headers: commonConstants.REQUEST_HEADER
    });
    return {
      success: response
    };
  } catch (error) {
    console.error(error.response)
    throw error.response;
  }
};

export async function cloneStGroup(payload: any): Promise<GDMSaveResponse> {
  //let url = `${BASE_URL1}api/1/clone-mcr-st-group-description/1/${payload.current_group_des_id}?entity_id=0`;
  let pathParams = payload.pathParams;
  let keyVals = payload.keyVals;
  
  let POST_URL ="";
  if (payload.lob_type==1){
    POST_URL = CLONE_ST_GROUP_DESCRIPTION_URL + pathParams ;
  }else  {
    POST_URL = CLONE_ST_COMM_GROUP_DESCRIPTION_URL + pathParams ;
  }
  if(keyVals){
    keyVals = keyVals.map(pair => pair.key+'='+pair.value);
    POST_URL = POST_URL + "?" + keyVals.join('&');
  }
  try {
    const response = await axios.post(POST_URL,{'st_group_description_name':payload.st_group_description_name},{
      headers: commonConstants.REQUEST_HEADER
    });
    return {
      success: response
    };
  } catch (error) {
    console.error(error.response)
    throw error.response;
  }
};


export async function archiveStGroup(payload: any): Promise<GDMSaveResponse> {
  //let url = `${BASE_URL1}api/1/archive-mcr-st-group-description/${payload.current_group_des_id}/CV?entity_id=0`;
  let pathParams = payload.pathParams;
  let keyVals = payload.keyVals;
  
  let POST_URL ="";
  if (payload.lob_type==1){
    POST_URL = ARCHIVE_ST_GROUP_DESCRIPTION_URL + pathParams ;
  }else  {
    POST_URL = ARCHIVE_ST_COMM_GROUP_DESCRIPTION_URL + pathParams ;
  }
  if(keyVals){
    keyVals = keyVals.map(pair => pair.key+'='+pair.value);
    POST_URL = POST_URL + "?" + keyVals.join('&');
  }
  try {
    const response = await axios.post(POST_URL,{},{
      headers: commonConstants.REQUEST_HEADER
    });
    return {
      success: response
    };
  } catch (error) {
    console.error(error.response)
    throw error.response;
  }
};

export async function newVersionStGroup(payload: any): Promise<GDMSaveResponse> {
  //let url = `${BASE_URL1}api/1/mcr-st-group-description-version/${payload.current_group_des_id}`;
  
  let pathParams = payload.pathParams;
  let keyVals = payload.keyVals;
  
  let POST_URL ="";
  if (payload.lob_type==1){
    POST_URL = NEWVERSION_ST_GROUP_DESCRIPTION_URL + pathParams ;
  }else  {
    POST_URL = NEWVERSION_ST_COMM_GROUP_DESCRIPTION_URL + pathParams ;
  }
  if(keyVals){
    keyVals = keyVals.map(pair => pair.key+'='+pair.value);
    POST_URL = POST_URL + "?" + keyVals.join('&');
  }

  try {
    const response = await axios.post(POST_URL,{},{
      headers: commonConstants.REQUEST_HEADER
    });
    return {
      success: response
    };
  } catch (error) {
    console.error(error.response)
    throw error.response;
  }
};