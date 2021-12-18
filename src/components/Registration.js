import React, {useEffect, useState} from 'react';
import {getErrorMessage, getInputElement} from '../utility/input_element';
import {DIGITS_NAME, DIGITS_PASSWORD, VALIDATE} from '../config/config_registration';
import Preloader from "./Preloader";

const Registration = (props) => {
    const authService = props.authService;
    const [isInvalid, setIsInvalid] = useState(true);
    const [isLoader, setIsLoader] = useState(false);

    const[user, setUser] = useState({
        "displayName": "",
        "email": "",
        "password": "",
        "confirm": ""
    });

    const[errors, setErrors] = useState({
        "displayName": "",
        "email": "",
        "password": "",
        "confirm": ""
    });

    const validateEmail = (email) => {
        return  VALIDATE.test(String(email).toLowerCase());
    };

    const handleChangeName = (event) => {
        event.preventDefault();
        const name = event.target.value;
        let textError = '';

        if(name.length < DIGITS_NAME){
            textError = `Name should be minimum ${DIGITS_NAME} characters required`;
        }else{
            setUser({...user, displayName: name});
        }
        setErrors({...errors, displayName: textError});
    };

    const handleChangeEmail = (event) => {
        event.preventDefault();
        const email = event.target.value;
        let textError = '';

        if(!validateEmail(email)){
            textError = 'Invalid email address'
        }else{
            setUser({...user, email: email});
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
            setUser({...user, password: password});
        }
        setErrors({...errors, password: textError});
    };

    const handleChangeConfirm = (event) => {
        event.preventDefault();
        const confirm = event.target.value;
        let textError = '';

        if(user.password !== confirm){
            textError = `Password is invalid`;
        }else{
            setUser({...user, confirm: confirm});
        }
        setErrors({...errors, confirm: textError});
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        setIsLoader(true);
        authService.registerNewUser(user.email, user.password, user.displayName,'')
            .then((credential) => {
                props.updateStatusOfUser(credential.additionalUserInfo.isNewUser);
                setIsLoader(false);
            })
            .catch(() => {
                setIsLoader(false);
            })

        setUser({...user, displayName: "", email: "", password: "", confirm: ""});
        form.reset();
    };

    useEffect(() => {
        const isValidate = () =>{
            return !(user.email !== "" && user.password !== "" && user.displayName !== "" && user.confirm !== ""
                && errors.email === "" && errors.password === "" && errors.displayName === "" && errors.confirm === "");
        };
        setIsInvalid(isValidate());
    },[user,errors]);

    return <React.Fragment>
        <div className="content">
                <div className="container">
                    <div className="content__header">
                        <span className="content__header-title">- Registration -</span>
                    </div>
                    <div className="content__body">
                        <div className="form__wrapper">
                            <form className="form" onSubmit={onSubmit}  noValidate>
                                <div className="form__group">
                                    {getInputElement((errors.displayName ? 'input__error error__element' : 'input input__login'), 'displayName', 'Name', 'text',
                                        'displayName', 'displayName', handleChangeName, 'Enter username')}
                                    {errors.displayName.length > 0 && (getErrorMessage('error__message', errors.displayName))}
                                </div>
                                <div className="form__group">
                                    {getInputElement((errors.email ? 'input__error error__element' : 'input input__login'), 'email', 'Email address', 'email',
                                        'email', 'email', handleChangeEmail, 'Enter email address')}
                                    {errors.email.length > 0 && (getErrorMessage('error__message', errors.email))}
                                </div>
                                <div className="form__group">
                                    {getInputElement((errors.password || errors.confirm ? 'input__error error__element' : 'input input__login'), 'password', 'Password', 'password',
                                        'password', 'password', handleChangePassword, 'Password')}
                                    {errors.password.length > 0 && (getErrorMessage('error__message', errors.password))}
                                </div>
                                <div className="form__group">
                                    {getInputElement((errors.confirm ? 'input__error error__element' : 'input input__login'), 'confirm', 'Confirm password', 'password',
                                        'confirm', 'confirm', handleChangeConfirm, 'Confirm password')}
                                    {errors.confirm.length > 0 && (getErrorMessage('error__message', errors.confirm))}
                                </div>
                                <div className="button__group">
                                    <div className="button__group-wrapper">
                                        <button disabled={isInvalid} className="button__submit" id="submit" type="submit">
                                            Registration
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {isLoader ? <Preloader/> : ''}
                        </div>
                    </div>

                </div>
            </div>
    </React.Fragment>
}

export default Registration;