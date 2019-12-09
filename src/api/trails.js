import axios from "axios/index";
import { axiosConfig } from "./base";

export function getUrbanTrails(cancelToken) {
  let config = axiosConfig(null, null);
  if (cancelToken) {
    config.cancelToken = cancelToken.token;
  }
  return axios.get(
    "https://data.austintexas.gov/resource/jdwm-wfps.json",
    config
  );
}
