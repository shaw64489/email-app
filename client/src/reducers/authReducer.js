//import fetchUser action type
import { FETCH_USER } from '../actions/types';

//first arg - state object - initial state null - no clue if user is logged in
//second arg - action object
export default function(state = null, action) {


    //watch for actions coming into reducer
    switch (action.type) {

        //action with type fetch user
        case FETCH_USER:
            //return user model - either an object or false
            return action.payload || false;
        //no change return state - no clue if user is logged in
        default: 
            return state;
    }
}