import React, { Component } from 'react';

import { connect } from 'react-redux';

//create header class based component
class Header extends Component {

    //helper method to replace links based on authentication status
    //inspect this.props.auth - depending on value return
    renderContent() {

        switch(this.props.auth) {
            //null
            case null:
                //return nothing
                return;
            //false
            case false:
                //link to login
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            //object - we are logged in
            default:
                return (
                    <li><a href="/api/logout">Logout</a></li>
                );

        }
    }

    //define render method
    //replace login if based on authentication status - call renderContent
    render() {

        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        Emaily
                    </a>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

//called with entire state object out of redux store
function mapStateToProps({ auth }) {

    //return object passed to header as props - auth state
    return { auth};

}

export default connect(mapStateToProps)(Header);

