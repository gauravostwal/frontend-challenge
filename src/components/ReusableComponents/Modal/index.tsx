import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { ListPage } from '../ListPage';
import './modal.scss';

export interface IModalProps {
    isOpen?: boolean;
    handleShoppingCart?: Function;
    title?: any;
    shoppingList?: {
        attributes: string;
        name: string;
        item_id: number;
        price: string;
        quantity: number;
        subtotal: string;
    }[];
    bodyComponent?: any;
    footerComponent?: any;
}

export class ModalList extends React.PureComponent<IModalProps> {

    handleShoppingCartList = () => {
        this.props.handleShoppingCart();
    }

    handleCheckout = () => {

    }

    render() {
        const { isOpen, title, shoppingList, bodyComponent, footerComponent } = this.props;

        return (
            <Modal show={isOpen} onHide={this.handleShoppingCartList}>
                        <Modal.Header>
                            <Modal.Title>{ title } </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {bodyComponent}
                        </Modal.Body>
                        <Modal.Footer>
                                { footerComponent }
                        </Modal.Footer>
            </Modal>
        );
    }
}
