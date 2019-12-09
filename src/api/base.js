import axios from "axios/index";

export const axiosConfig = () => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 8000
});

axios.interceptors.request.use(
  function(config) {
    const appToken = process.env.REACT_APP_SOCRATA_API_TOKEN;
    if (
      appToken &&
      config &&
      config.url &&
      config.url.indexOf("//data.austintexas.gov/") > -1
    ) {
      config.headers["X-App-Token"] = appToken;
    }

    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  function(resp) {
    if (resp.headers) {
      // if (resp.headers['authtoken']) {
      //   updateAuthToken(resp.headers['authtoken']);
      // }
    }
    return resp;
  },
  function(err) {
    return Promise.reject(err.response);
  }
);
