import axios from "axios";

export default class Axios {
  ax = axios;
  
  get(url, settings) {
    return this.ax.get(url, {}, settings)
  }

  post(url, settings) {
    return this.ax.post(url, settings)
  }
}