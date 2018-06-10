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
