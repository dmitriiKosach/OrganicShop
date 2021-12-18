import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { actionOrders, actionProducts, actionUserData } from "./store/actions";
import './App.css';
import {
    PATH_ABOUT,
    PATH_BASKET,
    PATH_CATEGORIES,
    PATH_CONTACT,
    PATH_LOGIN,
    PATH_LOGOUT,
    PATH_ORDERS,
    PATH_RECIPES,
    PATH_REGISTRATION,
    PATH_SEARCH,
    PATH_HOME,
    PATH_STATISTICS,
    PATH_ACCOUNT
} from "./config/config_header";
import {
    PATH_BEVERAGES,
    PATH_BREAD_PASTRIES,
    PATH_CEREALS_LEGUMES,
    PATH_DAIRY_PRODUCTS,
    PATH_FISH,
    PATH_FRUITS,
    PATH_HONEY_MARMALADE,
    PATH_MEAT_SAUSAGE,
    PATH_PASTA,
    PATH_SPICES_HERBS,
    PATH_VEGETABLES,
    PATH_VINEGAR_OIL
} from './config/config_categories';
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Search from "./components/Search";
import Basket from "./components/Basket";
import Contact from "./components/Contact";
import Recipes from "./components/Recipes";
import Orders from "./components/Orders";
import Categories from "./components/Categories";
import Registration from './components/Registration';


import Fish from './components/Products/Fish';
import Pasta from './components/Products/Pasta';
import Fruits from './components/Products/Fruits';
import Beverages from './components/Products/Beverages';
import Vegetables from './components/Products/Vegetables';
import VinegarOil from './components/Products/VinegarOil';
import MeatSausage from './components/Products/MeatSausage';
import SpicesHerbs from './components/Products/SpicesHerbs';
import DairyProducts from './components/Products/DairyProducts';
import BreadPastries from './components/Products/BreadPastries';
import CerealsLegumes from './components/Products/CerealsLegumes';
import HoneyMarmalade from './components/Products/HoneyMarmalade';
import AuthFirebaseService from "./services/AuthFirebaseService";
import OrdersFirebaseService from "./services/OrdersFirebaseService";
import ProductsFirebaseService from "./services/ProductsFirebaseService";
import Statistics from "./components/Statistics";
import Account from './components/Account';

function App() {
    const authService = new AuthFirebaseService();
    const ordersService = new OrdersFirebaseService('orders');
    const productsService = new ProductsFirebaseService('products');
    const dispatch = useDispatch(); //react hook possibility to update global store
    const userData = useSelector(state => state.userData);
    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {

        authService.getUserData().subscribe(userData => {
            dispatch(actionUserData(userData));
        })//, error => alert(JSON.stringify(error)))
        ordersService.getOrders().subscribe(orders => {
            dispatch(actionOrders(orders));
        })//, error => alert(JSON.stringify(error)))
        productsService.getProducts().subscribe(products => {
            dispatch(actionProducts(products));
        })//, error => alert(JSON.stringify(error)))
        updateStatusOfUser(false);
    }, [isNewUser]);

    //////////////////////////////////////////////////////////////////////
    const [productsFilter, setProductFilter] = useState([]);
    const updateProductFilter = (array) => {
        setProductFilter(array);
    }
    const updateStatusOfUser = (value) => {
        setIsNewUser(value);
    }
    //////////////////////////////////////////////////////////////////////

    return <React.Fragment>

        <Header name={userData.name} />
        <Redirect to={PATH_HOME} />
        <Switch>
            <Route path={PATH_HOME} exact render={() => {
                return <Home productsService={productsService} updateProductFilter={updateProductFilter} />
            }}>
            </Route>
            <Route path={PATH_CATEGORIES} exact render={() => {
                return <Categories productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_RECIPES} exact render={() => {
                return <Recipes />
            }}>
            </Route>
            <Route path={PATH_ORDERS} exact render={() => {
                return <Orders ordersService={ordersService} username={userData.username} />
            }}>
            </Route>
            <Route path={PATH_STATISTICS} exact render={() => {
                return < Statistics />

            }}>
            </Route>
            <Route path={PATH_ABOUT} exact render={() => {
                return <About />
            }}>
            </Route>
            <Route path={PATH_CONTACT} exact render={() => {
                return <Contact />
            }}>
            </Route>
            <Route path={PATH_SEARCH} exact render={() => {
                return <Search productsService={productsService} productsFilter={productsFilter} updateProductFilter={updateProductFilter} />
            }}>
            </Route>
            <Route path={PATH_LOGIN} exact render={() => {
                return !userData.email
                    ? <Login authService={authService} />
                    : <Redirect to={PATH_HOME} />
            }}>
            </Route>
            <Route path={PATH_LOGOUT} exact render={() => {
                return userData.email
                    ? <Logout authService={authService} />
                    : <Redirect to={PATH_HOME} />
            }}>
            </Route>
            <Route path={PATH_REGISTRATION} exact render={() => {
                return !isNewUser
                    ? <Registration updateStatusOfUser={updateStatusOfUser} authService={authService} />
                    : <Redirect to={PATH_LOGIN} />
            }}>
            </Route>
            <Route path={PATH_BASKET} exact render={() => {
                return <Basket ordersService={ordersService} userData={userData} productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_ACCOUNT} exact render={() => {
                return <Account/>
            }}>
            </Route>


            <Route path={PATH_FRUITS} exact render={() => {
                return <Fruits productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_VEGETABLES} exact render={() => {
                return <Vegetables productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_DAIRY_PRODUCTS} exact render={() => {
                return <DairyProducts productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_BREAD_PASTRIES} exact render={() => {
                return <BreadPastries productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_BEVERAGES} exact render={() => {
                return <Beverages productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_MEAT_SAUSAGE} exact render={() => {
                return <MeatSausage productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_FISH} exact render={() => {
                return <Fish productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_VINEGAR_OIL} exact render={() => {
                return <VinegarOil productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_CEREALS_LEGUMES} exact render={() => {
                return <CerealsLegumes productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_SPICES_HERBS} exact render={() => {
                return <SpicesHerbs productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_PASTA} exact render={() => {
                return <Pasta productsService={productsService} />
            }}>
            </Route>
            <Route path={PATH_HONEY_MARMALADE} exact render={() => {
                return <HoneyMarmalade productsService={productsService} />
            }}>
            </Route>
        </Switch>
    </React.Fragment>
}

export default App;
