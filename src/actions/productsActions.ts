import { SAVE_ATTRIBUTES, SAVE_REVIEWS, SAVE_SHOPPING_CART_PRODUCTS, 
    SAVE_REGIONS, SAVE_SHIPPING_DETAILS, SAVE_SHOPPING_CART_AMOUNT } from '../constants/action-types';
import { dispatch } from '../utilities/generalUtils';

export function saveProductAttributes(instance) {
    return dispatch({
        type: SAVE_ATTRIBUTES,
        instance
    });
}

export function saveProductReviews(instance) {
    return dispatch({
        type: SAVE_REVIEWS,
        instance
    });
}

export function saveShoppingCartProductList(instance) {
    return dispatch({
        type: SAVE_SHOPPING_CART_PRODUCTS,
        instance
    });
}

export function saveShippingRegions(instance) {
    return dispatch({
        type: SAVE_REGIONS,
        instance
    })
}

export function saveShippingDetails(instance) {
    return dispatch({
        type: SAVE_SHIPPING_DETAILS,
        instance
    })
}

export function saveShoppingCartAmount(instance) {
    return dispatch({
        type: SAVE_SHOPPING_CART_AMOUNT,
        instance
    });
}
