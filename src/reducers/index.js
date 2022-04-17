import isLoggedReducer from "./isLogged";
import profileDataReducer from "./profileData";
import isLoadingReducer from "./isLoading";

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    profileData: profileDataReducer,
    isLoading: isLoadingReducer,
})

export default allReducers;