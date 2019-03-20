import * as React from 'react';
import { Col } from 'reactstrap';
import './productCard.scss';

export interface IProductCardProps {
    link: string;
    name: string;
    price: number;
    discountedPrice: number;
    handleChangeRoute?: Function;
    productId?: string;
}

export class ProductCard extends React.Component<IProductCardProps> {

    handleChangeRoute = (productId) => {
        this.props.handleChangeRoute(productId);
    }

    render() {
        const {link, name, price, discountedPrice, productId } = this.props;
        return (
            <React.Fragment>
            
                <div className="image-card" onClick={() => this.handleChangeRoute(productId)}>
                    
                <img 
                    src={link} 
                    style={{ width: '120px', height: '120px' }}/>
                <div className="image-name">{name}</div>
                <div className={discountedPrice !== 0 ? 
                    `image-price` : `image-price image-discounted-price`}>£{price}</div>
                
                <div className="image-price image-discounted-price">£{discountedPrice}</div>
                </div>
            
            </React.Fragment>
        );
    }
}
