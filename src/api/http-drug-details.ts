import { BASE_URL1 } from "./http-helper";
import { REQUEST_HEADER } from "./http-commons";

// Mass Maintainance TAB
export const GET_MAINTENANCE_FORMULARIES_INFO = "api/1/maintenance-formularies-info/";

// LA TAB
export const GET_DRUG_SUMMARY_LA = "api/1/formulary-drug-summary-la/";
export const GET_LA_FORMULARY_DRUGS = "api/1/formulary-drugs-la/";
export const APPLY_LA_DRUG = "api/1/apply-formulary-drug-la/";

// AF TAB
export const GET_DRUG_SUMMARY_AF = "api/1/formulary-drug-summary-abrfa/";
export const GET_AF_FORMULARY_DRUGS = "api/1/formulary-drugs-abrfa/";
export const APPLY_AF_DRUG = "api/1/apply-formulary-drug-abrfa/";

// FFF TAB
export const GET_DRUG_SUMMARY_FFF = "api/1/formulary-drug-summary-fff/";
export const GET_FFF_FORMULARY_DRUGS = "api/1/formulary-drugs-fff/";
export const APPLY_FFF_DRUG = "api/1/apply-formulary-drug-fff/";

// HI TAB
export const GET_DRUG_SUMMARY_HI = "api/1/formulary-drug-summary-hi/";
export const GET_HI_FORMULARY_DRUGS = "api/1/formulary-drugs-hi/";
export const APPLY_HI_DRUG = "api/1/apply-formulary-drug-hi/";

// PBST TAB
export const GET_DRUG_SUMMARY_PBST = "api/1/formulary-drug-summary-pbst/";
export const GET_PBST_FORMULARY_DRUGS = "api/1/formulary-drugs-pbst/";
export const APPLY_PBST_DRUG = "api/1/apply-formulary-drug-pbst/";

// MONM TAB
export const GET_DRUG_SUMMARY_MONM = "api/1/formulary-drug-summary-monm/";
export const GET_MONM_FORMULARY_DRUGS = "api/1/formulary-drugs-monm/";
export const APPLY_MONM_DRUG = "api/1/apply-formulary-drug-monm/";

// VBID TAB
export const GET_DRUG_SUMMARY_VBID = "api/1/formulary-drug-summary-vbid/";
export const GET_VBID_CONTRACTS = "api/1/formulary-associated-contracts/";
export const GET_VBID_FORMULARY_DRUGS = "api/1/formulary-drugs-vbid/";
export const GET_VBID_ASSOCIATED_PBPS = "api/1/formulary-associated-pbps/";
export const GET_VBID_CRITERIA_LIST = "api/1/criteria-list-vbid/";
export const APPLY_VBID_DRUG = "api/1/apply-formulary-drug-vbid/";

// LIS TAB
export const GET_DRUG_SUMMARY_LIS = "api/1/formulary-drug-summary-lis/";
export const GET_LIS_FORMULARY_DRUGS = "api/1/formulary-drugs-lis/";
export const GET_LIS_CRITERIA_LIST = "api/1/criteria-list-lis/";
export const APPLY_LIS_DRUG = "api/1/apply-formulary-drug-lis/";

// IBF TAB
export const GET_DRUG_SUMMARY_IBF = "api/1/formulary-drug-summary-ibf/";
export const GET_IBF_FORMULARY_DRUGS = "api/1/formulary-drugs-ibf/";
export const GET_IBF_CUIS = "api/1/drug-me-shcuis";
export const APPLY_IBF_DRUG = "api/1/apply-formulary-drug-ibf/";
export const GET_IBF_CRITERIA_LIST = "api/1/criteria-list-ibf/";

// CB TAB
export const GET_DRUG_SUMMARY_CB = "api/1/formulary-drug-summary-cb/";
export const GET_CB_EXCLUDED_DRUGS = "api/1/formulary-drugs-cb/";
export const APPLY_CB_DRUG = "api/1/apply-formulary-drug-cb/";
export const GET_CB_CRITERIA_LIST = "api/1/criteria-list-cb/"

// FGC TAB
export const GET_DRUG_FGC_TIERS = "api/1/formulary-tiers/";
export const APPLY_FGC_DRUG = "api/1/apply-formulary-drug-fgc/";

// PGC TAB
export const GET_DRUG_SUMMARY_PGC = "api/1/formulary-drug-summary-pgc/";
export const GET_PGC_FORMULARY_DRUGS = "api/1/formulary-drugs-pgc/";
export const GET_PGC_EXCLUDED_DRUGS = "api/1/formulary-drugs-pgc/";
export const APPLY_PGC_DRUG = "api/1/apply-formulary-drug-pgc/";

// SO TAB
export const GET_DRUG_SUMMARY_SO = "api/1/formulary-drug-summary-sboth/";
export const GET_SO_FORMULARY_DRUGS = "api/1/formulary-drugs-sboth/";
export const GET_SO_CRITERIA_LIST = "api/1/criteria-list-sboth/";
export const APPLY_SO_DRUG = "api/1/apply-formulary-drug-sboth/";

// SSM TAB
export const GET_DRUG_SUMMARY_SSM = "api/1/formulary-drug-summary-ssm/";
export const GET_SSM_FORMULARY_DRUGS = "api/1/formulary-drugs-ssm/";
export const APPLY_SSM_DRUG = "api/1/apply-formulary-drug-ssm/";
export const GET_SSM_CRITERIA_LIST = "api/1/criteria-list-ssm/";

