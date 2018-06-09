import axios from 'axios';
import { FETCH_USER } from './types'

//action creator - fetch user
const fetchUser = () => {

    //get request to backend - pass route to api
    axios.get('/api/current_user');

};