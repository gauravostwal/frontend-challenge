import { SAVE_ATTRIBUTES, SAVE_REVIEWS } from '../constants/action-types';
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