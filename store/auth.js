// Based on https://github.com/jeffalo/ocular/blob/main/store/auth.js
import cookies from "js-cookie";

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
  },
};

export const actions = {
  async refreshUserDetails({ commit, dispatch }, obj) {
    let { token = cookies.get("token"), base = "" } = obj || {};
    let headers = {};
    if (process.server) {
      headers = { cookie: `token=${token}` };
    }

    var res;

    try {
      res = await fetch(`${base}/auth/me`, {
        method: "GET",
        credentials: "include",
        headers,
      });
    } catch (ex) {
      throw "Fetch Error";
    }
    let json = await res.json();
    if (!json.username) {
      commit("resetUser", null);
      commit("resetToken", null);
      return;
    } else {
      commit("setUser", json);
      commit("setToken", json);
      return json;
    }
  },

  async logout({ commit, dispatch }, obj) {
    let { token = cookies.get("token"), base = "" } = obj || {};
    let headers = {};
    if (process.server) {
      headers = { cookie: `token=${token}` };
    }

    var res;

    try {
      res = await fetch(`${base}/auth/delete`, {
        method: "PUT",
        credentials: "include",
        headers,
      });
    } catch (ex) {
      throw "Fetch Error";
    }

    commit("resetUser");
    commit("resetToken");
    return res;
  },
};
