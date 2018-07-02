import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  //
  componentDidMount() {
    this.props.fetchSurveys();
  }

  //helper method to render surveys
  renderSurveys() {
    //iterate over list of survey - for each survey return a card
    return this.props.surveys.reverse().map(survey => {
      //return jsx
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    //helper method for rendering list of surveys
    return <div>{this.renderSurveys()}</div>;
  }
}

//from global state object return object that contains list of surveys
function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
