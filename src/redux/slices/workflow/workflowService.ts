import axios from "axios";
import { REQUEST_HEADER } from "../../../api/http-commons";
import { BASE_URL1 } from "../../../api/http-helper";
import {
  Claim,
  ClaimWorkPayload,
  NoteListPayload,
  NotePostPayload,
  SubTaskPayload,
  WorkflowRoutePayload,
} from "./workflowAncillary";

export async function getClaim(id_formulary: number): Promise<any> {
  // TODO: Verify path params int
  const url = `${BASE_URL1}api/1/claimstatus/2?entity_id=${id_formulary}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("***** getClaim - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}

export async function getClaimStage(stage_id: number): Promise<any> {
  const url = `${BASE_URL1}api/1/claimstagestatus/${stage_id}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("***** getClaimStage - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}

export async function tryClaimWork(payload: ClaimWorkPayload): Promise<any> {
  const url = `${BASE_URL1}api/1/claimwork`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("***** tryClaimWork - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}


export const defaultNoteListPayload: NoteListPayload = {
  filter: [],
  search_key: "",
};

export async function getNotes(instance_id: number): Promise<any> {
  const url = `https://api-dev-config-tasks.futurerx.com/api/1/notelist?screen=TSK&document_id=${instance_id}`;
  try {
    const response = await axios.post(url, defaultNoteListPayload, {
      headers: REQUEST_HEADER,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("***** getNotes - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}

export async function postNote(payload: NotePostPayload): Promise<any> {
  const url = `https://api-dev-config-tasks.futurerx.com/api/1/note`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("***** postNote - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}

//https://api-dev-config-tasks.futurerx.com/api/1/task-details?id_instance=2720

export async function getloadTaskDetails(instance_id: number): Promise<any> {
  const url = `https://api-dev-config-tasks.futurerx.com/api/1/task-details?id_instance=${instance_id}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("***** getloadTaskDetails - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}

export async function postStageComplete(
  payload: WorkflowRoutePayload
): Promise<any> {
  const url = `${BASE_URL1}api/1/workflowroute`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("***** postStageComplete - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}



export async function postSubTask(payload: SubTaskPayload): Promise<any> {
  const url = `https://api-dev-config-tasks.futurerx.com/api/1/subtask`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("***** postSubTask - Error");
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}


// DP : 2294
// EN : 214
// LD : 1
const currentUserId:number = 1;
export function determineCase(claim: Claim): number {
  if (claim && claim.instance_id) {
    if (claim.stage_position === "E") {
      return 1;
    } else if (
      claim.user_id &&
      claim.user_id !== currentUserId &&
      claim.stage_position !== "E"
    ) {
      return 2;
    } else if (!claim.user_id && claim.stage_position !== "E") {
      return 3;
    } else {
      return 4;
    }
  }
  return 0;
}


