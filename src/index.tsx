import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { AboutUs } from './components/AboutUs';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route 
                    exact path="/"
                    component={Home}
                />
                <Route 
                    exact path="/aboutus"
                    component={AboutUs}
                />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
