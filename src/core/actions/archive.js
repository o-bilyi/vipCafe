import {store} from "../../index";
import {baseHandlerAction} from "./utils";
import {httpService, URLS} from "../../services";
import {archiveActionTypes} from "../models/archive";

export function addToArchive(item) {
  return {
    type: archiveActionTypes.ADD_ARCHIVE_ITEM_ACTION,
    payload: {
      item : [...item]
    }
  };
}

export function getArchive() {
  return dispatch => {
    dispatch(baseHandlerAction(archiveActionTypes.INIT_ARCHIVE_ITEM_ACTION, true));
    const FAIL_ACTION = (res) => dispatch(baseHandlerAction(archiveActionTypes.FAIL_ARCHIVE_ITEM_ACTION, {res}));
    return httpService().handleStatusCodes({
      200: (res) => dispatch(addToArchive(res)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(URLS.getArchiveOrders + `?user=2`); // ${store.getState().userProfile.id}
  };
}
