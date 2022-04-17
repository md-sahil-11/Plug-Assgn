import isLoggedReducer from "./isLogged";
import profileDataReducer from "./profileData";

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    profileData: profileDataReducer
})

export default allReducers;