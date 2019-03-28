import { fromJS } from 'immutable';
import { SAVE_ATTRIBUTES, SAVE_REVIEWS } from '../constants/action-types';

export function productReducer(state = fromJS({}), action) {
    switch (action.type) {
        case SAVE_ATTRIBUTES:
            return state.set('saveAttributes', action.instance);
        case SAVE_REVIEWS:
            return state.set('saveReviews', action.instance)
        default:
        return state;
    }    
}
