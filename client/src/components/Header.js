import React, { Component } from 'react';

//create header class based component
class Header extends Component {
    //define render method
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        Emaily
                    </a>
                    <ul className="right">
                        <li>
                            <a>Login with Google</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;