// AL TAB
export const GET_DRUG_SUMMARY_AL = "api/1/formulary-drug-summary-al/";
export const GET_AL_DRUGS = "api/1/formulary-drugs-al/";
export const APPLY_AL_DRUG = "api/1/apply-formulary-drug-al/";
export const GET_AL_CRITERIA_LIST = "api/1/criteria-list-al/";
export const GET_EXNG_AL_CRITERIA_LIST = "api/1/exng-criteria-list-al/";

// GL TAB
export const GET_DRUG_SUMMARY_GL = "api/1/formulary-drug-summary-gl/";
export const GET_GL_DRUGS = "api/1/formulary-drugs-gl/";
export const APPLY_GL_DRUGS = "api/1/apply-formulary-drug-gl/";
export const GET_GL_CRITERIA_LIST = "api/1/criteria-list-gl/";
export const GET_EXNG_GL_CRITERIA_LIST = "api/1/exng-criteria-list-gl/";

// ICD TAB
export const GET_DRUG_SUMMARY_ICD = "api/1/formulary-drug-summary-icdl/";
export const GET_ICD_DRUGS = "api/1/formulary-drugs-icdl/";
export const GET_ICD_DRUGS_REPLACE = "api/1/icds/";
export const GET_ICD_CRITERIA_LIST = "api/1/criteria-list-icdl/";
export const GET_EXNG_ICD_CRITERIA_LIST = "api/1/exng-criteria-list-icdl/";
export const APPLY_ICD_DRUGS = "api/1/apply-formulary-drug-icdl/";

// PN TAB
export const GET_DRUG_SUMMARY_PN = "api/1/formulary-drug-summary-phnw/";
export const GET_PN_DRUGS = "api/1/formulary-drugs-phnw/";
export const GET_PN_DRUGS_REPLACE = "api/1/pharmacy-networks/";
export const GET_PN_CRITERIA_LIST = "api/1/criteria-list-phnw/";
export const GET_EXNG_PN_CRITERIA_LIST = "api/1/exng-criteria-list-phnw/";
export const APPLY_PN_DRUGS = "api/1/apply-formulary-drug-phnw/";

// PT TAB
export const GET_DRUG_SUMMARY_PT = "api/1/formulary-drug-summary-prtx/";
export const GET_PT_DRUGS = "api/1/formulary-drugs-prtx/";
export const GET_PT_DRUGS_REPLACE = "api/1/prescriber-taxonomies";
export const GET_PT_CRITERIA_LIST = "api/1/criteria-list-prtx/";
export const GET_EXNG_PT_CRITERIA_LIST = "api/1/exng-criteria-list-prtx/";
export const APPLY_PT_DRUGS = "api/1/apply-formulary-drug-prtx/";

// POS TAB
export const GET_DRUG_SUMMARY_POS = "api/1/formulary-drug-summary-pos/";
export const GET_DRUG_SETTING_POS = "api/1/place-of-services/";
export const GET_POS_DRUGS = "api/1/formulary-drugs-pos/";
export const GET_POS_DRUG_REMOVE_TAB = "api/1/criteria-list-pos/";
export const GET_POS_CRITERIA_LIST = "api/1/criteria-list-pos/";
export const GET_EXNG_POS_CRITERIA_LIST = "api/1/exng-criteria-list-pos/";
export const APPLY_POS_DRUGS = "api/1/apply-formulary-drug-pos/";

// PR TAB
export const GET_DRUG_SUMMARY_PR = "api/1/formulary-drug-summary-patrs/";
export const GET_PR_SETTINGS_LIST = "api/1/patient-residences";
export const GET_PR_FORMULARY_DRUGS = "api/1/formulary-drugs-patrs/";
export const GET_PR_DRUG_REMOVE_TAB = "api/1/criteria-list-patrs/";
export const GET_EXNG_PR_DRUG_REMOVE_TAB = "api/1/exng-criteria-list-patrs/";
export const APPLY_PR_DRUGS = "api/1/apply-formulary-drug-patrs/";

// OTHER TAB
export const GET_DRUG_SUMMARY_OTHER = "api/1/formulary-drug-summary-edoth/";
export const GET_OTHER_CRITERIA_LIST = "api/1/criteria-list-edoth/";
export const GET_OTHER_DRUGS = "api/1/formulary-drugs-edoth/";
export const APPLY_OTHER_DRUGS = "api/1/apply-formulary-drug-edoth/";

// PHCL API
export const GET_PCHL_DRUGS_ONSEARCH = "api/1/lookback-list/DRUG/6";

export const KEY_ENTITY_ID = "entity_id";
export const KEY_INDEX = "index";
export const KEY_LIMIT = "limit";
export const SEARCHKEY = "search_value";

export const TYPE_REPLACE = "replace";
export const TYPE_APPEND = "append";
export const TYPE_REMOVE = "remove";

export const buildUrl = ({ refUrl = BASE_URL1, apiDetails }) => {
  let apiPart = apiDetails.apiPart;
  let pathParams = apiDetails.pathParams;
  let keyVals = apiDetails.keyVals;
  let url = refUrl + apiPart;

  if (pathParams) {
    url = url + pathParams;
  }

  if (keyVals) {
    keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
    url = url + "?" + keyVals.join("&");
  }
  return url;
};

export const getHeaders = () => {
  return {
    headers: REQUEST_HEADER,
  };
};

export const postHeaders = (apiDetails) => {
  return {
    method: "POST",
    body: JSON.stringify(apiDetails?.messageBody),
    headers: REQUEST_HEADER,
  };
};

export const fetchRequest = (url, requestHeaders) => {
  return fetch(url, requestHeaders)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};
export const putHeaders = (apiDetails)=>{
  return{
    method:"PUT",
    body :JSON.stringify(apiDetails?.messageBody),
    headers:REQUEST_HEADER,

  };
};
