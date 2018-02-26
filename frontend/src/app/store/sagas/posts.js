/* Api Post */
import { getPosts, add, update } from './../../api/apiPost';

import { call, put } from 'redux-saga/effects';
import ActionCreators from './../ducks/posts';

export function* postRequest(action) {
    const response = yield call(getPosts, action.category, action.post_id);
    if (response.ok) {
        const posts = response.data instanceof Array ? response.data : [response.data];
        yield put(ActionCreators.postSuccess(posts, action.post_id ? true : false));
    } else {
        yield put(ActionCreators.postFailure());
    }
}

export function* postSave(action) {
    debugger
    if (action.isAdd) {
        yield postAdd(action.post);
    }
    else {
        yield postUpdate(action.post);
    }
}

export function* postAdd(post) { 
    const response = yield call(add, post);

    if (response.ok) {
        yield put(ActionCreators.postAddSuccess(post));
    }
}

export function* postUpdate(post) {
    const response = yield call(update, post);

    if (response.ok) {
        yield put(ActionCreators.postUpdateSuccess(post));
    }
}