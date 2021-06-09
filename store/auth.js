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
  async refreshUserDetails({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      let headers = {};
      if (process.server) {
        headers = { cookie: `auth=${cookies.get("auth")}` };
      }
      fetch(`${process.env.backendURL}/auth/me`, {
        method: "GET",
        credentials: "include",
        headers,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            dispatch("logout");
          } else {
            commit("setUser", res);
            resolve(res);
          }
        });
    });
  },
  async logout({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      let token = cookies.get("auth");
      let res = await fetch(`${process.env.backendURL}/auth/delete`, {
        credentials: "include",
      });
      let json = await res.json();

      commit("resetUser", res);
      commit("resetToken", res);

      if (json.error) return resolve(json.error);
      resolve(json.ok);
    });
  },
};
