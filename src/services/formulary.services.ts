import { AxiosResponse } from "axios";
import http, { BASE_URL1 } from "../api/http-helper";

class FormularyServices {
  headers: { Authorization: string; Accept: string; 'Content-Type': string; };
  constructor() {
    this.headers = {
      'Authorization': 'Bearer ecac2d90-92ce-4c20-8f39-363e0b621d18',
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }
  get(endpoint:any,summary_id: any) {
    return this.fetch(endpoint,summary_id)
  }
  post = (endpoint:any,body: any) =>{
    const requestHeaders  = {
      method: 'POST',
      body: JSON.stringify(body),
    }
    return this.fetch(endpoint,requestHeaders)
  }
  put = (endpoint:any,body: any) =>{
    const requestHeaders  = {
      method: 'PUT',
      body: JSON.stringify(body),
    }
    return this.fetch(endpoint,requestHeaders)
  }
  delete = (endpoint:any,body: any) =>{
    const requestHeaders  = {
      method: 'DELETE',
      body: JSON.stringify(body),
    }
    return this.fetch(endpoint,requestHeaders)
  }

  fetch(endpoint,summary_id) {
    return fetch(`${BASE_URL1}/${endpoint}` + summary_id, { headers: this.headers })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getFormularySummary: ", json);
        return json;
      });
  }
}

export default new FormularyServices();
