import React from 'react';
//BrowserRouter brains of react router
//Route set up rules - route/components
import { BrowserRouter, Route } from 'react-router-dom';

//import header component
import Header from './Header';
//create functional app component - dashboard
const Dashboard = () => <h2>Dashboard</h2>
//create functional app component - new survey
const SurveyNew = () => <h2>SurveyNew</h2>
//create functional app component - landing
const Landing = () => <h2>Landing</h2>

//create functional app component
const App = () => {

    //return div
    //place collection of routes in browser router - at most one child - div
    //in child div - setup routing rules
    //Route - landing page (exact true so it doesnt show on other routes) - dashboard - new surveys
    //header always displayed no matter what
    return (
        <div className="container">
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        </div>
    );
}

//export component
export default App;