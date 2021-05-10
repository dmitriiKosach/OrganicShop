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
import UserInfo from "./UserInfo";

const Navigation = (props) => {
    const userData = useSelector(state => state.userData);

    const navigationMenu = LINKS_NAV.map(link => {
        if (link.path === PATH_ORDERS || link.path === PATH_STATISTICS) {
            return " ";
        } else {
            return <li key={link.path} className="nav-item">
                <NavLink className="nav-link" to={link.path}>
                    <span className="nav-link-title">{link.label}</span>
                </NavLink>
            </li>
        }
    });

    const navigationAuth = LINKS_AUTH.map(link => {
        if (link.path === PATH_SEARCH) {
            return <li key={link.path} className="nav-item">
                <NavLink className="nav-link" to={link.path}>
                    <img className="icon" src={link.image} alt="search" />
                </NavLink>
            </li>
        }
        else if (link.path === PATH_BASKET) {
            return props.productList.length === 0 || !userData.email
                ? <li key={link.path} className="nav-item">
                    <NavLink className="nav-link" to={link.path}>
                        <img className="icon" src={link.image} alt="search" />
                    </NavLink>
                </li>
                : <li key={link.path} className="nav-item">
                    <NavLink className="nav-link" to={link.path}>
                        <img className="icon" src={supermarketGreen} alt="search" />
                        <div className="icon_count">{props.productList.length}</div>
                    </NavLink>
                </li>
        }
        else if (link.path === PATH_CUSTOMIZATIONS) {
            return userData.email ?
                userData.isAdmin
                    ? <div className="usermenu">
                        <a className="nav-link"><UserInfo name={userData.displayName} /></a>
                        <div className="usermenu-wrapper">
                            <div className="user-menu_content">
                                <div className="menu-item"><NavLink className="nav-link" to={PATH_ORDERS}><span className="menu-item_title">Orders</span></NavLink></div>
                                <div className="menu-item"><NavLink className="nav-link" to={PATH_STATISTICS}><span className="menu-item_title">Statistics</span></NavLink></div>
                                <div className="menu-item"><NavLink className="nav-link" to={PATH_LOGOUT}><span className="menu-item_title">Logout</span></NavLink></div>
                            </div>
                        </div>
                    </div>
                    : <div className="usermenu">
                        <a className="nav-link"><UserInfo name={userData.displayName} /></a>
                        <div className="usermenu-wrapper">
                            <div className="user-menu_content">
                                <div className="menu-item"><NavLink className="nav-link" to={PATH_ACCOUNT}><span className="menu-item_title">My Account</span></NavLink></div>
                                <div className="menu-item"><NavLink className="nav-link" to={PATH_ORDERS}><span className="menu-item_title">My Orders</span></NavLink></div>
                                <div className="menu-item"><NavLink className="nav-link" to={PATH_STATISTICS}><span className="menu-item_title">My Statistics</span></NavLink></div>
                                <div className="menu-item"><NavLink className="nav-link" to={PATH_LOGOUT}><span className="menu-item_title">Logout</span></NavLink></div>
                            </div>
                        </div>
                    </div>
                : null
        }
        else if (link.path === PATH_LOGIN || link.path === PATH_REGISTRATION) {
            return !userData.email ? <li key={link.path} className="nav-item">
                <NavLink className="nav-link" to={link.path}>
                    <span className="nav-link-title">{link.label}</span>
                </NavLink>
            </li>
                : null
        }
        else {
            return <li key={link.path} className="nav-item">
                <NavLink className="nav-link" to={link.path}>
                    <span className="nav-link-title">{link.label}</span>
                </NavLink>
            </li>
        }
    });

    return (
        <React.Fragment>
            <nav className="header-nav">
                {navigationMenu}
            </nav>
            <div>
            </div>
            <div className="header-account">
                {navigationAuth}
            </div>
        </React.Fragment>
    )
}

export default Navigation;