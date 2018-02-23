import { takeLatest } from 'redux-saga/effects';

/* Types */
import { Types as PostTypes } from './../ducks/posts';

/* Sagas */
import { postRequest } from './posts';

export default function* root() {
    yield [
        takeLatest(PostTypes.POST_REQUEST, postRequest),
    ];
}