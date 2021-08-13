import cookies from "js-cookie";
var module;
if (process.server) {
  module = require("../plugins/authorization.server.js").module;
}
export const state = () => ({
  user: null,
  token: null,
});

export const mutations = {
  setUser(store, data) {
    store.user = data;
  },
  setToken(store, token) {
    store.token = token;
  },
  resetUser(store) {
    store.user = null;
  },
  resetToken(store) {
    store.token = null;
    cookies.remove("token");
  },
};

export const actions = {
  async refreshUserDetails(
    { commit, dispatch },
    { token = cookies.get("token") } = {}
  ) {
    let me = null;
    if (process.server) {
      me = await module.getSession(token);
    } else {
      try {
        let { data } = await this.$axios.get(`/auth/me`);
        me = data;
      } catch (error) {}
    }

    if (!me) {
      commit("resetUser", null);
      commit("resetToken", null);
      return;
    } else {
      commit("setUser", me);
      commit("setToken", token);
      return me;
    }
  },

  async logout({ commit, dispatch }, { token = cookies.get("token") } = {}) {
    let headers = {};
    if (process.server) {
      await module.deleteSession(token);
    } else {
      await this.$axios.delete("/auth/me", {}, { headers });
    }

    commit("resetUser");
    commit("resetToken");
  },
};
