//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
//helper from redux form - in control of any forms in component
//Field helper - render any type of input fields
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

class SurveyForm extends Component {

    //funtion to handle rendering fields in form
    //call survey field component
    renderFields() {
        return(
            <div>
                <Field type="text" name="title" component={SurveyField} />
            </div>
        );
    }

    render() {

        return(
            <div>
                <form 
                onSubmit={this.props.handleSubmit(values => console.log(values))}
                >
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                </form>
            </div>
        ); 
    }
}

//reduxForm options used to customize how form behaves
//option - form
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);