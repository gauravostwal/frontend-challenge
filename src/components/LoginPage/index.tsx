import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Async } from '../ReusableComponents/Async';
import { setSuccess, setLoading } from '../../actions/loadingActions';
import { withRouter } from 'react-router';
import { IHistory } from '../../../interfaces';
import { loginCustomer } from '../../services/loginService';
import './login.scss';

export interface ILoginPageProps extends DispatchProp<any> {
    history: IHistory;
    pathName: string;
}

export class LoginImpl extends React.Component<ILoginPageProps> {
    
    state = { 

    };
    static identifier = 'login';

    handleSubmit = (values) => {
        const { history, pathName } = this.props; 
        setLoading('login');
        loginCustomer(values.emailId, values.password, history, pathName);
    }
    
    render() {
        return(
            <div className="login-container">
                <Form model="forms.loginForm" onSubmit={this.handleSubmit} className="form-wrapper">
                    <div className="input-button-wrapper">
                        <Control.text
                            className="input-button" 
                            model=".emailId"
                            type="text"
                            placeholder="Enter your email here"
                        />
                    </div>
                    <div className="input-button-wrapper">
                        <Control.text
                            className="input-button" 
                            model=".password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <Async 
                        identifier={LoginImpl.identifier}
                        promise={() => setSuccess('login')}
                        error={<div>Error in login</div>}
                        loader={<div>Loading</div>}
                        content={
                            <div className="input-button-wrapper">
                                <button className="login-button">Login</button>
                            </div>
                        }
                    />
                </Form>
            </div>
        );
    }
}
export function mapStateToProps(state, ownProps) {
    return {
        pathName: '/products'
    };
}
export const Login = withRouter(connect(mapStateToProps)(LoginImpl as any));
