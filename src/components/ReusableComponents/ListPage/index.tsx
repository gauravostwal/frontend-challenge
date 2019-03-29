import * as React from 'react';
import { Row, Col } from 'reactstrap';
import { Container } from 'reactstrap';

import './listPage.scss';

export interface IListPageProps {
    headings?: string[];
    columnLayout?: number[];
    shoppingList?: {
        attributes: string;
        name: string;
        item_id: number;
        price: string;
        quantity: number;
        subtotal: string;
    }[];
}

export class ListPage extends React.PureComponent<IListPageProps> {
    
    handleCounter = (quantity) => {

    }

    render() {
        const { headings, columnLayout, shoppingList } = this.props;

        return(
            <div className="list-page-wrapper">
                <Row className="list-page-headings">
                { headings.map((heading, index) => (
                        <Col 
                            md={columnLayout[index]} 
                            key={index}
                            className="page-heading"
                        >{ heading }</Col>
                    )) }
                </Row>
                <Row className="list-products">
                { shoppingList.map((listItem, index) => (
                        <React.Fragment>
                            <Col md={6} key={index} className="row-wrapper item-name"> { listItem.name }</Col>
                            <Col md={1} key={index + 1} className="row-wrapper item-attributes"> 
                                { listItem.attributes.split(' ')[0] }
                            </Col>
                            <Col md={3} key={index + 2} className="row-wrapper">
                            <button className="decrement-count" 
                                    onClick={ () => 
                                    this.handleCounter(--listItem.quantity) }
                            > - </button>                                     
                                <button className="count "> { listItem.quantity } </button>
                                <button className="decrement-count" 
                                    onClick={ () => 
                                    this.handleCounter(++listItem.quantity) }
                            > + </button> 
                            </Col>
                            <Col md={2} key={index + 3} 
                            className="row-wrapper item-price"> £ { listItem.subtotal }</Col>
                            
                        </React.Fragment>
                    )) }
                </Row>
            </div>
        );
    }
}
