import axios from "axios";
import { FETCH_USER } from "./types";

//action creator - fetch user
export const fetchUser = () => {
  //return function - when function executed it will make the request
  //dispatch passed to forward off request to reducers
  //dont want to dispatch an action until the request is completed
  return function(dispatch) {
    //get request to backend - pass route to api
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
