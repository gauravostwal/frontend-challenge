import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/LoginPage';
import { Product } from './components/Products';
import { ProductDetails } from './components/ProductDetails';

import './styles/common.scss';

ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
            <Switch>
                <Route 
                    exact path="/"
                    component={Login}
                />
                <Route 
                    exact path="/products"
                    component={Product}
                />
                <Route 
                    exact
                    path = "/products/:id"
                    component={ProductDetails}
                />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
