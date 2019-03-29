import { store } from '../store';
import { parse, stringify } from 'query-string';
import { pickBy, identity } from 'lodash';
import * as H from 'history';

export function dispatch(action) {
    store.dispatch(action);
}

export function isEmpty(o) {
    if (Object.keys(o).length <= 0 || !o) {
        return true;
    } else {
        return false;
    }
}

export const isEmail = (val) => {
    let validationFlag: boolean = true;
    if (!val.includes('@') || !val) {
        return false;
    }
    return true;
};

export function cleanObj(o: Object) {
    return pickBy(o, identity);
}

export function setFilters(filters: any, history: H.History) {
    const { location: { pathname }, } = history;
    history.push({
        pathname,
        search: stringify(cleanObj(filters)),
    });
}

export function getQueryParams(search) {
    return parse(search);
}

export function marshalAddProductsToCart(values) {
    return values.size + ' ' + values.color[0];
}
