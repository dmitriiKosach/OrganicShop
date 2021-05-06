import {connect} from 'react-redux';
import Navigation from './Navigation';

let mapStateToProps = (state) => {
    return {
        productList: state.productList.productList
    }
};

const NavigationContainer = connect(mapStateToProps)(Navigation);

export default NavigationContainer;