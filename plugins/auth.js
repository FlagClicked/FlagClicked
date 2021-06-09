export default ({ store }, inject) => {
  inject("auth", {
    isLoggedIn() {
      return !!store.state.auth.user;
    },
    user() {
      return store.state.auth.user;
    },
    token() {
      return store.state.auth.token;
    },
  });
};
