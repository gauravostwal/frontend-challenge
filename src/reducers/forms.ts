import { combineForms } from 'react-redux-form';

const loginForm = {
    emailId: '',
    password: ''
};

const registerForm = {
    name: '',
    emailId: '',
    password: '',
    retypePassword: ''
};

const deliveryForm = {
    firstName: '',
    lastName: '',
    address_1: '',
    city: '',
    state: '',
    zipCode: '',
    shippingOptions: '',
    country: ''
};

const paymentForm = {
    cardHolderName: '',
    cardNumber: '',
    validThru: '',
    cvv: ''
};

const reviewForm = {
    name: '',
    review: '',
    rating: 0
};

export const forms = combineForms({
    loginForm, reviewForm, registerForm , deliveryForm , paymentForm
}, 'forms');
