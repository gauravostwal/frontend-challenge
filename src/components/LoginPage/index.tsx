import * as React from 'react';
import { connect } from 'react-redux';
import { setLoading } from '../../actions/loadingActions';
import { withRouter, RouteComponentProps } from 'react-router';
import { loginCustomer } from '../../services/loginService';

import './login.scss';
import { CustomForm } from '../ReusableComponents/Form';

export interface ILoginPageProps extends RouteComponentProps<any> {
    path?: string;
}

export class LoginImpl extends React.Component<ILoginPageProps> {
    
    static identifier = 'login';

    handleSubmit = (values) => {
        const { history, path } = this.props; 
        setLoading('login');
        loginCustomer(values.emailId, values.password, history, path);
    }
    
    render() {

        const inputs = [{ modelName: 'emailId', type: 'text' }, 
        { modelName: 'password', type: 'password' }];
        return(
            <CustomForm
                handleSubmit = {this.handleSubmit}
                formContainerModel="forms.loginForm"
                topLabel="Sign In"
                inputs= {inputs}
                identifier="login"
                bottomLabels={['New member ?', 'Sign Up']}
                routerLink="/"
            />
            
        );
    }
}
export function mapStateToProps(state, ownProps) {
    return {
        path: '/products'
    };
}
export const Login = withRouter(connect(mapStateToProps)(LoginImpl as any));
