const cookie = process.server ? require("cookie") : undefined;
const auth = process.server
  ? require("../plugins/authorization.server.js").module
  : undefined;

export const actions = {
  async nuxtServerInit({ commit }, { req, res }) {
    // handle auth stuff

    let token = null;
    if (req.headers.cookie) {
      const parsed = cookie.parse(req.headers.cookie);
      try {
        token = parsed["token"];
      } catch (error) {
        console.log(error);
      }
    }

    if (token) {
      const data = await auth.getSession(token);

      if (data) {
        commit("auth/setUser", data);
        commit("auth/setToken", token);
      } else {
        commit("auth/resetUser", null);
        commit("auth/resetToken", null);
        res.setHeader("Set-Cookie", [
          `token=false; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        ]);
      }
    }
  },
};
