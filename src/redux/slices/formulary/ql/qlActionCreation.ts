import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import FormularyServices from "../../../../services/formulary.services";
import * as commonConstants from "../../../../api/http-commons";
import { ContactlessOutlined } from "@material-ui/icons";

const GET_PA_SUMMARY_URL = BASE_URL1 + "/api/1/pa-summary/";
//ql summary
const GET_QL_SUMMARY_URL = BASE_URL1 + "/api/1/ql-summary/";
//
const GET_PA_TYPES_URL = BASE_URL1 + "/api/1/pa-types/4";
const GET_DRUG_LIST_URL = BASE_URL1 + "/api/1/drug-lists/";

const GET_PA_GROUP_DESCRIPTIONS_URL =
  BASE_URL1 + "/api/1/mcr-pa-group-descriptions/";
const GET_PA_GROUP_DESCRIPTION_URL =
  BASE_URL1 + "/api/1/mcr-pa-group-description/";
const GET_PA_GROUP_DESCRIPTION_VERSTIONS_URL =
  BASE_URL1 + "/api/1/mcr-pa-group-description-versions/";
const POST_PA_GROUP_DESCRIPTION_VERSTION_URL =
  BASE_URL1 + "/api/1/mcr-pa-group-description-version/";
const GET_PA_GROUP_DESCRIPTION_DETAIL_URL =
  BASE_URL1 + "/api/1/mcr-pa-group-description/462?entity_id=0";
const POSt_PA_GROUP_DESCRIPTION_URL =
  BASE_URL1 + "api/1/mcr-pa-group-description/1/";
const PUT_PA_GROUP_DESCRIPTION_URL =
  BASE_URL1 + "api/1/mcr-pa-group-description/";

const GET_PA_COMM_GROUP_DESCRIPTIONS_URL =
  BASE_URL1 + "/api/1/pa-group-descriptions/";
const GET_PA_COMM_GROUP_DESCRIPTION_URL =
  BASE_URL1 + "/api/1/pa-group-description/";
const GET_PA_COMM_GROUP_DESCRIPTION_VERSTIONS_URL =
  BASE_URL1 + "/api/1/pa-group-description-versions/";
const POST_PA_COMM_GROUP_DESCRIPTION_VERSTION_URL =
  BASE_URL1 + "/api/1/pa-group-description-version/";
const GET_PA_COMM_GROUP_DESCRIPTION_DETAIL_URL =
  BASE_URL1 + "/api/1/pa-group-description/462?entity_id=0";
const POSt_PA_COMM_GROUP_DESCRIPTION_URL =
  BASE_URL1 + "api/1/pa-group-description/1/";
const PUT_PA_COMM_GROUP_DESCRIPTION_URL =
  BASE_URL1 + "api/1/pa-group-description/";

const POST_FORUMULARY_DRUG_PA_URL = BASE_URL1 + "api/1/formulary-drugs-pa/";
//ql
const POST_FORUMULARY_DRUG_QL_URL = BASE_URL1 + "api/1/formulary-drugs-ql/";
//
const POST_APPLY_FORUMULARY_DRUG_PA_URL =
  BASE_URL1 + "api/1/apply-formulary-drug-pa/";
//ql
const POST_APPLY_FORUMULARY_DRUG_QL_URL =
  BASE_URL1 + "api/1/apply-formulary-drug-ql/";
//
const GET_QL_FILE_TYPES = BASE_URL1 + "api/1//um-file-types/";
const POST_RELATED_FORUMULARY_DRUG_PA_URL =
  BASE_URL1 + "api/1/related-formulary-drugs/";
const POST_CRITERIA_LIST_PA_URL = BASE_URL1 + "api/1/criteria-list-pa/";
//ql criterial list
const POST_CRITERIA_LIST_QL_URL = BASE_URL1 + "api/1/criteria-list-ql/";
//
const GET_LOB_FORMULARIES_URL = BASE_URL1 + "/api/1/lob-formularies/";

export const getQlSummary = createAsyncThunk(
  "formulary_summary/getQlSummary",
  async (summary_id: string) => {
    console.log(
      "getQlSummary action creator:: url: " + GET_QL_SUMMARY_URL + summary_id
    );
    const requestHeaders = {
      // method: 'POST',
      // body: JSON.stringify(summary_id),
      headers: commonConstants.REQUEST_HEADER,
    };
    return fetch(GET_QL_SUMMARY_URL + summary_id, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getQlSummary: ", json);
        return json;
      });
  }
);

