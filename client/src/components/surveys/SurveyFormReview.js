//SurveyFormReview - shows Users input for review
import _ from 'lodash';
import React from 'react';

import { connect } from 'react-redux';

//import survey fields
import formFields from './formFields';

//prop - oncancel - for cancel button
const SurveyFormReview = ({ onCancel, formValues }) => {

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
                className="yellow darken-3 btn-flat"
                onClick={onCancel}
            >
                Back
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
export default connect(mapStateToProps)(SurveyFormReview);