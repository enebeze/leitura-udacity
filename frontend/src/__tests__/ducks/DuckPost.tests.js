import PostActions, { reducer } from "../../app/store/ducks/posts";
import { arrayToObject } from "../../app/util/helpers";

const post = require("../data/posts.json").post;

describe("Testing post reducer", () => {
  it("can request posts success", () => {
    const objectPosts = arrayToObject([post]);
    /* create state and reques success  */
    const state = reducer({}, PostActions.postRequestSuccess(objectPosts, false));
    /* expect posts have value */
    expect(state.posts).toBeTruthy();
    /* expect posts has been added */
    expect(state.posts[post.id]).toEqual(post);
  });

  it("can request posts failure", () => {
    const objectPosts = arrayToObject([post]);
    /* create state and reques success  */
    const state = reducer({}, PostActions.postRequestFailure());
    /* expect posts have value */
    expect(state.posts).toEqual({});
    /* expect posts has been added */
    expect(state.error).toBe(true);
  });

  it("can save posts success", () => {
      /* create state without posts and add new post */
    const state = reducer({}, PostActions.postSaveSuccess(post));
    /* expect posts have value */
    expect(state.posts).toBeTruthy();
    /* expect posts has been added */
    expect(state.posts[post.id]).toEqual(post);
  });

  it("can like or not like posts", () => {
      /* create state with one post */
      /* and update vote score to 10 */
    const state = reducer(
      { posts: { [post.id]: post } },
      PostActions.postLikeNotLikeSuccess(post.id, 10)
    );

    /* expect the votescore of post has been update to 10  */
    expect(state.posts[post.id].voteScore).toBe(10);
  });

  it("can remove posts success", () => {
    const objectPosts = arrayToObject([post]);
    /* create state and remove success  */
    const state = reducer({}, PostActions.postRemoveSuccess(objectPosts));
    /* expect posts have value */
    expect(state.posts).toBeTruthy();
    /* expect posts has been added */
    expect(state.posts[post.id]).toEqual(post);
  });

  it("can order posts", () => {
    /* create state and order posts */
    const state = reducer({}, PostActions.postOrder("commentCount"));
    /* expect order posts has been changed */
    expect(state.orderBy).toBe("commentCount");
  })
});
