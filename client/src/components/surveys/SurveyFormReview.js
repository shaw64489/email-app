//SurveyFormReview - shows Users input for review
import _ from 'lodash';
import React from 'react';

import { connect } from 'react-redux';

//import survey fields
import formFields from './formFields';
//for routing on submit
import { withRouter } from 'react-router-dom';
//import action for submitting survey
import * as actions from '../../actions';
import { submitSurvey } from '../../actions';


//prop - oncancel - for cancel button
//submitSurvey action passed as prop
//use history object to naviagate around the application
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    //define fields to insert into return statement
    //for every element in form fields
    //return field and place into new array assigned to form fields
    const reviewFields = _.map(formFields, ({ name, label }) => {

        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });


    //button
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button 
                className="green white-text btn-flat right"
                onClick={() => submitSurvey(formValues, history)}
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

//taking redux state and turning into props to send to component
//called with entire state object
function mapStateToProps(state) {

    return{
        formValues: state.form.surveyForm.values
    };

}


//conect to pull values out of redux store
//second arg - list of actions
//wrap component with withRouter helper
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));