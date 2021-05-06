import React from 'react';
import {useSelector} from 'react-redux';

const UserInfo = (props) => {

    const isAdmin = useSelector(state=>state.userData.isAdmin);

    return <React.Fragment>
        <div className="info">
            <div className="info-wrapper">
                <div className="info-title">Hello, <br/> {isAdmin ? 'Administrator' : props.name}</div>
            </div>
        </div>
    </React.Fragment>
}

export default UserInfo;