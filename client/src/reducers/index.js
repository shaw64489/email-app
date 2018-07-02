
import { combineReducers } from 'redux';
//redux form
import { reducer as reduxForm } from 'redux-form';
//import auth reducer
import authReducer from './authReducer';
//import survey reducer
import surveysReducer from './surveysReducer';

//export combineReducer
//keys that exists within state object - auth state manufactured by authReducer
export default combineReducers  ({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});