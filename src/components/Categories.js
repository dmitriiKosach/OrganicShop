import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {LINKS_CATEGORIES} from '../config/config_categories';
import Product from './Product';


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
        return < div key={link.path} className="card__wrapper" >
            <NavLink className="card" to={link.path}>
                <img src={link.image} className="card__img" alt="..." />
                <div className="card__content">
                    <span className="card__content-title">{link.title}</span>
                </div>
            </NavLink>
        </div >
    });

    if(flag === 0){
        return <React.Fragment>
            <div className="content">
                <div className="container">
                    <div className="content__header">
                        <span className="content__header-title">- Food Categories -</span>
                    </div>
                    <div className="content__body">
                        {categoriesItem}
                    </div>
                    {isAdmin ? <div className="button__group">
                        <div className="button__group-wrapper">
                            <button className="button__submit" onClick={() => changeFlag(1)}>Add product</button>
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