import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    LINKS_AUTH,
    LINKS_NAV,
    PATH_BASKET,
    PATH_LOGIN,
    PATH_LOGOUT,
    PATH_ORDERS,
    PATH_REGISTRATION,
    PATH_SEARCH,
    PATH_STATISTICS,
    PATH_CUSTOMIZATIONS,
    PATH_ACCOUNT
} from '../config/config_header';
import supermarketGreen from '../images/supermarketGreen.png';
import Profile from "./Profile";

const Navigation = (props) => {
    const userData = useSelector(state => state.userData);

    const navigationMenu = LINKS_NAV.map(link => {
        if (link.path === PATH_ORDERS || link.path === PATH_STATISTICS) {
            return " ";
        } else {
            return <NavLink key={link.path} className="nav__link" to={link.path}>
                    <span className="nav__link-title">{link.label}</span>
                </NavLink>

        }
    });

    const navigationAuth = LINKS_AUTH.map(link => {
        if (link.path === PATH_SEARCH) {
            return <NavLink key={link.path} className="nav__link search__link" to={link.path}>
                    <img className="icon" src={link.image} alt="search" />
                </NavLink>

        }
        else if (link.path === PATH_BASKET) {
            return props.productList.length === 0 || !userData.email
                ?
                    <NavLink key={link.path} className="nav__link basket__link" to={link.path}>
                        <img className="icon" src={link.image} alt="search" />
                    </NavLink>

                :
                <NavLink key={link.path} className="nav__link basket__link" to={link.path}>
                        <img className="icon" src={supermarketGreen} alt="search" />
                        <div className="icon__count">{props.productList.length}</div>
                    </NavLink>

        }
        else if (link.path === PATH_CUSTOMIZATIONS) {
            return userData.email ?
                <div className="user__wrapper">
                        <Profile name={userData.displayName} />
                        <div className="user__inner">
                            <div className="user__content">

                                {userData.isAdmin
                                    ? <>
                                        <NavLink key={link.path} className="nav__link user__link" to={PATH_ORDERS}><span
                                            className="user__link-title">Orders</span></NavLink>
                                        <NavLink key={link.path} className="nav__link user__link" to={PATH_STATISTICS}><span
                                            className="user__link-title">Statistics</span></NavLink>
                                        <NavLink key={link.path} className="nav__link user__link" to={PATH_LOGOUT}><span className="user__link-title">Logout</span></NavLink>
                                    </>

                                    :  <>
                                        <NavLink key={link.path} className="nav__link user__link" to={PATH_ACCOUNT}><span className="user__link-title">My Account</span></NavLink>
                                        <NavLink key={link.path} className="nav__link user__link" to={PATH_ORDERS}><span className="user__link-title">My Orders</span></NavLink>
                                        <NavLink key={link.path} className="nav__link user__link" to={PATH_STATISTICS}><span className="user__link-title">My Statistics</span></NavLink>
                                        <NavLink key={link.path} className="nav__link user__link" to={PATH_LOGOUT}><span className="user__link-title">Logout</span></NavLink>
                                    </>

                                }
                            </div>
                        </div>
                    </div>
                : null
        }
        else if (link.path === PATH_LOGIN || link.path === PATH_REGISTRATION) {
            return !userData.email ? <NavLink key={link.path} className="nav__link" to={link.path}>
                    <span className="nav__link-title">{link.label}</span>
                </NavLink>
                : null
        }
        else {
            return <NavLink className="nav__link" to={link.path}>
                    <span className="nav__link-title">{link.label}</span>
                </NavLink>
        }
    });

    return (
        <React.Fragment>
            <nav className="nav">
                {navigationMenu}
            </nav>
            <div>
            </div>
            <div className="user">
                {navigationAuth}
            </div>
        </React.Fragment>
    )
}

export default Navigation;
