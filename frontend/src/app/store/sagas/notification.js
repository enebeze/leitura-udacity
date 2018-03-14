import { message } from "antd";
import { take } from "redux-saga/effects";

/* Types */
import { Types as PostTypes } from "./../ducks/posts";
import { Types as AuthTypes } from "./../ducks/auth";

export function* notification() {
  while (true) {
    const action = yield take([
      PostTypes.POST_SAVE_SUCCESS,
      PostTypes.POST_REMOVE_SUCCESS,
      AuthTypes.AUTH_LOGOUT
    ]);
    var msg = "Post Save Success";
    
    if (action.type === PostTypes.POST_REMOVE_SUCCESS) {
      msg = "Post Remove Success";
    }
    else if (action.type === AuthTypes.AUTH_LOGOUT) {
      msg = "User Logout Success";
    }

    message.success(msg);
  }
}
