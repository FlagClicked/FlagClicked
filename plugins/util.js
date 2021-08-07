import axios from "@nuxtjs/axios";
export default function({ store }, inject) {
  inject("util", {
    getHost(req) {
      return process.server ? `${req.protocol}://${req.get("Host")}` : "";
    }
  });
}
