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
    totalAmount?: {
        total_amount: string;
    };
    deliveryFormData?: {
        firstName: string;
        address_1: string;
        state: string;
        country: string;
        lastName: string;
        city: string;
        zipCode: string;
        shippingOptions: string;
        
    };
}

export class ConfirmationImpl extends React.PureComponent<IConfirmationMSPProps & IConfirmationProps> {

    render () {
        const { shoppingCart, customerDetails, totalAmount, deliveryFormData } = this.props;
        console.log(deliveryFormData);
        return (
            <div className="confirmation-form-wrapper">
            <div className="confirmation-form-details-wrapper">
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
                            <div className="delivery-detail-data">{deliveryFormData.address_1}</div>
                            <div className="heading-delivery-details">Delivery Options</div>
                            <div className="delivery-detail-data">{deliveryFormData.shippingOptions}</div>
                    </div>
                </div>
            </div>
                <div className="subtotal-wrapper">
                    <label className="subTotal-label">SubTotal</label>
                    <label className="subTotal-amount">&pound; {totalAmount.total_amount}</label>
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