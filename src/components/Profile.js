import React from 'react';
import {useSelector} from 'react-redux';

const Profile = (props) => {

    const isAdmin = useSelector(state=>state.userData.isAdmin);

    return <React.Fragment>
        <div className="profile__info">
            <div className="profile__info-title">Hello, <br/> {isAdmin ? 'Administrator' : props.name}</div>
        </div>
    </React.Fragment>
}

export default Profile;