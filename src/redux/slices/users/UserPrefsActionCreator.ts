import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../api/http-helper";

// const apiUrl = "http://54.81.18.99/api/v1/members/";

const URL = "http://frx.digiapt.com:8001/api/v1/";

export const getUserPrefs = createAsyncThunk(
  "user_prefs/getUserPrefs",
  async (member_id: string) => {
    console.log("get prefs action creator:: url: ");
    return fetch(URL + "users/john")
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getMemberSummary: ", json);
        return json;
      });
  }
);

export const setUserPrefs = createAsyncThunk(
  "user_prefs/setUserPrefs",
  async (data: any) => {
    console.log("create action set prefs:: url: " + URL + data.member_id);
    console.log(data);
    return fetch(URL + "user/prefs", {
      method: "POST",
      body: JSON.stringify(data.data),
      headers: {
        ["token"]: "john",
        ["Content-Type"]: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("prefs set: ", json);
        return json;
      });
  }
);
