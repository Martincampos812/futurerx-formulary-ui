import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";

interface messageState {
  message: string;
  type: string;
  uuid: number;
}

const messageInitialState: messageState = {
  message: "",
  type: "",
  uuid: 0,
};

interface messageInput {
  message: string;
  type: string;
}

const messaging = createSlice({
  name: "messaging",
  initialState: messageInitialState,
  reducers: {
    postMessage(state, { payload }: PayloadAction<messageInput>) {
      // console.log(" Post : " + payload);
      const { message, type } = payload;
      console.log(type + ": " + message);
      state.message = message;
      state.type = type;
      state.uuid = uuid();
    },
  },
});

export const { postMessage } = messaging.actions;

export default messaging.reducer;
