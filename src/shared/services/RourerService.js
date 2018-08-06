import { push } from "react-router-redux";

class RouterService {
  store = null;
  setStore(store) {
    this.store = store;
  }

  navigateTo(location) {
    if(typeof location !== "string" && !location.pathname) {
      throw new Error("location should be string or object with wield path but got: " + location.pathname || location);
    }
    this.store.dispatch(push(location))
  }
}

export default new RouterService()
