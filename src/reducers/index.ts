import { combineReducers } from 'redux';

import { loadingReducers } from './loadingReducers';
import { modelReducers } from './modelReducers';
import { forms } from './forms';
import { productReducer } from '../reducers/productReducer';

export const rootReducer = combineReducers({
    models: modelReducers,
    loading: loadingReducers,
    forms,
    productInformation: productReducer
});
