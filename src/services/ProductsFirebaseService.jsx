import {collectionData} from "rxfire/firestore";
import appFirebase from "../config/config_firebase";


export default class ProductsFirebaseService {
    constructor(collection) {
        this.database = appFirebase.firestore().collection(collection);
    }

    getProducts(){
        return collectionData(this.database);
    };

    addProduct(product){
        return this.database.doc(String(product.article)).set(product);
    };

    removeProduct(article){
        return this.database.doc(String(article)).delete();
    };


    updateReserve(product){
        return this.database.doc(String(product.article)).set(product);
    };
}