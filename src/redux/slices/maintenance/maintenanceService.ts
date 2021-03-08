import axios from "axios";
import { LandingData } from "./maintenanceSlice";
import { BASE_URL1 } from "../../../api/http-helper";
import { REQUEST_HEADER } from "../../../api/http-commons";
import { createAsyncThunk } from "@reduxjs/toolkit";

export async function getLandingData(
  payload: any
): Promise<LandingData | null> {
  const client_id = 1;
  let url = `${BASE_URL1}api/1/formulary-maintenances/${client_id}?index=${payload.index}&limit=${payload.limit}`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    console.log("***** getLandingData - Success");
    console.log(response);
    if (response.status === 200) {
      return {
        list: response.data.data,
        count: response.data.count,
      };
    }
    return null;
  } catch (error) {
    console.log("***** getLandingData - Error");
    console.log(error);
    throw error;
  }
}

export async function getMassMaintenanceCompleteData(
  payload: any
): Promise<LandingData | null> {
  const client_id = 1;
  let url = `${BASE_URL1}api/1/formulary-maintenance/${payload.id_maintenance_formulary}?entity_id=${payload.id_maintenance_formulary}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    console.log("***** getLandingData - Success");
    console.log(response);
    if (response.status === 200) {
      return {
        list: response.data.result,
        count: response.data.count,
      };
    }
    return null;
  } catch (error) {
    console.log("***** getLandingData - Error");
    console.log(error);
    throw error;
  }
}

export async function getMassMaintenanceTierAssignmentData(
  payload: any
): Promise<LandingData | null> {
  const client_id = 1;
  let url = `${BASE_URL1}api/1/maintenance-drugs-tier/${payload.id_maintenance_formulary}/${payload.data_source}?index=${payload.index}&limit=${payload.limit}`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    console.log("***** getLandingData - Success");
    console.log(response);
    if (response.status === 200) {
      return {
        list: response.data.result,
        count: response.data.count,
      };
    }
    return null;
  } catch (error) {
    console.log("***** getLandingData - Error");
    console.log(error);
    throw error;
  }
}

export async function getMaintenanceFormulariesInfoData(
  payload: any
): Promise<LandingData | null> {
  const client_id = 1;
  let url = `${BASE_URL1}api/1/maintenance-formularies-info/${payload.id_maintenance_formulary}?`;
  try {
    const response = await axios.get(url,  {
      headers: REQUEST_HEADER,
    });
    console.log("***** getLandingData - Success");
    console.log(response);
    if (response.status === 200) {
      return {
        list: response.data.data,
        count: response.data.count,
      };
    }
    return null;
  } catch (error) {
    console.log("***** getLandingData - Error");
    console.log(error);
    throw error;
  }
}


export const postCompleteMaintenanceFomulary = createAsyncThunk(
  "drug_details/pn_Summary",
  async (payload: any) => {
    const client_id = 1;
    let url = `${BASE_URL1}api/1/complete-formulary-maintenance/${payload.id_maintenance_formulary}/complete`;
    try {
      const response = await axios.post(url, {}, {
        headers: REQUEST_HEADER,
      });
      console.log("***** getLandingData - Success");
      console.log(response);
      if (response.status === 200) {
        return response;
      }
      return null;
    } catch (error) {
      console.log("***** getLandingData - Error");
      console.log(error);
      throw error;
    }
  }
);