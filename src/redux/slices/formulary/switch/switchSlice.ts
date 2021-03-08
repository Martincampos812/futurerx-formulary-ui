import {createSlice} from "@reduxjs/toolkit";

const switchState: any = {
  configureSwitch: false,
  isLoading: false,
}
  

export const switchSlice = createSlice({
  name: "switch",
  initialState: switchState,
  reducers: {
    switchButton: (state,action) =>{
      state.configureSwitch = action.payload
    }
  }
});