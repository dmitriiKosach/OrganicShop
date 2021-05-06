import React from 'react';
import logo from '../images/logo_Rabbit.png';
import NavigationContainer from './NavigationContainer';

const Header = (props) => {
    return <React.Fragment>
        <div className="header">
            <div className="container">
                <header className="header-wrapper">
                    <div className="header-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <NavigationContainer/>
                </header>
            </div>
        </div>

    </React.Fragment>

}

export default Header;