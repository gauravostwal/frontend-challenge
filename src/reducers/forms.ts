import { combineForms } from 'react-redux-form';

const loginForm = {
    emailId: '',
    password: ''
};

export const forms = combineForms({
    loginForm
}, 'forms');