import { GET_ERRORS } from "actions/types";
// import {
//   GET_PROCESSPUBLICATION,
//   GET_PROCESSPUBLICATIONS,
//   PROCESSPUBLICATIONS_LOADING
// } from "./processPublicationsActionTypes";

import axios from "axios";

export const createProcessPublication = (
  processPublicationsData,
  callback_ok
) => dispatch => {
  let formData = new FormData();
  formData.append("date", processPublicationsData.date);
  formData.append("name", processPublicationsData.name);
  formData.append(
    "selectiveProcess_id",
    processPublicationsData.selectiveProcess_id
  );

  if (processPublicationsData.call_id) {
    formData.append("call_id", processPublicationsData.call_id);
  }

  if (processPublicationsData.step_id) {
    formData.append("step_id", processPublicationsData.step_id);
  }

  if (processPublicationsData.description) {
    formData.append("description", processPublicationsData.description);
  }

  formData.append(
    "publicationType_id",
    processPublicationsData.publicationType_id
  );
  formData.append("file", processPublicationsData.file);

  axios
    .post("/v1/publications", formData)
    .then(res => {
      callback_ok(res.data.id);
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

// export const getProcessPublications = processPublications_id => dispatch => {
//   dispatch(setProcessPublicationssLoading());
//   axios
//     .get(`/v1/publications/${processPublications_id}`)
//     .then(res =>
//       dispatch({
//         type: GET_PROCESSPUBLICATION,
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

// export const updateProcessPublications = (processPublicationsData, callback_ok) => dispatch => {
//   axios
//     .put(`/v1/publications/${processPublicationsData.id}`, processPublicationsData)
//     .then(res => {
//       callback_ok(processPublicationsData.id);
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

// export const deleteProcessPublications = (processPublications_id, callback_ok) => dispatch => {
//   axios
//     .delete(`/v1/publications/${processPublications_id}`)
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

// //processPublicationss loading
// export const setProcessPublicationssLoading = () => {
//   return {
//     type: PROCESSPUBLICATIONS_LOADING
//   };
// };

// export const getProcessPublications = () => dispatch => {
//   dispatch(setProcessPublicationssLoading());
//   axios
//     .get("/v1/publications")
//     .then(res =>
//       dispatch({
//         type: GET_PROCESSPUBLICATIONS,
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
