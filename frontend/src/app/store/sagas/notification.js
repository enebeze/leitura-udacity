import { call, put, select, take } from "redux-saga/effects";

/* Types */
import { Types as PostTypes } from "./../ducks/posts";

export function* notification() {
    while(true) {
      yield take(PostTypes.POST_SAVE_SUCCESS);
      message.success('Post Save Success');
    }
  }