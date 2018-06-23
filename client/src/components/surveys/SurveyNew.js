//SurveyNew shows SurveyForm and SurveyFormReview

import React, { Component } from 'react';

//import survey form
import SurveyForm from './SurveyForm';

class SurveyNew extends Component {

    render() {

        return(

            <div>
                <SurveyForm />
            </div>

        ); 
    }
}

export default SurveyNew;