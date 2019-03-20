import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/LoginPage';
import { Product } from './components/Products';
import './styles/common.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route 
                    exact path="/"
                    component={Login}
                />
                <Route 
                    exact path="/products"
                    component={Product}
                />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
