import { GET_ERRORS } from "actions/types";
import {
  //GET_PERMISSIONTYPE,
  GET_PERMISSIONTYPES,
  PERMISSIONTYPES_LOADING
} from "./permissionTypesActionTypes";

import axios from "axios";

// export const createPermissionType = (
//   permissionTypeData,
//   callback_ok
// ) => dispatch => {
//   axios
//     .post("/v1/permissiontypes", permissionTypeData)
//     .then(res => {
//       callback_ok(res.data.id);
//     })
//     .catch(err => {
//       if (err.response) {
//         let errors = err.response.data;
//         errors.serverError = true;
//         dispatch({
//           type: GET_ERRORS,
//           payload: errors
//         });
//       } else {
//         dispatch({
//           type: GET_ERRORS,
//           payload: { anotherError: true }
//         });
//       }
//     });
// };

// export const getPermissionType = permissionType_id => dispatch => {
//   dispatch(setPermissionTypesLoading());
//   axios
//     .get(`/v1/permissiontypes/${permissionType_id}`)
//     .then(res =>
//       dispatch({
//         type: GET_PERMISSIONTYPE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// export const updatePermissionType = (
//   permissionTypeData,
//   callback_ok
// ) => dispatch => {
//   axios
//     .put(`/v1/permissiontypes/${permissionTypeData.id}`, permissionTypeData)
//     .then(res => {
//       callback_ok(permissionTypeData.id);
//     })
//     .catch(err => {
//       if (err.response) {
//         let errors = err.response.data;
//         errors.serverError = true;
//         dispatch({
//           type: GET_ERRORS,
//           payload: errors
//         });
//       } else {
//         dispatch({
//           type: GET_ERRORS,
//           payload: { anotherError: true }
//         });
//       }
//     });
// };

// export const deletePermissionType = (
//   permissionType_id,
//   callback_ok
// ) => dispatch => {
//   axios
//     .delete(`/v1/permissiontypes/${permissionType_id}`)
//     .then(res => {
//       callback_ok();
//     })
//     .catch(err => {
//       if (err.response) {
//         let errors = err.response.data;
//         errors.serverError = true;
//         dispatch({
//           type: GET_ERRORS,
//           payload: errors
//         });
//       } else {
//         dispatch({
//           type: GET_ERRORS,
//           payload: { anotherError: true }
//         });
//       }
//     });
// };

//permissionTypes loading
export const setPermissionTypesLoading = () => {
  return {
    type: PERMISSIONTYPES_LOADING
  };
};

export const getPermissionTypes = () => dispatch => {
  dispatch(setPermissionTypesLoading());
  axios
    .get("/v1/permissions")
    .then(res =>
      dispatch({
        type: GET_PERMISSIONTYPES,
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
