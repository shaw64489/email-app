//SurveyNew shows SurveyForm and SurveyFormReview

import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

//import survey form
import SurveyForm from './SurveyForm';

//import survey form review
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

    //create component state
    //assigning state object - intial state false
    state = { showFormReview: false };

    //helper method
    renderContent() {

        //if state showformreview is true
        //retrun surveyformreview component
        //oncancel - if user clicks on button - flip state
        if (this.state.showFormReview) {

            return <SurveyFormReview 
                onCancel={() =>  this.setState({ showFormReview: false })}
            />;
        }

        //if false return SurveyForm
        //add callback onsurveysubmit
        //when submitting for state changes
        return <SurveyForm 
                onSurveySubmit={() => this.setState({ showFormReview: true })} 
                />;
    }

    //use render content helper to determine state and show component
    render() {

        return(

            <div>
                {this.renderContent()}
            </div>

        ); 
    }
}

//hook up redux form helper
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);