import axios from "axios";
import { FETCH_USER } from "./types";

//action creator - fetch user
//return function - when function executed it will make the request
//dispatch passed to forward off request to reducers
//dont want to dispatch an action until the request is completed
export const fetchUser = () => async dispatch => {
  //get request to backend - pass route to api
  const res = await axios.get("/api/current_user");

  //res.data is user data
  dispatch({ type: FETCH_USER, payload: res.data });
};

//called with token from stripe api - handling stripe payments
export const handleToken = token => async dispatch => {
    //post request - send info to backend
    //pass token from stripe
    const res = await axios.post("/api/stripe", token);
  
    //res.data is user data - update user model in auth reducer
    dispatch({ type: FETCH_USER, payload: res.data });
};

//called with values - for submitting survey
//use history object to naviagate around the application
export const submitSurvey = (values, history)  => async dispatch =>  {
  
  //post request - submit form
  const res = await axios.post("/api/surveys", values);

  //reroute on submit
  history.push('/surveys')

  //res.data is user data - update user model in auth reducer
  dispatch({ type: FETCH_USER, payload: res.data });

};