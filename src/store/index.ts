import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { getUserData, checkForUserData } from '../services/loginService';
import { checkForUserExpiry } from '../utilities/generalUtils';
import { fromJS } from 'immutable';

const objectAssign = require('object-assign');

function configureStore(initialState = {}) {
    let composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
  
    let store = createStore(rootReducer,
        composeEnhancers(
        applyMiddleware(
            ...getMiddlewares(),
        )
    ));
    if ( checkForUserExpiry(getUserData())) {
        return store;
    }

    return store;
}

function getMiddlewares() {
    return [
        thunk,
        promiseMiddleware(),
    ];
}

export const store = configureStore();
