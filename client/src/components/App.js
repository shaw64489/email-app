import React, { Component } from "react";
//BrowserRouter brains of react router
//Route set up rules - route/components
import { BrowserRouter, Route } from "react-router-dom";
//import action creators from actions file
import { connect } from 'react-redux';
import * as actions from '../actions';

//import header component
import Header from "./Header";
//import landing component 
import Landing from "./Landing";
//create functional app component - dashboard
const Dashboard = () => <h2>Dashboard</h2>;
//create functional app component - new survey
const SurveyNew = () => <h2>SurveyNew</h2>;


//create class app component
class App extends Component {
  //lifecycle method to fetch new user
  componentDidMount() {
      //call action creator
      this.props.fetchUser();
  }

  render() {
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
}



//export component
//null, pass in action creators - will be assigned to App component as props
export default connect(null, actions)(App);
