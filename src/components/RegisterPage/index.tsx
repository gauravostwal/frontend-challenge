import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { CustomForm } from '../ReusableComponents/Form';
import { setLoading } from '../../actions/loadingActions';
import { registerCustomer } from '../../services/customerService';

export interface IRegisterProps extends RouteComponentProps{
    path?: string;
}

export class  RegisterPageImpl extends React.PureComponent<IRegisterProps> {
    
    static identifier = 'register';

    handleSubmit = (values) => {
        const { history, path } = this.props; 
        setLoading('register');
        registerCustomer(values.emailId, values.password, values.name , history, path);
    }

    render () {
        const inputs = [
        { modelName: 'name', type: 'text' },
        { modelName: 'emailId', type: 'text' }, 
        { modelName: 'password', type: 'password' }, 
        { modelName: 'retypePassword', type: 'password' }];
        return(
            <CustomForm
                handleSubmit = {this.handleSubmit}
                formContainerModel="forms.registerForm"
                topLabel="Sign Up"
                inputs= {inputs}
                identifier="register"
                bottomLabels={['Already a member ? ', 'Sign In']}
                routerLink= "/login"
            />
            
        );
    }
}
export function mapStateToProps() {
    return {
        path: '/login'
    };
}
export const RegisterPage = withRouter(connect(mapStateToProps)(RegisterPageImpl));
