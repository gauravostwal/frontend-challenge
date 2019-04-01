import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect, DispatchProp } from 'react-redux';
import { Async } from '../ReusableComponents/Async';
import { getProducts, getSearchInstances } from '../../services/productService';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProductModel } from '../../Models/ProductModel';
import { Row, Col, Container } from 'reactstrap';
import { ProductCard } from '../ReusableComponents/ProductCard/index';
import { parse } from 'query-string';
import './product.scss';
import { NavBar } from '../Nav';
import { IHistory } from '../../../interfaces';
import { Loader } from '../ReusableComponents/Loader/index';
import { setLoading, setSuccess } from '../../actions/loadingActions';
import { getQueryParams, setFilters } from '../../utilities/generalUtils';

export interface IProductProps extends RouteComponentProps {
    products: ProductModel[];
}

export class ProductImpl extends React.Component<IProductProps> {
    
    state = {
        search: ''
    }

    static identifier = 'product';

    promise =  () => {
        const { location } = this.props;
        const { departmentId, categoryId } = parse(location.search);
        getProducts(departmentId, categoryId);
    }
    handleChangeRoute = (id) => {
        const { history } = this.props;
        history.push({
            pathname: `/products/${id}` 
        });
    }
    handleLinkChange = (department) => {
        const { history, location: { search } } = this.props;
        setLoading('product');
        const currentFilters = getQueryParams(search);
        const apiFilters = { ...currentFilters, departmentId: department };
        setFilters(apiFilters, history);
        const { departmentId, categoryId } = parse(search);
        getProducts(department, categoryId);
    }  
    handleSubmit = () => {
        const { search } = this.state;
        setLoading('product')
        event.preventDefault()
        getSearchInstances(search);
    }

    handleInputChange = (event) => {
      this.setState({
        search: event.target.value
      });
    }
    searchBoxComponent = () => {
        const { search } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="search-box-wrapper">
            <input className="search-box" 
            onChange={this.handleInputChange} value={search} placeholder="Search..."/>
            <input type="submit" style={{visibility: 'hidden'}} />
          </form>
        );
    }

    renderContent = () => {
        const { products, history, location: { search } } = this.props;
        const { departmentId, categoryId } = parse(search);
        return(
            <React.Fragment>
                <NavBar 
                    navBarLinks={['ALL', 'REGIONAL', 'NATURE', 'SEASONAL']}
                    routingLinks={[undefined, '1', 
                    '2', 
                    '3']}
                    departmentId={departmentId || '0'}
                    brandName="SHOPMATE"
                    handleLinkChange={this.handleLinkChange}
                    searchBox={this.searchBoxComponent()}
                />
                <div style={{ padding: '60px', marginBottom: '12px' }}>
                    <Row style={{ marginRight: '0px' }}>
                        <Col md={3} xs={3} className="side-filtering-bar">

                        </Col>
                        <Col md={9} xs={9} >
                        {products.map((product , index) => (
                            <Col md={4} xs={6} className="image-row-wrapper">
                                <ProductCard 
                                    link={`https://backendapi.turing.com/images/products/${product.props.thumbnail}`}
                                    productId={product.props.id}
                                    name={product.props.name}
                                    discountedPrice={product.props.discounted_price}
                                    price={product.props.price} 
                                    key={index} 
                                    handleChangeRoute={(id) => this.handleChangeRoute(id)}
                                    />
                            </Col>
                        ))
                        }
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
    render() {
        return (
            <Async
                identifier={ProductImpl.identifier} 
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
        products: ProductModel.list()
    };
}
export const Product = withRouter(connect(mapStateToProps)(ProductImpl as any));
