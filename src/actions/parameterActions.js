import { GET_ERRORS } from "./types";
import axios from "axios";

//Register
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
