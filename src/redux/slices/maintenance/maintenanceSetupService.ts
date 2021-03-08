import axios from "axios";
// import { LandingData } from "./maintenanceSlice";
import { BASE_URL1 } from "../../../api/http-helper";
import { REQUEST_HEADER } from "../../../api/http-commons";

export async function getcontractYeares() {
  const client_id = 1;
  let url = `${BASE_URL1}api/1/formulary-contract-years`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log("***** getContractYear - Success");
    console.log(response);
    if (response.status === 200) {
      return {
        data: response.data.data,
        // count: response.data.count,
      };
    }
    return null;
  } catch (error) {
    console.log("***** getContractYear - Error");
    console.log(error);
    throw error;
  }
}

export async function getSubmissionMonths(payload) {
  const client_id = 1;
  let url = `${BASE_URL1}api/1/formulary-submission-months/${payload.lob_id}/${payload.contract_year}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log("***** get-submission-months - Success");
    console.log(response.data);
    if (response.status === 200) {
      return {
        data: response.data,
        // count: response.data.count,
      };
    }
    return null;
  } catch (error) {
    console.log("***** getContractYear - Error");
    console.log(error);
    throw error;
  }
}

export async function getFormularyList(payload) {
  let url = `${BASE_URL1}api/1/maintenance-formularies/1/${payload.lob_id}/${payload.contract_year}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    if (response.status == 200) {
      return {
        data: { data: response.data.data, count: response.data.count },
      };
    }
    return null;
    console.log("{getFormularies}:", response);
  } catch (err) {}
}

export async function saveSetup(payload: any) {
  let url = `${BASE_URL1}api/1/formulary-maintenance/1`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    console.log("{save}:", response);

    if (response.status == 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log("{error}:", err);
  }
}

export async function saveAndContinueSetup(payload: any) {
  let url = `${BASE_URL1}api/1/formulary-maintenance/${payload.id_formulary_maintenance}/1`;
  try {
    const response = await axios.put(url, payload.apiDetails, {
      headers: REQUEST_HEADER,
    });
    console.log("{saveAndContinueSetup}:", response);

    if (response.status == 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log("{error}:", err);
  }
}
