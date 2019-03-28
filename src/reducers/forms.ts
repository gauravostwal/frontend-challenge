import { combineForms } from 'react-redux-form';

const loginForm = {
    emailId: '',
    password: ''
};

const reviewForm = {
    name: '',
    review: '',
    rating: null
};

export const forms = combineForms({
    loginForm, reviewForm
}, 'forms');
