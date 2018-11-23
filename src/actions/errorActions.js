import { CLEAR_ERRORS } from "./types";

//Register
export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
