import AuthActions, { reducer } from "../../app/store/ducks/auth";

const user = {
  author: "thingone",
  email: "thingone@gmail.com",
  photoURL: "url"
};

describe("Testing auth reducer", () => {
  it("can auth login", () => {
    /* create state */
    let state = reducer();
    state = reducer(state, AuthActions.authLogin(user));
    /* my expect */
    expect(state.user).toEqual(user);
  });

  it("can auth logout", () => {
    /* create state */
    let state = reducer({ user });
    /* logout */
    state = reducer(state, AuthActions.authLogout());
    /* my expect */
    expect(state.user).toBe(null);
  });
});
