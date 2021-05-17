import React, {useState} from 'react';
import Preloader from './Preloader';

export default function Logout (props) {

    const authService = props.authService;
    const [isLoader, setIsLoader] = useState(false);

    const onLogout = ()=> {
        if(window.confirm('You are going to perform logout')){
            setIsLoader(true);
            authService.logout()
                .then(() => {
                // Sign-out successful.
                    setIsLoader(false);
            })
                .catch((error) => {
                // An error happened.
                    setIsLoader(false);
            });;
        }
    };

    return <React.Fragment>
        <div className="content">
            <div className="container">
                <div className="content__header">
                    <span className="content__header-title">- Sign out -</span>
                </div>
                <div className="content__body">
                    <div className="logout">
                        <form className="form" onSubmit={onLogout} noValidate>
                            <div className="logout__body">
                                <h2 className="logout__title">
                                    Thank you! <br /> See you again :)
                                </h2>
                            </div>
                            <div className="button__group">
                                <div className="button__group-wrapper">
                                    <button className="button__close-logout" type="submit">
                                        Sign out
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
