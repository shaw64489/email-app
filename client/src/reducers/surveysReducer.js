import { FETCH_SURVEYS } from '../actions/types';

//first arg - state object - initial state empty array
//second arg - action object
export default function(state = [], action) {


    //watch for actions coming into reducer
    switch (action.type) {

        //action with type fetch surveys
        case FETCH_SURVEYS:
            //return surveys
            return action.payload;
        //no change return state 
        default: 
            return state;
    }
}