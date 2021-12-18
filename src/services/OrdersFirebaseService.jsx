import {collectionData} from "rxfire/firestore";
import appFirebase from "../config/config_firebase";


export default class OrdersFirebaseService {
    constructor(collection) {
        this.database = appFirebase.firestore().collection(collection);
    }

    getOrders(){
        return collectionData(this.database);
    };

    addOrder(order){
        return this.database.doc(String(order.orderID)).set(order)
            .then(function (){
                alert(`Order was created successfully!!! To payment for the order click "My Order"!`);
        })
            .catch(function (error){
                alert(error)
            });
    };

    removeOrder(orderID){
        return this.database.doc(String(orderID)).delete();
    };

    updateOrder(order){
        return this.database.doc(String(order.orderID)).set(order);
    };
}
