import {createSlice} from "@reduxjs/toolkit";


const gridSettingsState: any = {
  hiddenColumns: [],
  isLoading: false,
}
  

export const gridSettingsSlice = createSlice({
  name: "gridSettings",
  initialState: gridSettingsState,
  reducers: {
    setHiddenColum: (state,action) => {
        state.hiddenColumns = action.payload
    },
    clearHiddenColumns: (state,action) => {
        console.log(action.payload)
        state.hiddenColumns = action.payload ? [] : [];
    }
  }
});