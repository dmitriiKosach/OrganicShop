import { connect } from 'react-redux';
import {actionUpdateProductList} from '../store/actions';
import ProductList from './ProductList';

let mapStateToProps = (state) => {
    return {
        productList: state.productList.productList
    }
}

const ProductListContainer = connect(mapStateToProps, {actionUpdateProductList})(ProductList);

export default ProductListContainer;