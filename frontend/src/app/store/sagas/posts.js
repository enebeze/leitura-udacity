/* Api Post */
import { getPosts } from './../../api/apiPost';

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