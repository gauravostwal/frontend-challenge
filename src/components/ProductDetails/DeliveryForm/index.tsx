import * as React from 'react';
import { Control, Form } from 'react-redux-form';
import './deliveryForm.scss';
import { getQueryParams } from '../../../utilities/generalUtils';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getShippingDetails } from '../../../services/productService';

export interface IDeliveryFormProps extends RouteComponentProps {

}

export interface IDeliveryFormMSPProps {
    countries?: {
        shipping_region_id: number;
        shipping_region: string;
    }[];
    shipping?: {
        shipping_id: number;
        shipping_type: string;
        shipping_cost: string;
        shipping_region_id: number;
    }[];
    handleSubmit: (values) => void;
   
}

export class DeliveryFormImpl extends React.PureComponent<IDeliveryFormProps & IDeliveryFormMSPProps> {

    handleRegionSelect = (region) => {
        const { history, location: { search } } = this.props;
        const currentFilters = getQueryParams(search);
        const { checkoutSteps, ...otherFields } = currentFilters;
        getShippingDetails(region.target.value);
    }

    render() {
        const { countries, shipping, handleSubmit } = this.props;
        return(
            <div className="delivery-wrapper">
            <Form  model="forms.deliveryForm" 
                    className="form-wrapper">
            <div className="form-wrapper-delivery">
                
                <div className="first-column-wrapper">
                        
                    <div className="input-button-wrapper">
                        <div className="input-label">
                            First name
                        </div>
                        <Control.text
                            className="input-button" 
                            model=".firstName"
                            type="text"
                        />
                    </div>
                    <div className="input-button-wrapper">
                        <div className="input-label">
                            Address
                        </div>
                        <Control.text
                            className="input-button" 
                            model=".address_1"
                            type="text"
                        />
                    </div>
                    <div className="input-button-wrapper">
                        <div className="input-label">
                            State
                        </div>
                        <Control.text
                            className="input-button" 
                            model=".state"
                            type="text"
                        />
                    </div>
                    <div className="input-button-wrapper">
                        <div className="input-label">
                            Country
                        </div>
                        <Control.select model=".country" className="input-button" 
                        onChange={this.handleRegionSelect}>
                            
                            { (countries || []).map((country, index) => (
                                <option 
                                value={country.shipping_region_id} 
                                key={index}
                                
                                >{country.shipping_region}</option>
                            )) }
                        </Control.select>
                    </div>
                </div>
                <div className="second-column-wrapper">
                    <div className="input-button-wrapper">
                        <div className="input-label">
                            Last name
                        </div>
                        <Control.text
                            className="input-button" 
                            model=".lastName"
                            type="text"
                        />
                    </div>
                    
                    <div className="input-button-wrapper">
                        <div className="input-label">
                            City
                        </div>
                        <Control.text
                            className="input-button" 
                            model=".city"
                            type="text"
                        />
                    </div>
                    
                    <div className="input-button-wrapper">
                        <div className="input-label">
                            Zip code
                        </div>
                        <Control.text
                            className="input-button" 
                            model=".zipCode"
                            type="text"
                        />
                    </div>
                </div>
            </div>
            <div className="delivery-options-wrapper">
                <div className="delivery-title">
                    Delivery options
                </div>
                <div className="delivery-options">
                     { (shipping || []).map((detail, index) => (
                            
                                <div className="delivery-option">
                                
                                    <Control.radio
                                    id={(detail.shipping_id).toString()}
                                    model= ".shippingOptions"
                                    updateOn={['change']}
                                    ignore={['focus', 'blur']}
                                    value={detail.shipping_type}
                                    className="input-select"
                                    />
                                {detail.shipping_type}
                                </div>
                     )) }
                </div>
            </div>
            </Form>
            </div>
        );
    }
}

export function mapStateToProps(state, ownProps) {
        return {
            countries: state.productInformation.get('saveRegions'),
            shipping: state.productInformation.get('saveShippingDetails'),
        };
}

export const DeliveryForm = withRouter(connect(mapStateToProps)(DeliveryFormImpl));
