import { get } from '../utilities/HTTP';
import { saveCustomerDetails } from '../actions/customerActions';
import { UserModel } from '../Models/UserModel';

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