export const getQlFileTypes = createAsyncThunk(
  "formulary_Ql_file_types",
  async (summary_id: string) => {
    console.log(
      "getQlSummary action creator:: url: " + GET_QL_FILE_TYPES + summary_id
    );
    const requestHeaders = {
      // method: 'POST',
      // body: JSON.stringify(summary_id),
      headers: commonConstants.REQUEST_HEADER,
    };
    return fetch(GET_QL_FILE_TYPES + summary_id + "/QL", requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getQlSummary: ", json);
        return json;
      });
  }
);

// export const getQlGrouptDescriptions = createAsyncThunk(
//   "formulary_summary/getPaGrouptDescriptions",
//   async (apiDetails: any) => {
//     console.log("getPaGrouptDescriptions action creator:: url: ");

//     let pathParams = apiDetails.pathParams;
//     let keyVals = apiDetails.keyVals;
//     let messageBody = apiDetails.messageBody;
//     let POST_URL = "";
//     if (apiDetails.lob_type == 1) {
//       POST_URL = GET_PA_GROUP_DESCRIPTIONS_URL + pathParams;
//     } else if (apiDetails.lob_type == 4) {
//       POST_URL = GET_PA_COMM_GROUP_DESCRIPTIONS_URL + pathParams;
//     }
//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }

//     const requestHeaders = {
//       // method: 'POST',
//       // body: JSON.stringify(summary_id),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("getPaGrouptDescriptions: ", json);
//         return json;
//       });
//   }
// );

// export const getQlTypes = createAsyncThunk(
//   "formulary_summary/getPaTypes",
//   async (summary_id: string) => {
//     console.log(
//       "getPaTypes action creator:: url: " + GET_PA_TYPES_URL + summary_id
//     );
//     const requestHeaders = {
//       // method: 'POST',
//       // body: JSON.stringify(summary_id),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(GET_PA_TYPES_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("getPaTypes: ", json);
//         return json;
//       });
//   }
// );

