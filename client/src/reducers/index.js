
import { combineReducers } from 'redux';
//import auth reducer
import authReducer from './authReducer';

//export combineReducer
//keys that exists within state object - auth state manufactured by authReducer
export default combineReducers  ({
    auth: authReducer
});