import {SET_ORDERS, SET_PRODUCTS, SET_USER_DATA, UPDATE_PRODUCT_LIST} from "./common";

export const actionOrders = (orders) => ({type: SET_ORDERS, payload: orders});
export const actionProducts = (products) => ({type: SET_PRODUCTS, payload: products});
export const actionUpdateProductList = (productList) => ({type: UPDATE_PRODUCT_LIST, productList: productList});
export const actionUserData = (userData) => {return {type: SET_USER_DATA, payload: userData}};