export const getDrugLists = createAsyncThunk(
  "formulary_summary/getDrugLists",
  async (summary_id: string) => {
    console.log(
      "getDrugLists action creator:: url: " + GET_DRUG_LIST_URL + summary_id
    );
    const requestHeaders = {
      // method: 'POST',
      // body: JSON.stringify(summary_id),
      headers: commonConstants.REQUEST_HEADER,
    };
    return fetch(GET_DRUG_LIST_URL + summary_id, requestHeaders)
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

// export const getQlGrouptDescription = createAsyncThunk(
//   "formulary_summary/getPaGrouptDescription",
//   async (apiDetails: any) => {
//     console.log("getPaGrouptDescription action creator:: url: ");

//     let pathParams = apiDetails.pathParams;
//     let keyVals = apiDetails.keyVals;
//     let messageBody = apiDetails.messageBody;
//     let POST_URL = "";
//     if (apiDetails.lob_type == 1) {
//       POST_URL = GET_PA_GROUP_DESCRIPTION_URL + pathParams;
//     } else if (apiDetails.lob_type == 4) {
//       POST_URL = GET_PA_COMM_GROUP_DESCRIPTION_URL + pathParams;
//     }
//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }
//     const requestHeaders = {
//       // method: 'POST',
//       // body: JSON.stringify(summary_id),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("getPaGrouptDescription: ", json);
//         return json;
//       });
//   }
// );

// export const getQlGrouptDescriptionVersions = createAsyncThunk(
//   "formulary_summary/getPaGrouptDescriptionVersions",
//   async (apiDetails: any) => {
//     console.log("getPaGrouptDescriptionVersions action creator:: url: ");

//     let pathParams = apiDetails.pathParams;
//     let keyVals = apiDetails.keyVals;
//     let messageBody = apiDetails.messageBody;
//     let POST_URL = "";
//     if (apiDetails.lob_type == 1) {
//       POST_URL = GET_PA_GROUP_DESCRIPTION_VERSTIONS_URL + pathParams;
//     } else if (apiDetails.lob_type == 4) {
//       POST_URL = GET_PA_COMM_GROUP_DESCRIPTION_VERSTIONS_URL + pathParams;
//     }
//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }
//     const requestHeaders = {
//       // method: 'POST',
//       // body: JSON.stringify(summary_id),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("getPaGrouptDescriptionVersions: ", json);
//         return json;
//       });
//   }
// );

// export const postQlGroupDescription = createAsyncThunk(
//   "tier/postPAGroupDescription",
//   async (apiDetails: any) => {
//     let pathParams = apiDetails.pathParams;
//     let keyVals = pathParams.keyVals;
//     let messageBody = apiDetails.messageBody;

//     let POST_URL = "";
//     if (apiDetails.lob_type == 1) {
//       POST_URL = POSt_PA_GROUP_DESCRIPTION_URL + pathParams;
//     } else if (apiDetails.lob_type == 4) {
//       POST_URL = BASE_URL1 + POSt_PA_COMM_GROUP_DESCRIPTION_URL + pathParams;
//     }
//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }
//     console.log("postPAGroupDescription action creator:: url: " + POST_URL);
//     const requestHeaders = {
//       method: "POST",
//       body: JSON.stringify(messageBody),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("postPAGroupDescription: ", json);
//         return json;
//       });
//   }
// );

// export const putQlGroupDescription = createAsyncThunk(
//   "tier/putPAGroupDescription",
//   async (apiDetails: any) => {
//     let pathParams = apiDetails.pathParams;
//     let keyVals = pathParams.keyVals;
//     let messageBody = apiDetails.messageBody;

//     let POST_URL = "";
//     if (apiDetails.lob_type == 1) {
//       POST_URL = PUT_PA_GROUP_DESCRIPTION_URL + pathParams;
//     } else if (apiDetails.lob_type == 4) {
//       POST_URL = BASE_URL1 + PUT_PA_COMM_GROUP_DESCRIPTION_URL + pathParams;
//     }

//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }
//     console.log("putPAGroupDescription action creator:: url: " + POST_URL);
//     const requestHeaders = {
//       method: "PUT",
//       body: JSON.stringify(messageBody),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("postPAGroupDescription: ", json);
//         return json;
//       });
//   }
// );

// export const getQlGrouptDescriptionDetail = createAsyncThunk(
//   "formulary_summary/getStGrouptDescription",
//   async (apiDetails: any) => {
//     console.log("getStGrouptDescription action creator:: url: ");

//     let pathParams = apiDetails.pathParams;
//     let keyVals = apiDetails.keyVals;
//     let messageBody = apiDetails.messageBody;
//     let POST_URL = "";
//     if (apiDetails.lob_type == 1) {
//       POST_URL = GET_PA_GROUP_DESCRIPTION_DETAIL_URL + pathParams;
//     } else if (apiDetails.lob_type == 4) {
//       POST_URL = GET_PA_COMM_GROUP_DESCRIPTION_DETAIL_URL + pathParams;
//     }
//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }

//     const requestHeaders = {
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("getStGrouptDescription: ", json);
//         return json;
//       });
//   }
// );

// export const postQlGroupDescriptionVersion = createAsyncThunk(
//   "tier/postPAGroupDescriptionVersion",
//   async (apiDetails: any) => {
//     let pathParams = apiDetails.pathParams;
//     let keyVals = pathParams.keyVals;
//     let messageBody = apiDetails.messageBody;

//     let POST_URL = "";
//     if (apiDetails.lob_type == 1) {
//       POST_URL = POST_PA_GROUP_DESCRIPTION_VERSTION_URL + pathParams;
//     } else if (apiDetails.lob_type == 4) {
//       POST_URL = POST_PA_COMM_GROUP_DESCRIPTION_VERSTION_URL + pathParams;
//     }
//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }

//     console.log(
//       "postPAGroupDescriptionVersion action creator:: url: " + POST_URL
//     );
//     const requestHeaders = {
//       method: "POST",
//       body: JSON.stringify(messageBody),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("postPAGroupDescriptionVersion: ", json);
//         return json;
//       });
//   }
// );

// export const postFormularyDrugPA = createAsyncThunk(
//   "tier/postFormularyDrugPA",
//   async (apiDetails: any) => {
//     let pathParams = apiDetails.pathParams;
//     let keyVals = apiDetails.keyVals;
//     let messageBody = apiDetails.messageBody;
//     let POST_URL = POST_FORUMULARY_DRUG_PA_URL + pathParams;
//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }
//     console.log("postFormularyDrugPA action creator:: url: " + POST_URL);
//     const requestHeaders = {
//       method: "POST",
//       body: JSON.stringify(messageBody),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("postFormularyDrugPA: ", json);
//         return json;
//       });
//   }
// );

// export const postApplyFormularyDrugPA = createAsyncThunk(
//   "tier/postApplyFormularyDrugPA",
//   async (apiDetails: any) => {
//     let pathParams = apiDetails.pathParams;
//     let keyVals = apiDetails.keyVals;
//     let messageBody = apiDetails.messageBody;
//     let POST_URL = POST_APPLY_FORUMULARY_DRUG_PA_URL + pathParams;
//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }

//     console.log("postApplyFormularyDrugPA action creator:: url: " + POST_URL);
//     const requestHeaders = {
//       method: "POST",
//       body: JSON.stringify(messageBody),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("postApplyFormularyDrugPA: ", json);
//         return json;
//       });
//   }
// );

//ql post drugs

export const postFormularyDrugQl = createAsyncThunk(
  "ql/postFormularyDrugQl",
  async (apiDetails: any) => {
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_FORUMULARY_DRUG_QL_URL + pathParams;
    if (keyVals) {
      keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
      POST_URL = POST_URL + "?" + keyVals.join("&");
    }
    console.log("postFormularyDrugQL action creator:: url: " + POST_URL);
    const requestHeaders = {
      method: "POST",
      body: JSON.stringify(messageBody),
      headers: commonConstants.REQUEST_HEADER,
    };
    return fetch(POST_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postFormularyDrugQL: ", json);
        return json;
      });
  }
);

//apply
export const postApplyFormularyDrugQl = createAsyncThunk(
  "ql/postApplyFormularyDrugQL",
  async (apiDetails: any) => {
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_APPLY_FORUMULARY_DRUG_QL_URL + pathParams;
    if (keyVals) {
      keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
      POST_URL = POST_URL + "?" + keyVals.join("&");
    }

    console.log("postApplyFormularyDrugQL action creator:: url: " + POST_URL);
    const requestHeaders = {
      method: "POST",
      body: JSON.stringify(messageBody),
      headers: commonConstants.REQUEST_HEADER,
    };
    console.log("[POST_URL]:", POST_URL);
    return fetch(POST_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postApplyFormularyDrugQL: ", json);
        return json;
      });
  }
);
//qlcriteriaList
export const postCriteriaListQl = createAsyncThunk(
  "QL/postCriteriaListQL",
  async (apiDetails: any) => {
    let pathParams = apiDetails.pathParams;
    let keyVals = apiDetails.keyVals;
    let messageBody = apiDetails.messageBody;
    let POST_URL = POST_CRITERIA_LIST_QL_URL + pathParams;
    if (keyVals) {
      keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
      POST_URL = POST_URL + "?" + keyVals.join("&");
    }
    console.log("postCriteriaListQL action creator:: url: " + POST_URL);
    const requestHeaders = {
      method: "POST",
      body: JSON.stringify(messageBody),
      headers: commonConstants.REQUEST_HEADER,
    };
    return fetch(POST_URL, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("postCriteriaListQL: ", json);
        return json;
      });
  }
);

