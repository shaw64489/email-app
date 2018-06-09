import React from 'react'; 
import ReactDOM from 'react-dom'; 

//import app component
import App from './components/App';

//reactdom take two args
//root component, where we attempt to render component in dom
//show app component - pass component instance App
//reference to existing DOM node - root div in public/index file
ReactDOM.render(
    <App />, 
    document.querySelector('#root')
);