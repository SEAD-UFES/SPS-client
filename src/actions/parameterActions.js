import { GET_ERRORS } from "./types";
import axios from "axios";

//Assignment
export const createAssignment = (assignmentData, callback_ok) => dispatch => {
  axios
    .post("/v1/assignments", assignmentData)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      console.log("deu erro");
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });
    });
};

//update ProcessCallStep
export const updateAssignment = (assignmentData, callback_ok) => dispatch => {
  axios
    .put(`/v1/assignments/${assignmentData.id}`, assignmentData)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      console.log("deu erro");
      console.log(assignmentData);

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