// export const postCriteriaListPA = createAsyncThunk(
//   "tier/postCriteriaListPA",
//   async (apiDetails: any) => {
//     let pathParams = apiDetails.pathParams;
//     let keyVals = apiDetails.keyVals;
//     let messageBody = apiDetails.messageBody;
//     let POST_URL = POST_CRITERIA_LIST_PA_URL + pathParams;
//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }
//     console.log("postCriteriaListPA action creator:: url: " + POST_URL);
//     const requestHeaders = {
//       method: "POST",
//       body: JSON.stringify(messageBody),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("postCriteriaListPA: ", json);
//         return json;
//       });
//   }
// );

// export const getLobFormularies = createAsyncThunk(
//   "formulary_summary/getLobFormularies",
//   async (apiDetails: any) => {
//     console.log(
//       "getLobFormularies action creator:: url: " +
//         GET_LOB_FORMULARIES_URL +
//         apiDetails.formulary_type_id
//     );
//     const requestHeaders = {
//       // method: 'POST',
//       // body: JSON.stringify(summary_id),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(
//       GET_LOB_FORMULARIES_URL +
//         apiDetails.formulary_type_id +
//         "/" +
//         apiDetails.formulary_lob_id,
//       requestHeaders
//     )
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("getLobFormularies: ", json);
//         return json;
//       });
//   }
// );

// export const postRelatedFormularyDrugPA = createAsyncThunk(
//   "tier/postRelatedFormularyDrugPA",
//   async (apiDetails: any) => {
//     let pathParams = apiDetails.pathParams;
//     let keyVals = apiDetails.keyVals;
//     let messageBody = apiDetails.messageBody;
//     let POST_URL = POST_RELATED_FORUMULARY_DRUG_PA_URL + pathParams;
//     if (keyVals) {
//       keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
//       POST_URL = POST_URL + "?" + keyVals.join("&");
//     }
//     console.log("postRelatedFormularyDrugPA action creator:: url: " + POST_URL);
//     const requestHeaders = {
//       method: "POST",
//       body: JSON.stringify(messageBody),
//       headers: commonConstants.REQUEST_HEADER,
//     };
//     return fetch(POST_URL, requestHeaders)
//       .then((response) => {
//         if (!response.ok) throw Error(response.statusText);
//         return response.json();
//       })
//       .then((json) => {
//         console.log("postFormularyDrugPA: ", json);
//         return json;
//       });
//   }
// );
