import PostActions, { reducer } from "../../app/store/ducks/posts";

const post = require("../data/posts.json").post;

describe("Testing post reducer", () => {
  it("can request posts", () => {});

  it("can save posts", () => {
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

  it("can remove posts", () => {});
});
