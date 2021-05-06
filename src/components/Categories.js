import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {LINKS_CATEGORIES} from '../config/config_categories';
import Product from "./Product";


const Categories = (props) => {

    let [flag, setFlag] = useState(0);
    const isAdmin = useSelector(state => state.userData.isAdmin);

    const changeFlag = (parameter) => {
        switch (parameter) {
            case 0:
                setFlag(0);
                break;
            case 1:
                setFlag(1);
                break;
            default:
                break;
        }
    };

    const categoriesItem = LINKS_CATEGORIES.map(link => {
        return < div key={link.path} className="card-wrapper" >
            <NavLink className="card" to={link.path}>
                <img src={link.image} className="card-img" alt="..." />
                <div className="card-content">
                    <span className="card-content_text">{link.title}</span>
                </div>
            </NavLink>
        </div >
    });

    if(flag === 0){
        return <React.Fragment>
            <div className="content">
                <div className="container">
                    <div className="content-header">
                        <span className="title">- Food Categories -</span>
                    </div>
                    <div className="content-body">
                        {categoriesItem}
                    </div>
                    {isAdmin ? <div className="button-group">
                        <div className="button-group_wrapper">
                            <button className="button-submit" onClick={() => changeFlag(1)}>Add product</button>
                        </div>
                    </div> : null}
                </div>
            </div>
        </React.Fragment>
    }
    if(flag === 1){
        return (
            <div>
                <Product productsService={props.productsService} changeFlagFn={changeFlag}/>
            </div>
        )
    }

}

export default Categories;