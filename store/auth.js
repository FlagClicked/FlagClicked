// Based on https://github.com/jeffalo/ocular/blob/main/store/auth.js
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
    var me;
    if (process.server) {
      me = await module.getSession(token);
    } else {
      var res;

      try {
        res = await fetch(`/auth/me`, {
          credentials: "include",
        });
      } catch (ex) {
        throw "Fetch Error";
      }
      let json = await res.json();

      me = json.error ? null : json;
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
      var res;

      try {
        res = await fetch(`/auth/delete`, {
          method: "PUT",
          credentials: "include",
          headers,
        });
      } catch (ex) {
        throw "Fetch Error";
      }
    }

    commit("resetUser");
    commit("resetToken");
  },
};
