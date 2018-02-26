import { takeLatest } from 'redux-saga/effects';

/* Types */
import { Types as PostTypes } from './../ducks/posts';
import { Types as CategoryTypes } from './../ducks/category';

/* Sagas */
import { postRequest, postSave } from './posts';
import { categoryRequest } from './category';

export default function* root() {
    yield [
        /* Posts */
        takeLatest(PostTypes.POST_REQUEST, postRequest),
        takeLatest(PostTypes.POST_SAVE, postSave),

        /* Category */
        takeLatest(CategoryTypes.CATEGORY_REQUEST, categoryRequest),
        
        /* Comments */

    ];
}