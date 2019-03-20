import { store } from '../store';

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
