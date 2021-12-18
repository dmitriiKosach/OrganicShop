import {of} from "rxjs";
import firebase from "firebase";
import {authState} from "rxfire/auth";
import {docData} from "rxfire/firestore";
import {map, mergeMap} from "rxjs/operators";
import appFirebase from "../config/config_firebase";

export default class AuthFirebaseService {

    constructor() {
        this.auth = appFirebase.auth();
    }

    async registerNewUser(email, password, displayName, photoURL) {
        let user = null;
        //nullify empty arguments
        for (let i = 0; i < arguments.length; i++) {
            arguments[i] = arguments[i] ? arguments[i] : null;
        }
        return this.auth.createUserWithEmailAndPassword(email, password)
            .then(function (credential) {
                user = firebase.auth().currentUser;
                console.log('Validation link was sent to ' + email + '.');
                alert ('Registration completed successfully!');
                return credential;
            })
            .catch(function (error) {
                alert(error.message);
            })
            .finally(()=> {
                user.updateProfile({
                    displayName: displayName,
                    photoURL: photoURL
                });
            })
    };

    emailAuth(user) {
        return this.auth.signInWithEmailAndPassword(user.email, user.password);
    };

    facebookAuth(){
        let provider = new firebase.auth.FacebookAuthProvider();
        return this.auth.signInWithPopup(provider);
    };

    googleAuth() {
        const authProvider = new firebase.auth.GoogleAuthProvider();
        return this.auth.signInWithPopup(authProvider);
    };

    logout() {
        return this.auth.signOut();
    };

    getUserData () {
        return authState(this.auth)
            .pipe(mergeMap(user => {
                if (!user || !user.email) {

                    return of({});
                }
                if(user.displayName === null){
                    return this.auth.signOut();
                }

                return docData(appFirebase.firestore().collection("administrators").doc(user.email))
                    .pipe(map (admin => {
                        debugger
                        return {...user,  isAdmin: !!admin.email };
                    }))
            }))
    };
}
