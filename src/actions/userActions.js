import axios from "axios";

import { GET_USER, GET_USERS, USER_LOADING } from "./types";

//Get User
export const getUser = user_id => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(`/v1/users/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: null
      })
    );
};

//Get User List
export const getUserList = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get("/v1/users")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: []
      })
    );
};

//Profile loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
