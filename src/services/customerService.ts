import { get, post } from '../utilities/HTTP';
import { saveCustomerDetails } from '../actions/customerActions';
import { UserModel } from '../Models/UserModel';
import { setSuccess } from '../actions/loadingActions';

export async function getCustomerDetails(regions) {
    try {
        UserModel.deleteAll();
        const { data } = await get(`/customer`);
        const { customer_id, ...otherFields } = data;
        new UserModel({ id: data.customer_id.toString(), ...otherFields }).$save();
        return;
    } catch (error) {
        throw error;
    }
}

export async function registerCustomer(email, password, name, history, path) {
        try {
            const { data } = await post(`/customers`, {
                email, password, name
            });
            setSuccess('register');
            history.push({
                pathname: path
            });
            return;
        } catch (error) {
            setSuccess('register');

            throw error;
        }
}
