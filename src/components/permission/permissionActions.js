import spsApi from "apis/spsServer";

import { GET_ERRORS } from "actions/types";
import {
  //GET_PERMISSION,
  GET_PERMISSIONS,
  PERMISSIONS_LOADING
} from "./permissionActionTypes";

export const setPermissionsLoading = () => {
  return {
    type: PERMISSIONS_LOADING
  };
};

export const getPermissions = () => dispatch => {
  dispatch(setPermissionsLoading());
  spsApi
    .get("/v1/permissions")
    .then(res =>
      dispatch({
        type: GET_PERMISSIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
