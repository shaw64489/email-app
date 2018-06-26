//SurveyForm shows a form for a user to add input
//lodash library for helper functions - map function
import _ from 'lodash';
import React, { Component } from "react";
//helper from redux form - in control of any forms in component
//Field helper - render any type of input fields
import { reduxForm, Field } from "redux-form";
import { Link } from 'react-router-dom';
import SurveyField from "./SurveyField";

//fields array to hold field info
const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
]

class SurveyForm extends Component {
  //funtion to handle rendering fields in form
  //for every field - return one custom field
  //two props dont change - component and type
  //unique key prop
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
        return ( 
            <Field key={name} component={SurveyField} type="text"  label={label} name={name} />
        )
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

    //look at values obj - if no title
    if (!values.title) {
        errors.title = 'You must provide a title';
    }


    //if redux form gets this error obj back and its empty
    //assumes entire form is valid
    return errors;

}

//reduxForm options used to customize how form behaves
//option - form
//option - validate - for form validation
export default reduxForm({
    validate,
    form: "surveyForm"
})(SurveyForm);
