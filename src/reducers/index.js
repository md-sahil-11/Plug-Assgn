import isLoggedReducer from "./isLogged";
import profileDataReducer from "./profileData";
import isLoadingReducer from "./isLoading";

import { combineReducers } from 'redux';

const userIdReducer = (state = '', action) => {
    if (action.type === 'SAVE_ID') {
        return action.payload
    } else if (action.type === 'DELETE_ID') {
        return ''
    } else return state;
}

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    profileData: profileDataReducer,
    isLoading: isLoadingReducer,
    userID: userIdReducer
})

export default allReducers;