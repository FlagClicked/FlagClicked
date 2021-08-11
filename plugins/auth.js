export default ({ store }, inject) => {
  inject("auth", {
    get isLoggedIn() {
      return !!store.state.auth.user;
    },
    get user() {
      return store.state.auth.user;
    },
    get token() {
      return store.state.auth.token;
    }
  });
};
