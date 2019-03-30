import { dispatch } from "../utilities/generalUtils";
import { SAVE_CUSTOMER_DETAILS } from "../constants/action-types";

export function saveCustomerDetails(instance) {
    return dispatch({
        type: SAVE_CUSTOMER_DETAILS,
        instance
    });
}
