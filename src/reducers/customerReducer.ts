import { fromJS } from 'immutable';
import { SAVE_CUSTOMER_DETAILS } from '../constants/action-types';

export function customerReducer(state = fromJS({}), action) {
    switch (action.type) {
        case SAVE_CUSTOMER_DETAILS:
            return state.set('saveCustomerDetails', action.instance);
    
        default:
            return state;
    }
}