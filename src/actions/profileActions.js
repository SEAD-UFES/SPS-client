import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/v1/me")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//Update profile user data
export const updateProfileUser = (userId, userData, history) => dispatch => {
  axios
    .put(`/v1/users/${userId}`, userData)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      history.push("/profile");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Update profile person data
export const updateProfilePerson = (
  personId,
  personData,
  history
) => dispatch => {
  axios
    .put(`/v1/people/${personId}`, personData, history)
    .then(res => history.push("/profile"))
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
