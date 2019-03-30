import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { getProductDetails, submitReviewForm, addProductsToCart } from '../../services/productService';
import { Loader } from '../ReusableComponents/Loader';
import { Async } from '../ReusableComponents/Async';
import { setLoading } from '../../actions/loadingActions';
import { ProductModel } from '../../Models/ProductModel';

import './productDetails.scss';
import { Control, Form } from 'react-redux-form';
import { getUniqueCardKey, getUserData } from '../../services/loginService';
import { setFilters, getQueryParams } from '../../utilities/generalUtils';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import {  ModalList } from '../ReusableComponents/Modal/index';
import { ListPage } from '../ReusableComponents/ListPage';
import { Checkout } from '../ReusableComponents/Checkout';

import { DeliveryForm } from '../ProductDetails/DeliveryForm/index';
import { ConfirmationForm } from './ConfirmationForm';
import { IUserModelProps, UserModel } from '../../Models/UserModel';

export interface IProductDetailsProps extends RouteComponentProps {

}

export interface IProductDetailsPropsMSP {
    id?: string;
    product?: ProductModel;
    departmentId?: string;
    attributes?: {
        attribute_name: string;
        attribute_value_id: string;
        attribute_value: string;
    }[];
    reviews?: {
        name: string;
        review: string;
        rating: number;
        created_on: string;
    }[];
    shoppingCart?: {
        attributes: string;
        name: string;
        item_id: number;
        price: string;
        quantity: number;
        subtotal: string;
    }[];
    customerDetails?: UserModel;
    totalAmount?: {
        total_amount: string;
    };
}

export interface IProductDetailsProps {
    changeColor: number;
    changeColorButton: number;
    quantity: number;
}

export class ProductDetailsImpl extends React.Component<IProductDetailsPropsMSP & IProductDetailsProps> {
    static identifier = 'product-details';
    state = {
        changeColor: null, changeColorButton: null, 
        quantity: 0, cart_id: getUniqueCardKey(), modal: false, 
        cartDetailsScreen: true, checkoutScreen: false
    };

    promise = () => {
        const { id } = this.props;
        setLoading('product-details');
        getProductDetails(parseInt(id));
        return;
    }
    handleChangeColor = (label, index, attribute) => {
        const { history, location: { search } } = this.props;
        const currentFilters = getQueryParams(search);
        const apiFilters = { ...currentFilters, ...attribute };

        setFilters(apiFilters, history);
        this.setState({ [label]: index });
    }

    handleCounter = (quantity) => {
        const { history, location: { search } } = this.props;
        if ( quantity < 0) {
            this.setState({ quantity: 0 });
            return;
        }
        const currentFilters = getQueryParams(search);
        const apiFilters = { ...currentFilters, quantity };

        setFilters(apiFilters, history);
        this.setState({ quantity });
    }

    handleReviewSubmit = (values) => {
        const { id } = this.props;
        setLoading('product-details');
        submitReviewForm(values, parseInt(id));
        return;
    }

    handleAddToCart = () => {
        const { id, history, location: { search } } = this.props;
        const { cart_id } = this.state;
        const currentFilters = getQueryParams(search);
        addProductsToCart(cart_id, id, currentFilters);
        return;
    }

    handleShoppingCartList = () => {
        this.setState(prevState => ({
            modal: !(prevState as any).modal
        }));
    }
    handleCheckout = () => {
        const { id, history, location: { search } } = this.props;
        const currentFilters = getQueryParams(search);

        let { checkoutSteps } = currentFilters;
        let apiFilter = checkoutSteps ? {checkoutSteps: parseInt(checkoutSteps as any) + 1 } : {checkoutSteps: 1};
        setFilters(apiFilter, history);
        this.setState({ cartDetailsScreen: false, checkoutScreen: true });
    }

    backButton = (backLink) => {
        const { history } = this.props;
        if (backLink) {
            this.setState({ modal: false });
            return;
        }
        this.setState({ cartDetailsScreen: true, checkoutScreen: false });
    }

