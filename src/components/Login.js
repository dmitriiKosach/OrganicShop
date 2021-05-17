import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {getErrorMessage, getInputElement} from '../utility/input_element';
import {DIGITS_PASSWORD, VALIDATE} from '../config/config_registration';
import Preloader from './Preloader';

export default function Login (props){

    const authService = props.authService;
    const [isLoader, setIsLoader] = useState(false);
    const [isInvalid, setIsInvalid] = useState(true);
    const [credentials, setCredentials] = useState ({
        "email": '',
        "password": ''
    });

    const[errors, setErrors] = useState({
        "email": '',
        "password": ''
    });

    const validateEmail = (email) => {
        return  VALIDATE.test(String(email).toLowerCase());
    };

    const handleChangeEmail = (event) => {
        event.preventDefault();
        const email = event.target.value;
        let textError = '';

        if(!validateEmail(email)){
            textError = 'Invalid email address'
        }else{
            setCredentials({...credentials, email: email});
        }
        setErrors({...errors, email: textError});
    };

    const handleChangePassword = (event) => {
        event.preventDefault();
        const password = event.target.value;
        let textError = '';

        if(password.length < DIGITS_PASSWORD){
            textError = `Password should be minimum ${DIGITS_PASSWORD} characters required`;
        }else{
            setCredentials({...credentials, password: password});
        }
        setErrors({...errors, password: textError});
    };

    const onFacebookAuth = () => {
        setIsLoader(true);
        return authService.facebookAuth()
            .then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // let token = result.credential.accessToken;
            // // The signed-in user info.
            // let user = result.user;
            // ...
                setIsLoader(false);
        })
            .catch((error) => {
            // Handle Errors here.
                setIsLoader(false);
                let errorCode = error.code;
                let errorMessage = error.message;
            // The email of the user's account used.
            // let email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // let credential = error.credential;
                alert(errorCode);
                alert(errorMessage);
            // ...
        });
    };

    const onGoogleAuth = () => {
        setIsLoader(true);
        return authService.googleAuth()
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // let token = result.credential.accessToken;
            // // // The signed-in user info.
            // let user = result.user;
            // ...
                setIsLoader(false);
        })
            .catch((error) => {
            // Handle Errors here.
                setIsLoader(false);
                let errorCode = error.code;
                let errorMessage = error.message;
            // The email of the user's account used.
            // let email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // let credential = error.credential;
                alert(errorCode);
                alert(errorMessage);
            // ...
        });;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setIsLoader(true);
        return credentials.email !== '' && credentials.password !== '' ?
            authService.emailAuth(credentials)
                .then(() => {
                    setIsLoader(false);
                })
                .catch((error) => {
                // Handle Errors here.
                    setIsLoader(false);
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    alert(errorCode);
                    alert(errorMessage);
                // ...
                }) : ''
    };

    useEffect(() => {
        const isValidate = () =>{
            return !(credentials.email !== '' && credentials.password !== ''
                && errors.email === "" && errors.password === "");
        };
        setIsInvalid(isValidate());
    },[credentials, errors]);

    return <React.Fragment>
        <div className="content" >
            <div className="container">
                <div className="content__header">
                    <span className="content__header-title">- Sign in -</span>
                </div>
                <div className="content__body">
                    <div className="form__wrapper">
                        <form className="form" onSubmit={onSubmit}  noValidate>
                            <div className="login__social">
                                <button className="login__social-icon" onClick={onFacebookAuth}><i className="fab fa-facebook" /></button>
                                <button className="login__social-icon" onClick={onGoogleAuth}><i className="fab fa-google" /></button>
                                <button className="login__social-icon" ><i className="fab fa-twitter"/></button>
                            </div>
                            <div className="login__body">
                                <div className="form__group">
                                    {getInputElement((errors.email ? 'input__error error__element' : 'input input__login'), 'email', '', 'email',
                                        'email', 'email', handleChangeEmail, 'Username')}
                                    {errors.email.length > 0 && (getErrorMessage('error__message', errors.email))}
                                </div>
                                <div className="form__group">
                                    {getInputElement((errors.password || errors.confirm ? 'input__error error__element' : 'input input__login'), 'password', '', 'password',
                                        'password', 'password', handleChangePassword, 'Password')}
                                    {errors.password.length > 0 && (getErrorMessage('error__message', errors.password))}
                                </div>
                            </div>
                            <div className="button__group">
                                <div className="button__group-padding">
                                    <button disabled={isInvalid} className="button__submit" id="submit" type="submit">
                                        Sign in
                                    </button>
                                </div>
                            </div>
                            <div className="login__footer">
                                <p className="login__footer-options">Not Registered?
                                    <NavLink to={'/registration'}>  Create an Account</NavLink>
                                </p>
                            </div>
                        </form>
                        {isLoader ? <Preloader/> : ''}
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

