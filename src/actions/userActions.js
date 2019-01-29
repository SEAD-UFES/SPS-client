import axios from "axios";

import {
  GET_USER,
  GET_USERS,
  USER_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_USER_PEOPLE_OPTIONS
} from "./types";

//create user
export const createUser = (userData, history) => dispatch => {
  axios
    .post("/v1/register", userData)
    .then(res => {
      history.push(`/users/${res.data.id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

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
export const getUserList = (page = 1, limit = 10) => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(`/v1/users?page=${page}&limit=${limit}`)
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

//Update User Data
export const updateUser = (userId, userData, history) => dispatch => {
  axios
    .put(`/v1/users/${userId}`, userData)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/users/${userId}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Update Person Data
export const updatePerson = (userId, personData, history) => dispatch => {
  axios
    .put(`/v1/people/${userId}`, personData, history)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/users/${userId}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

//load people options
export const getUserPeopleOptions = () => dispatch => {
  axios
    .get("/v1/people/options")
    .then(res =>
      dispatch({
        type: GET_USER_PEOPLE_OPTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { options: "Don't load the people options" }
      })
    );
};
