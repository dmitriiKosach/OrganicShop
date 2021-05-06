import { connect } from 'react-redux';
import ProductSketch from './ProductSketch';
import {actionUpdateProductList} from '../store/actions';


let mapStateToProps = (state) => {
    return {
        productList: state.productList.productList
    }
}

const ProductSketchContainer = connect(mapStateToProps, {actionUpdateProductList})(ProductSketch);

export default ProductSketchContainer;