import * as React from 'react';
import './checkout.scss';

export interface ICheckoutProps {
    checkoutSteps?: string | string[];
}

export class Checkout extends React.Component<ICheckoutProps> {
    render() {
        const { checkoutSteps } = this.props;
        return (
        <div className="checkout-wrapper">
            <div className="checkout-progress-wrapper">
                <div className="checkout-options-wrapper">
                    <div className={`checkout-progressBar ${1 <= parseInt(checkoutSteps as any) && 'checked'}`}></div>
                    <div 
                    className={`checkout-progressBar-line ${2 <= parseInt(checkoutSteps as any) && 'checked'}`}></div>
                </div>
                <div className="checkout-options-wrapper">
                    <div className={`checkout-progressBar ${2 <= parseInt(checkoutSteps as any) && 'checked'}`}></div>
                    <div 
                    className={`checkout-progressBar-line ${3 <= parseInt(checkoutSteps as any) && 'checked'}`}></div>
                </div>
                <div className="checkout-options-wrapper">
                    <div className={`checkout-progressBar ${3 <= parseInt(checkoutSteps as any) && 'checked'}`}></div>
                    <div 
                    className={`checkout-progressBar-line ${4 <= parseInt(checkoutSteps as any) && 'checked'}`}></div>

                </div>
                <div className="checkout-options-wrapper">
                    <div className={`checkout-progressBar ${4 <= parseInt(checkoutSteps as any) && 'checked'}`}></div>
                </div>
            </div>
            <div className="checkout-progress-wrapper">
                
                <div className="checkout-common-label">
                        Delivery
                </div>
                <div className="checkout-common-label">
                        Confirmation
                </div>
                <div className="checkout-common-label">
                        Payment
                </div>
                <div className="checkout-common-label">
                        Finish
                </div>
            </div>
        </div>
        );
    }
}
