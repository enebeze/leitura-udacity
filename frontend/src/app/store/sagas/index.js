import { takeLatest, fork } from 'redux-saga/effects';

/* Types */
import { Types as PostTypes } from './../ducks/posts';
import { Types as CategoryTypes } from './../ducks/category';

/* Sagas */
import { postRequest, postSave, postRemove, postLikeNotLike, postOrder } from './posts';
import { categoryRequest } from './category';

export default function* root() {
    yield [
        /* Posts */
        takeLatest(PostTypes.POST_REQUEST, postRequest),
        takeLatest(PostTypes.POST_SAVE, postSave),
        takeLatest(PostTypes.POST_REMOVE, postRemove),
        takeLatest(PostTypes.POST_LIKE_NOT_LIKE, postLikeNotLike),
        fork(postOrder),
        /* Category */
        takeLatest(CategoryTypes.CATEGORY_REQUEST, categoryRequest),
        
        /* Comments */

    ];
}