import React from 'react';

//instead of anchor tags client side
import { Link } from 'react-router-dom';

//functional component
const Dashboard = () => {

    //to property to make sure they get routed correctly
    return (

        <div>
            Dashboard
            <div className="fixed-action-btn">
                <Link to="/surveys/new" className="btn-floating btn-large red">
                    <i className="large material-icons">add</i>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;