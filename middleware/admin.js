const cookie = process.server ? require("cookie") : require("js-cookie");

export default async function ({ redirect, req, store, $auth, $util }) {
  let token = null;

  if (process.server) {
    if (req.headers.cookie) {
      token = cookie.parse(req.headers.cookie).token
    }
  } else {
    token = cookie.get("token");
  }

  await store.dispatch("auth/refreshUserDetails", { token, base: $util.getHost(req) });

  if (!$auth.user().admin) {
    redirect("/");
  }
}
