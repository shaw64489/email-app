//import materialize css
import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import { createStore,  applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

//import app component
import App from './components/App';
//import for reducers
import reducers from './reducers'

//create store helper to create new instance of redux store
//pass reducers 
//second arg - initial state of app - we dont care so pass an empty object
//third arg - apply middleware
//hook up redux thunk as middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//reactdom take two args
//root component, where we attempt to render component in dom
//first arg - provider - to provide pass store - as child pass App component
//reference to existing DOM node - root div in public/index file
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);