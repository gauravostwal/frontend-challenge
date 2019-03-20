import * as React from 'react';
import { withRouter } from 'react-router';
import { connect, DispatchProp } from 'react-redux';
import { Async } from '../ReusableComponents/Async';
import { getProducts } from '../../services/productService';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProductModel } from '../../Models/ProductModel';
import { Row, Col, Container } from 'reactstrap';
import { ProductCard } from '../ReusableComponents/ProductCard/index';
import { parse } from 'query-string';
import './product.scss';
import { NavBar } from '../Nav';
import { IHistory } from '../../../interfaces';
import { Loader } from '../ReusableComponents/Loader/index';

export interface IProductProps {
    products: ProductModel[];
    history?: IHistory;
    location?: any;
}

export class ProductImpl extends React.Component<IProductProps> {
    static identifier = 'product';

    promise = async () => {
        const { location } = this.props;
        const { departmentId, categoryId } = parse(location.search);
        await getProducts(departmentId, categoryId);
    }
    handleChangeRoute = (id) => {
        const { history } = this.props;
        history.push(`/products/${id}`);
    }

    renderContent = () => {
        const { products } = this.props;
        const { departmentId, categoryId } = parse(location.search);
        return(
            <React.Fragment>
                <NavBar 
                    navBarLinks={['ALL', 'REGIONAL', 'NATURE', 'SEASONAL']}
                    routingLinks={['/products', '/products?departmentId=1', 
                    '/products?departmentId=2', 
                    '/products?departmentId=3']}
                    departmentId={departmentId || '0'}
                    brandName="SHOPMATE"
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
