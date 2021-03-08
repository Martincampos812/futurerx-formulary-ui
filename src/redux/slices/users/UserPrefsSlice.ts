import { createSlice } from '@reduxjs/toolkit';
import { getUserPrefs, setUserPrefs } from './UserPrefsActionCreator';
import { USER_PREFS_TYPE } from './UserPrefsModel';
import { prefsGetfulfilled, prefsGetrejected, prefsSetfulfilled, prefsSetrejected } from './UserPrefsReducers';

const userPrefsState: USER_PREFS_TYPE = {
    isLoading: false,
    prefsData: {},
}

export const userPrefsSlice = createSlice({
    name: "user_prefs",
    initialState: userPrefsState,
    reducers: {

    },
    extraReducers: builder => (
        builder.addCase(getUserPrefs.pending, (state, action) => {
            console.log("userPrefs started");

            state.isLoading = true;
        }),
        builder.addCase(getUserPrefs.fulfilled, (state, action) => {
            prefsGetfulfilled(state, action);
        }),
        builder.addCase(getUserPrefs.rejected, (state, action) => {
            prefsGetrejected(state, action);
        }),
        builder.addCase(setUserPrefs.pending, (state, action) => {
            console.log("userPrefs started");
            state.isLoading = true;
        }),
        builder.addCase(setUserPrefs.fulfilled, (state, action) => {
            prefsSetfulfilled(state, action);
        }),
        builder.addCase(setUserPrefs.rejected, (state, action) => {
            prefsSetrejected(state, action);
        })
    )
})