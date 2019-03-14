import { GET_ERRORS } from "actions/types";
import {
  //GET_PERMISSIONASSIGNMENT,
  //GET_PERMISSIONASSIGNMENTS,
  PERMISSIONASSIGNMENTS_LOADING
} from "./permissionAssignmentsActionTypes";

import axios from "axios";

export const createPermissionAssignment = (
  permissionAssignmentData,
  callback_ok
) => dispatch => {
  axios
    .post("/v1/rolepermissions", permissionAssignmentData)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      if (err.response) {
        let errors = err.response.data;
        errors.serverError = true;
        dispatch({
          type: GET_ERRORS,
          payload: errors
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { anotherError: true }
        });
      }
    });
};

// export const getPermissionAssignment = permissionAssignment_id => dispatch => {
//   dispatch(setPermissionAssignmentsLoading());
//   axios
//     .get(`/v1/permissionassignments/${permissionAssignment_id}`)
//     .then(res =>
//       dispatch({
//         type: GET_PERMISSIONASSIGNMENT,
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

// export const updatePermissionAssignment = (
//   permissionAssignmentData,
//   callback_ok
// ) => dispatch => {
//   axios
//     .put(`/v1/permissionassignments/${permissionAssignmentData.id}`, permissionAssignmentData)
//     .then(res => {
//       callback_ok(permissionAssignmentData.id);
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

// export const deletePermissionAssignment = (
//   permissionAssignment_id,
//   callback_ok
// ) => dispatch => {
//   axios
//     .delete(`/v1/permissionassignments/${permissionAssignment_id}`)
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

//permissionAssignments loading
export const setPermissionAssignmentsLoading = () => {
  return {
    type: PERMISSIONASSIGNMENTS_LOADING
  };
};

// export const getPermissionAssignments = () => dispatch => {
//   dispatch(setPermissionAssignmentsLoading());
//   axios
//     .get("/v1/permissions")
//     .then(res =>
//       dispatch({
//         type: GET_PERMISSIONASSIGNMENTS,
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
