import { USER_PREFS_TYPE } from './UserPrefsModel';
import { USER_PREFS_STATE_TYPE } from '../../model/UsersState';

export const prefsSetfulfilled = (state, action) => {
    console.log('Reducer::prefsSetfulfilled', action);
    state.isLoading = false;
    state.prefs = []

}

export const prefsSetrejected = (state, action) => {
    console.log('Reducer::prefsSetrejected', action);
    state.isLoading = false;
    state.prefs = []

}

export const prefsGetfulfilled = (state, action) => {
    console.log('Reducer::prefsGetfulfilled', action);
    state.isLoading = false;
    state.prefs = action.payload.data.prefs
}

export const prefsGetrejected = (state, action) => {
    console.log('Reducer::prefsGetrejected', action);
    state.isLoading = false;
    state.prefs = []

}