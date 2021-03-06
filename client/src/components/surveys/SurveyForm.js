//SurveyForm shows a form for a user to add input
//lodash library for helper functions - map function
import _ from 'lodash';
import React, { Component } from "react";
//helper from redux form - in control of any forms in component
//Field helper - render any type of input fields
import { reduxForm, Field } from "redux-form";
import { Link } from 'react-router-dom';
import SurveyField from "./SurveyField";

import validateEmails from '../../utils/validateEmails';

//fields array to hold field info
import formFields from './formFields';

class SurveyForm extends Component {
  //funtion to handle rendering fields in form
  //for every field - return one custom field
  //two props dont change - component and type
  //unique key prop
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
        return ( 
            <Field key={name} component={SurveyField} type="text"  label={label} name={name} />
        )
    });
  }

  //onsubmit - add callback to change state
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text" >
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

//all the different values coming off of our form
function validate(values) {

    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    //lodash - iterate over fields object
    _.each(formFields, ({ name }) => {

        //if value name is empty
        if(!values[name]) {
            //add one to the errors object
            errors[name] = 'You must provide a value';
        }
    });

    //if redux form gets this error obj back and its empty
    //assumes entire form is valid
    return errors;

}


//reduxForm options used to customize how form behaves
//option - form
//option - validate - for form validation
//destoyOnUnmount - dont kill when moving form offscreen
export default reduxForm({
    validate,
    form: "surveyForm",
    destroyOnUnmount: false
})(SurveyForm);
