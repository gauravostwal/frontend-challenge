import { combineReducers } from 'redux';

import { IState } from '../../interfaces';
import { loadingReducers } from './loadingReducers';
import { modelReducers } from './modelReducers';
import { forms } from './forms';

export const rootReducer = combineReducers<IState>({
    models: modelReducers,
    loading: loadingReducers,
    forms
});