    footerComponent = (leftButton, rightButton, backLink?) => {
        return(
            <React.Fragment>
                        <div className="button-wrapper">
                                    <button className="back-button" onClick={() => this.backButton(backLink)}>
                                        {leftButton}
                                    </button>
                        </div>
                        <div className="button-wrapper">
                            <button className="checkout-button" 
                            onClick={this.handleCheckout}>
                                {rightButton}
                            </button>
                        </div>
            </React.Fragment>
        );
    }
    cartDetailsScreen = (modal, shoppingCart, id) => {
        return (
        <ModalList isOpen={modal} 
            handleShoppingCart={this.handleShoppingCartList} 
            title={`${(shoppingCart || '').length || 0 } Items in your Cart`}
            shoppingList={shoppingCart}
            bodyComponent = {<ListPage 
            headings={['Item', 'Size', 'Quantity', 'Price']}
            columnLayout={[6, 1, 3, 2]}
            shoppingList={shoppingCart} />}
            footerComponent = {this.footerComponent('Back to Shop', 'Checkout', `/products/${id}`)}
        />);
    }

    bodyComponentView = () => {
        const { id, history, location: { search }, shoppingCart, customerDetails, totalAmount } = this.props;
        const currentFilters = getQueryParams(search);

        let { checkoutSteps } = currentFilters;
        
        switch (checkoutSteps) {
            case '1':
                return (<DeliveryForm />);
            case '2':
                return (<ConfirmationForm 
                        shoppingCart={shoppingCart} 
                        customerDetails={customerDetails} 
                        totalAmount={totalAmount}
                    />);
            default:
                break;
        }
    }

    checkoutScreen = (modal) => {
        const { id, history, location: { search } } = this.props;
        const currentFilters = getQueryParams(search);

        let { checkoutSteps } = currentFilters;

        return (
        <ModalList isOpen={modal} 
            handleShoppingCart={this.handleShoppingCartList} 
            title={<Checkout checkoutSteps={checkoutSteps}/>}
            bodyComponent = {this.bodyComponentView()}
            footerComponent = {this.footerComponent('Back', 'Next Step')}
        />
        );
    }

