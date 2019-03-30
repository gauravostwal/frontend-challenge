import { fromJS } from 'immutable';
import { SAVE_ATTRIBUTES, SAVE_REVIEWS, SAVE_SHOPPING_CART_PRODUCTS, 
    SAVE_REGIONS, SAVE_SHIPPING_DETAILS } from '../constants/action-types';

export function productReducer(state = fromJS({}), action) {
    switch (action.type) {
        case SAVE_ATTRIBUTES:
            return state.set('saveAttributes', action.instance);
        case SAVE_REVIEWS:
            return state.set('saveReviews', action.instance);
        case SAVE_SHOPPING_CART_PRODUCTS: 
            return state.set('saveShoppingCart', action.instance);
        case SAVE_REGIONS: 
            return state.set('saveRegions', action.instance);
        case SAVE_SHIPPING_DETAILS:
            return state.set('saveShippingDetails', action.instance);
        default:
        return state;
    }    
}
