import {SET_ORDERS, SET_PRODUCTS, SET_USER_DATA, UPDATE_PRODUCT_LIST} from "./common";
import {combineReducers, createStore} from "redux";

const reducerUserData = (state = {}, action) => {
    return action.type === SET_USER_DATA
        ? {...action.payload}
        : state;
};

const reducerOrders = (state = [], action) => {
    return action.type === SET_ORDERS
        ? action.payload.slice(0)
        : state;
};

const reducerProducts = (state = [], action) => {
    return action.type === SET_PRODUCTS
        ? action.payload.slice(0)
        : state;
};

const initialState = {
    productList: []
};

const reducerProductList = (state = initialState, action) => {
    if(action.type === UPDATE_PRODUCT_LIST){
        return   {...state, productList: action.productList};
    }
    return {...state};
};

const reducers = combineReducers({
    orders: reducerOrders,
    userData: reducerUserData,
    products: reducerProducts,
    productList: reducerProductList
});

const store = createStore(reducers);
window.store = store;
export default store;