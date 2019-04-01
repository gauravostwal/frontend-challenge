import { get, post } from '../utilities/HTTP';
import { setSuccess } from '../actions/loadingActions';
import { IHistory } from '../../interfaces';
import { IUserModelPropsApi, UserModel } from '../Models/UserModel';

export async function loginCustomer(email, password, history, path) {
        try {
            const { data }   = await post<IUserModelPropsApi>('/customers/login', {
                email, password
            });
            const { data: uniqueKey } = await get(`/shoppingcart/generateUniqueId`);
            saveCartUniqueKey(uniqueKey.cart_id);
            setSuccess('login');
            const userData = parseJwt(data.accessToken);
            saveUserData(data.accessToken || '', userData.name, userData.customer_id, userData.exp);
            const { customer_id, ...otherFields } = data.user;
            new UserModel({ id: data.user.customer_id, accessToken: data.userToken , ...otherFields }).$save();
            history.push({
                pathname: path
            });
        } catch (error) {
            throw error;
        }
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('bearerToken'));
}

export function checkForUserData() {
        const userData = getUserData();
        if (userData === null) {
            document.location.href = '/';
            return true;
        }
    return false;
}

export function getUniqueCardKey() {
    return JSON.parse(localStorage.getItem('card_id'));
}
export function saveUserData(token, userId, UniqueId, expiryTime) {
    localStorage.setItem('bearerToken', JSON.stringify({
        token, userId, isLoggedIn: true, UniqueId, expiryTime
    }));
}

export function saveCartUniqueKey(cart_id) {
    localStorage.setItem('card_id', JSON.stringify({
        cart_id
    }));
}

export function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}