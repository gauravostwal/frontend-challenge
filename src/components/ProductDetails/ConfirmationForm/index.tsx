import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import './confirmation.scss';
import { IUserModelProps, IUserModelPropsApi, UserModel } from '../../../Models/UserModel';

export interface IConfirmationProps extends RouteComponentProps {

}

export interface IConfirmationMSPProps {
    shoppingCart?: {
        attributes: string;
        name: string;
        item_id: number;
        price: string;
        quantity: number;
        subtotal: string;
    }[];
    customerDetails?: UserModel;
}

export class ConfirmationImpl extends React.PureComponent<IConfirmationMSPProps & IConfirmationProps> {

    render () {
        const { shoppingCart, customerDetails } = this.props;
        return (
            <div className="confirmation-form-wrapper">
                <div className="order-summary-wrapper">
                        <div className="confirmation-labels">Order Summary</div> 
                        <div className="headings">
                            <div className="heading-title">Item</div>
                            <div className="heading-title-other">Qty</div>
                            <div className="heading-title-other">Price</div>
                        </div>
                        <div className="items-wrapper">
                            { (shoppingCart || []).map((item, index) => (
                                <div className="row-wrapper">
                                    <div className="item">{item.name}</div>
                                    <div className="item-other">{item.quantity}</div>
                                    <div className="item-other">{item.price}</div>
                                </div>
                            )) }
                        </div>
                         
                </div>
                <div className="delivery-wrapper">
                    <div className="confirmation-labels">Delivery</div>
                    <div className="delivery-details">
                            <div className="heading-delivery-details">Address</div>
                            <div className="delivery-detail-data">{customerDetails.props.address_1}</div>
                            <div className="heading-delivery-details">Delivery Options</div>
                            <div className="delivery-detail-data">{customerDetails.props.address_1}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export function mapStateToProps(state, ownProps) {
    return {

    };
}

export const ConfirmationForm = withRouter(connect(mapStateToProps)(ConfirmationImpl)) 