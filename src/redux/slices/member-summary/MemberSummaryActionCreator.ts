import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../api/http-helper";

// const apiUrl = "http://54.81.18.99/api/v1/members/";

const URL = BASE_URL + "member/";

export const getMemberSummary = createAsyncThunk(
  "member_summary/getMemberSummary",
  async (member_id: string) => {
    console.log("getMemberSummary action creator:: url: " + URL + member_id);
    return fetch(URL + member_id)
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

export const getMemberAddress = createAsyncThunk(
  "member_summary/getMemberAddress",
  async (member_id: string) => {
    console.log(
      "getMemberAddress action creator:: url: " + URL + member_id + "/address"
    );
    return fetch(URL + member_id + "/address")
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getMemberAddress: ", json);
        return json;
      });
  }
);
