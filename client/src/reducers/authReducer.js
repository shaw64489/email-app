//first arg - state object - initial state empty object
//second arg - action object
export default function(state = {}, action) {

    console.log(action);
    
    switch (action.type) {
        //no change return state
        default: 
            return state;
    }
}