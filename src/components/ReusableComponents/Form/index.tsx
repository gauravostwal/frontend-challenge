import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Async } from '../Async';
import { setSuccess } from '../../../actions/loadingActions';
import { Loader } from '../Loader';
import './form.scss';
import { getUserData } from '../../../services/loginService';

export interface IFormProps extends RouteComponentProps<any> {
    handleSubmit: any;
    formContainerModel: string;
    topLabel: string;
    inputs: {
        modelName: string;
        type: string;
    }[];
    identifier: string;
    bottomLabels: string[];
    routerLink: string;
    isLoggedIn?: boolean;
}

export class FormImpl extends React.PureComponent<IFormProps> {

    componentWillMount() {
        const { isLoggedIn, history } = this.props;
        if (isLoggedIn) {
            history.push({
                pathname: '/products'
            });
        }
    }

    rendeContent = () => {
        const { handleSubmit, formContainerModel, 
            topLabel, inputs, identifier, history, bottomLabels, routerLink } = this.props;
        return (

            <div className="form-container">
                <Form 
                    model={formContainerModel} 
                    onSubmit={handleSubmit} 
                    className="form-wrapper"
                >
                    <div className="top-label">{topLabel}</div>
                    { inputs.map((input, index) => (
                        <div className="input-button-wrapper">
                        <Control.text
                            className="input-button" 
                            model={`.${input.modelName}`}
                            type={input.type}
                            placeholder={`Enter your ${input.modelName} here`}
                        />
                    </div>
                    ))}
                   <div className="signIn-wrapper">
                        <span>{bottomLabels[0]} &nbsp; &nbsp;</span>
                        <span style = {{ color: '#f62f5e', cursor: 'pointer' }} 
                        onClick = { ()  =>  history.push({ pathname: `${routerLink}` }) }>{bottomLabels[1]}</span>
                    </div>
                    <div className="input-button-wrapper">
                            <button className="common-login-signup-button">{topLabel}</button>
                    </div>
                </Form>
            </div>
        );
    }

    render () {
        const { identifier } = this.props;
        return (
                <Async 
                    identifier={identifier}
                    promise={() => setSuccess(identifier)}
                    error={<div>{`Error in ${identifier}`}</div>}
                    loader={<Loader />}
                    content={this.rendeContent()}
                />
        );
    }
}

export function mapStateToProps(state, ownProps) {
    const userData = getUserData();
    return {
        isLoggedIn: (userData || '').isLoggedIn
    };    
}

export const CustomForm = withRouter(connect(mapStateToProps)(FormImpl)); 