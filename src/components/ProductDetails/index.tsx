import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getProductDetails } from '../../services/productService';
import { Loader } from '../ReusableComponents/Loader';
import { Async } from '../ReusableComponents/Async';
import { setLoading } from '../../actions/loadingActions';
import { ProductModel } from '../../Models/ProductModel';
import { NavBar } from '../Nav';
import { Row, Col } from 'react-bootstrap';
import './productDetails.scss';
import { element } from 'prop-types';
import { Control, Form } from 'react-redux-form';

export interface IProductDetailsProps {
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
}

export interface IProductDetailsProps {
    changeColor: number;
    changeColorButton: number;
    quantity: number;
}

export class ProductDetailsImpl extends React.Component<IProductDetailsProps> {
    static identifier = 'product-details';
    state = {
        changeColor: null, changeColorButton: null, quantity: 0
    };

    promise = () => {
        const { id } = this.props;
        setLoading('product-details');
        getProductDetails(parseInt(id));
        return;
    }
    handleChangeColor = (label, index) => {
        this.setState({ [label]: index });
    }
    handleCounter = (quantity) => {
        if ( quantity <= 0) {
            this.setState({ quantity: 0 });
            return;
        }
        this.setState({ quantity });
    }
    handleReviewSubmit = () => {

    }

    renderContent = () => {
        const {product, departmentId, attributes, reviews} = this.props;
        const { changeColor, changeColorButton } = this.state;
        let { quantity } = this.state;
        return (
            <React.Fragment>
                 <NavBar 
                    navBarLinks={['ALL', 'REGIONAL', 'NATURE', 'SEASONAL']}
                    routingLinks={['/products', '/products?departmentId=1', 
                    '/products?departmentId=2', 
                    '/products?departmentId=3']}
                    departmentId={departmentId || '0'}
                    brandName="SHOPMATE"
                />
               
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
                                        onClick={() => this.handleChangeColor('changeColor', index)} ></div>
                                    )) }
                            </div>
                            <div className="color-label">Size</div>
                            <div className="size-wrapper">
                                    
                                    { attributes && attributes.filter(attribute => attribute.attribute_name === 'Size')
                                    .map((attr, index) => (
                                        <button 
                                        className= { `size ${ index === changeColorButton && 'activeClassButton'  }` } 
                                        onClick= { () =>  this.handleChangeColor('changeColorButton', index )} >
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
                                    <button className="add-to-cart-button">Add to Cart</button>
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
    return {
        id: ownProps.match.params.id,
        product: ProductModel.get(ownProps.match.params.id),
        attributes: state.productInformation.get('saveAttributes'),
        reviews: state.productInformation.get('saveReviews')
    };    
}

export const ProductDetails = withRouter(connect(mapStateToProps)(ProductDetailsImpl));