    renderContent = () => {
        const {product, departmentId, attributes, reviews, shoppingCart, id } = this.props;
        const { changeColor, changeColorButton, modal, cartDetailsScreen, checkoutScreen } = this.state;
        let { quantity } = this.state;
        return (
            <React.Fragment>
                { cartDetailsScreen && this.cartDetailsScreen(modal, shoppingCart, id) }
                {checkoutScreen && this.checkoutScreen(modal)}
                <div className="navbar-product-details-container">
                    <div className="Brand">SHOPMATE</div>
                        <div className="links-container">
                            <div className="links-region">
                                <Badge badgeContent={(shoppingCart || '').length || 0} 
                                color="secondary" onClick={this.handleShoppingCartList}>
                                        <ShoppingBasket style={{ color: 'white' }}/>
                                </Badge>
                            </div>
                        </div>
                </div>
               
                    <div className="details-wrapper">
                        <div className="image-wrapper">
                            <div>
                                    { product && <img src = 
                                    {`https://backendapi.turing.com/images/products/${product.props.thumbnail}`} 
                                    className="image-size"/>}
                            </div>
                            <div className="small-images-wrapper">
                                
                                <div className="small-image">
                                    { product && <img 
                                    src = { `https://backendapi.turing.com/images/products/${product.props.image}` }
                                    className="small-image-size"
                                    /> }
                                </div>
                                <div className="small-image">
                                    { product && <img src = 
                                    { `https://backendapi.turing.com/images/products/${product.props.image2}` }
                                    className="small-image-size"
                                    /> }
                                </div>
                            </div>
                        </div>
                        <div className="info-container">
                            <div className="product-name">{ product && product.props.name }</div>
                            <div className="image-price-details">£{ product && product.props.price }</div>
                            <div className="color-label">Color</div>
                            <div className="color-wrapper">
                                    
                                    { attributes && attributes.filter(attribute => attribute.attribute_name === 'Color')
                                    .map((attr, index) => (
                                        <div className={ `color color-${attr.attribute_value} 
                                        ${ index === changeColor && 'activeClass'  }` } 
                                        onClick={() => 
                                            this.handleChangeColor
                                            ('changeColor', index, { color: attr.attribute_value})} >
                                        </div>
                                    )) }
                            </div>
                            <div className="color-label">Size</div>
                            <div className="size-wrapper">
                                    
                                    { attributes && attributes.filter(attribute => attribute.attribute_name === 'Size')
                                    .map((attr, index) => (
                                        <button 
                                        className= { `size ${ index === changeColorButton && 'activeClassButton'  }` } 
                                        onClick= { () =>  
                                        this.handleChangeColor
                                        ('changeColorButton', index, {size: attr.attribute_value} )} >
                                             { attr.attribute_value }   
                                        </button>
                                    )) }
                            </div>
                            <div className="color-label">Quantity</div>
                            <div className="quantity-wrapper">
                                    <button className="decrement-count" 
                                    onClick={ () => this.handleCounter(--quantity) }> - </button>
                                    <button className="count"> { quantity } </button>
                                    <button className="increment-count"
                                    onClick={ () => this.handleCounter(++quantity) }
                                    >+</button>
                            </div>
                            <div className="add-to-cart-button-wrapper">
                                    <button className="add-to-cart-button" 
                                        onClick={ this.handleAddToCart }>
                                        Add to Cart
                                    </button>
                            </div>          
                        </div>
                    </div>
                    <div className="reviews-wrapper">
                        <div className="product-review-label">Product Reviews</div>
                        <div className="reviews-main-wrapper">
                        {reviews && reviews.map((reviews, index) => {
                            return (
                                <React.Fragment>
                            <div className="reviews-content-wrapper">
                                <div className="ratings-wrapper">
                                    {  Array(5).fill('rating', 0, reviews.rating).map((element, index) => {
                                        return (<span className={`fa fa-star ${element}`} aria-hidden="true"></span>);
                                    }) }
                                </div>
                                <div className="rating-review">
                                        { reviews.review }
                                </div>
                            </div>
                            <div className="reviews-content-wrapper">
                                <div className="ratings-review">
                                    {reviews.name}
                                </div>
                            
                            </div>
                        </React.Fragment>);
                        })}
                    </div>
                    <div className="add-review-wrapper">
                        <div className="add-review-label">
                            Add a review
                        </div>
                        <Form model="forms.reviewForm" onSubmit={this.handleReviewSubmit} className="form-wrapper">
                            <div className="input-name-wrapper">
                                    <div className="input-label">
                                        Choose a nickname
                                    </div>
                                    <div className="input-button-wrapper">
                                        <Control.text
                                            className="input-button" 
                                            model=".name"
                                            type="text"
                                        />
                                    </div>
                            </div>
                            <div className="input-name-wrapper">
                                    <div className="input-label">
                                        Your Review
                                    </div>
                                    <div className="input-button-wrapper ">
                                        <Control.text
                                            className="input-button review-button" 
                                            model=".review"
                                            type="text"
                                        />
                                    </div>
                            </div>
                            <div className="input-name-wrapper">
                                    <div className="input-label">
                                        Overall rating
                                    </div>
                                    <div className="input-button-wrapper ">
                                        <Control.text
                                            className="input-button" 
                                            model=".rating"
                                            type="number"
                                        />
                                    </div>
                            </div>
                            <div className="button-wrapper">
                                <button className="review-submit">Submit</button>
                            </div>
                        </Form>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
    
    render() {
        return(
            <Async
                identifier={ProductDetailsImpl.identifier} 
                promise={this.promise}
                loader={<Loader /> }
                error={<div>Error getting the list of products</div>}
                content={this.renderContent()}

            />
        );
    }
}

export function mapStateToProps(state, ownProps) {
    const userData = getUserData();
    return {
        id: ownProps.match.params.id,
        product: ProductModel.get(ownProps.match.params.id),
        attributes: state.productInformation.get('saveAttributes'),
        reviews: state.productInformation.get('saveReviews'),
        shoppingCart: state.productInformation.get('saveShoppingCart'),
        customerDetails: UserModel.get(userData.UniqueId),
        totalAmount: state.productInformation.get('saveShoppingCartAmount')
    };    
}

export const ProductDetails = withRouter(connect(mapStateToProps)(ProductDetailsImpl));
