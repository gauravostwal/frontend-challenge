import { combineForms } from 'react-redux-form';

const loginForm = {
    emailId: '',
    password: ''
};

const reviewForm = {
    name: '',
    review: '',
    rating: 0
};

export const forms = combineForms({
    loginForm, reviewForm
}, 'forms');
