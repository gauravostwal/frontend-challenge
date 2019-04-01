import * as React from 'react';
import './payment.scss';
import { RouteComponentProps, withRouter } from 'react-router';
import { getQueryParams, setFilters } from '../../../utilities/generalUtils';
import { connect } from 'react-redux';
import { Control } from 'react-redux-form';

const visaLogo = require('../../../images/visa.png');
const paypalLogo = require('../../../images/paypal.png');
import './payment.scss';

export interface IPaymentProps extends RouteComponentProps {

}

export interface IPaymentPropsMSP {
    totalAmount? : {
        total_amount: string;
    };
}

export class PaymentFormImpl extends React.PureComponent<IPaymentProps & IPaymentPropsMSP> {
    
    handlePaymentOption = (paymentSelection) => {
        const { history, location: { search } } = this.props;
        const currentFilters = getQueryParams(search);
        const apiFilters = { ...currentFilters, paymentSelection };
        setFilters(apiFilters, history);
    }

    render() {
        const { totalAmount } = this.props;
        const { history, location: { search } } = this.props;

        const { checkoutSteps, paymentSelection } = getQueryParams(search);

        return (
            <div className="payments-wrapper">
                <div className="payments-image-wrapper">
                    <div className={`image-wrapper ${paymentSelection === 'visa' && 'checked-payment-image' }`} 
                    onClick={() => this.handlePaymentOption('visa')} >
                        <img src = {visaLogo} className="image-name"/>
                        <div className="payment-label">
                            Pay &pound; {totalAmount.total_amount} with credit card
                        </div> 
                    </div>
                    <div className={`image-wrapper ${paymentSelection === 'paypal' && 'checked-payment-image' }`} 
                    onClick={() => this.handlePaymentOption('paypal')}>
                        <img src = {paypalLogo} className="image-name"/>
                        <div className="payment-label">
                            Pay &pound; {totalAmount.total_amount} with PayPal
                        </div>  
                    </div> 
                </div>
                <div className="input-buttons-wrapper">
                    <div className="first-columns-wrapper">
                            <div className="payment-detail-label">Cardholder's Name</div>
                            <div className="card-holder-wrapper">
                                    <Control.text
                                        className="input-button" 
                                        model=".cardholder"
                                        type="text"
                                    />
                            </div>
                            
                            <div className="vali-thru-cvv-wrapper">
                                <div className="valid-thru-wrapper">
                                <div className="payment-detail-label">Valid thru</div>
                                <div className="card-holder-wrapper">
                                    <Control.text
                                        className="input-button" 
                                        model=".cardholder"
                                        type="text"
                                    />
                                </div>
                                </div>
                                <div className="cvv-wrapper">
                                <div className="payment-detail-label">CVV / CVC*</div>
                                <div className="card-holder-wrapper">
                                    <Control.text
                                        className="input-button" 
                                        model=".cvv"
                                        type="text"
                                    />
                                </div>
                                </div>
                            </div>
                    </div>
                    <div className="second-columns-wrapper">
                            <div className="payment-detail-label">Card Number</div>
                                <div className="card-holder-wrapper">
                                        <Control.text
                                            className="input-button" 
                                            model=".cardNumber"
                                            type="number"
                                        />
                                       
                                </div>
                            <div className="cvv-information-label">
                                * CVV or CVC is the card security code, unique three digits
                                number on the back of your card sepatate from its number;
                            </div>
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
export const PaymentForm = withRouter(connect(mapStateToProps)(PaymentFormImpl));
