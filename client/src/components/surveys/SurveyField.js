//Survey fields contains logic to render a single label and text input

import React from 'react';

//our custom form field
//props from redux form - input property from props
export default ({ input, label, meta: { error, touched } }) => {

    
    //input - a lot of props in input - give object with all keys and values in it
    //label provided by parent component so its reusable - passed prop called label
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }}/>
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};