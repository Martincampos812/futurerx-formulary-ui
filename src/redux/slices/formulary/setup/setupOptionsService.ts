import axios from "axios";
import { Formulary } from "./formulary";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

import {
  DesignOptions,
  GeneralOptions,
  MedicaidOptions,
  MedicareOptions,
  SupplementalOptions,
  TierOptions,
} from "./setupOptionsSlice";

export async function getGeneralOptions(
  type: number,
  id: number
): Promise<GeneralOptions | any> {
  //console.log("- - - - - - - - - - - - -  - - Genetal Option Service");
  let url0 = `${BASE_URL1}api/1/formulary-types`;
  let url1 = `${BASE_URL1}api/1/formulary-contract-years`;
  let url2 = `${BASE_URL1}api/1/classification-systems/${type}`;
  if (id > 0) {
    url2 += `/${id}`;
  }
  let url3 = `${BASE_URL1}api/1/formularies/${type}`;

  const request0 = axios.get(url0, {
    headers: REQUEST_HEADER,
  });
  const request1 = axios.get(url1, {
    headers: REQUEST_HEADER,
  });
  const request2 = axios.get(url2, {
    headers: REQUEST_HEADER,
  });
  const request3 = axios.get(url3, {
    headers: REQUEST_HEADER,
  });

  return await axios
    .all([request0, request1, request2, request3])
    .then(
      axios.spread((...responses) => {
        const response0 = responses[0];
        const response1 = responses[1];
        const response2 = responses[2];
        const response3 = responses[3];
        //console.log(response0, response1, response2);

        let list0 = [];
        if (response0?.data?.code === "200") {
          list0 = response0?.data?.data;
        }
        let list1 = [];
        if (response1?.data?.code === "200") {
          list1 = response1?.data?.data;
        }
        let list2 = [];
        if (response2?.data?.code === "200") {
          list2 = response2?.data?.data;
        }
        let list3 = [];
        if (response3?.data?.code === "200") {
          list3 = response3?.data?.data;
        }

        //console.log(list0, list1, list2);
        return {
          formularyType: list0,
          contractYear: list1,
          classification_systems: list2,
          clone_source_formularies: list3,
        };
      })
    )
    .catch((errors) => {
      //console.error(errors);
    });
}

export async function getSubMthsOptions(
  year: number
): Promise<GeneralOptions | any> {
  let url = `${BASE_URL1}api/1/formulary-submission-months/${year}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    // console.log("***** getSubMthsOptions  - Success");
    // console.log(response);
    if (response?.data?.code === "200") {
      return { submission_months: response?.data?.data };
    }
    return null;
  } catch (error) {
    // console.log("***** getSubMthsOptions - Error");
    // console.log(error);
    throw error;
  }
}

export async function getStatesOptions(
  type: number
): Promise<GeneralOptions | any> {
  let url = `${BASE_URL1}api/1/formulary-states`;
  if (type === 2) {
    url += `/MMP`;
  }
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    //  console.log("***** getStatesOptions  - Success");
    //  console.log(response);
    if (response?.data?.code === "200") {
      return {
        states: response?.data?.data
          ? response?.data?.data
          : response?.data?.result,
      };
    }
    return null;
  } catch (error) {
    // console.log("***** getStatesOptions - Error");
    // console.log(error);
    throw error;
  }
}

export async function getResemblingFormularies(
  type: number
): Promise<GeneralOptions | any> {
  let url = `${BASE_URL1}api/1/prior-year-resemble-formularies/2021/${type}`;

  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log(response);
    if (response?.data?.code === "200") {
      return { resembling_formularies: response?.data?.data };
    }
    return null;
  } catch (error) {
    console.log("***** getResemblingFormularies - Error");
    console.log(error);
    throw error;
  }
}

export async function getMedicareOptions(
  type: number,
  id: number
): Promise<MedicareOptions | any> {
  //let url = `${this.apiBaseUrl}/1/medicare-contract-types/${id_formulary_type}`;
  let url = `${BASE_URL1}api/1/medicare-contract-types/${type}`;
  if (id > 0) {
    url += `/${id}`;
  }
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    //console.log("***** SETUP getMedicareOptions  - Success");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.data;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

export async function getMedicaidOptions(
  type: number,
  id: number
): Promise<MedicaidOptions | any> {
  let url = `${BASE_URL1}api/1/carve-outs/${type}`;
  if (id > 0) {
    url += `/${id}`;
  }
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log("***** getMedicaidOptions  - Success");
    console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.data;
    }
    return null;
  } catch (error) {
    console.log("***** getMedicaidOptions - Error");
    console.log(error);
    throw error;
  }
}

export async function getDesignOptions(
  type: number,
  id: number
): Promise<DesignOptions | any> {
  let url = `${BASE_URL1}api/1/edits/${type}`;
  if (id > 0) {
    url += `/${id}`;
  }
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    //console.log("***** SETUP getDesignOptions  - API");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.data;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

export async function getSupplementalOptions(
  type: number,
  id: number
): Promise<SupplementalOptions | any> {
  let url = `${BASE_URL1}api/1/supplemental-benefits/${type}`;
  if (id > 0) {
    url += `/${id}`;
  }
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    //console.log("***** SETUP getDesignOptions  - API");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.data;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

//getTierOptions

export async function getTierOptions(
  type: number,
  id: number,
  tier_level: number
): Promise<TierOptions | any> {
  //let url = `${this.apiBaseUrl}/1/tier-labels/1/0/${id_formulary_type}`;
  let url = `${BASE_URL1}api/1/tier-labels/${type}/${tier_level}`;
  if (id > 0) {
    url += `/${id}`;
  }
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    //console.log("***** SETUP getDesignOptions  - API");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.data;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}
