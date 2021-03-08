import { PAGDMSaveResponse } from "./pagdmSlice";
import { BASE_URL1 } from "../../../../api/http-helper";
import axios from "axios";
import * as commonConstants from "../../../../api/http-commons";

// const headers = {
//   Authorization: "Bearer 3580657f-d85d-42a5-8187-542ea824c5f4",
//   Accept: "application/json",
//   "Content-Type": "application/json;charset=UTF-8",
// };

export async function savePaGroup(payload: any): Promise<PAGDMSaveResponse> {
  if (payload.latestId === 0) {
    let url = ``;
    if (payload.lob_type == 1) {
      url = `${BASE_URL1}api/1/mcr-pa-group-description/1/${payload.formularyId}?entity_id=0`;
    } else {
      url = `${BASE_URL1}api/1/pa-group-description/1/${payload.formularyId}?entity_id=0`;
    }
    try {
      const response = await axios.post(url, payload, {
        headers: commonConstants.REQUEST_HEADER,
      });
      return {
        success: response,
      };
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  } else {
    let url = ``;
    if (payload.lob_type == 1) {
      url = `${BASE_URL1}api/1/mcr-pa-group-description/${payload.latestId}/${payload.formularyId}?entity_id=0`;
    } else {
      url = `${BASE_URL1}api/1/pa-group-description/${payload.latestId}/${payload.formularyId}?entity_id=0`;
    }
    try {
      const response = await axios.put(url, payload, {
        headers: commonConstants.REQUEST_HEADER,
      });
      return {
        success: response,
      };
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
}

export async function deletePaGroup(payload: any): Promise<PAGDMSaveResponse> {
  let url = ``;
  if (payload.lob_type == 1) {
    url = `${BASE_URL1}api/1/mcr-pa-group-description/${payload.pathParams}`;
  } else {
    url = `${BASE_URL1}api/1/pa-group-description/${payload.pathParams}`;
  }
  try {
    const response = await axios.delete(url, {
      headers: commonConstants.REQUEST_HEADER,
    });
    return {
      success: response,
    };
  } catch (error) {
    console.error(error.response);
    throw error.response;
  }
}

export async function clonePaGroup(payload: any): Promise<PAGDMSaveResponse> {
  let url = ``;
  if (payload.lob_type == 1) {
    url = `${BASE_URL1}api/1/clone-mcr-pa-group-description/1/${payload.current_group_des_id}?entity_id=0`;
  } else {
    url = `${BASE_URL1}api/1/clone-pa-group-description/1/${payload.current_group_des_id}?entity_id=0`;
  }

  try {
    const response = await axios.post(url, payload, {
      headers: commonConstants.REQUEST_HEADER,
    });
    return {
      success: response,
    };
  } catch (error) {
    console.error(error.response);
    throw error.response;
  }
}

export async function archivePaGroup(payload: any): Promise<PAGDMSaveResponse> {
  let url = ``;
  if (payload.lob_type == 1) {
    url = `${BASE_URL1}api/1/archive-mcr-pa-group-description/${payload.pathParams}`;
  } else {
    url = `${BASE_URL1}api/1/archive-pa-group-description/${payload.pathParams}`;
  }

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: commonConstants.REQUEST_HEADER,
      }
    );
    return {
      success: response,
    };
  } catch (error) {
    console.error(error.response);
    throw error.response;
  }
}

export async function newVersionPaGroup(
  payload: any
): Promise<PAGDMSaveResponse> {
  let url = ``;
  if (payload.lob_type == 1) {
    url = `${BASE_URL1}api/1/mcr-pa-group-description-version/${payload.current_group_des_id}?entity_id=0`;
  } else {
    url = `${BASE_URL1}api/1/pa-group-description-version/${payload.current_group_des_id}?entity_id=0`;
  }
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: commonConstants.REQUEST_HEADER,
      }
    );
    return {
      success: response,
    };
  } catch (error) {
    console.error(error.response);
    throw error.response;
  }
}
