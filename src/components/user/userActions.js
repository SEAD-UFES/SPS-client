import spsApi from "apis/spsServer";

import { CLEAR_ERRORS, GET_ERRORS } from "../../actions/types";
import { GET_USER, GET_USERS, USERS_LOADING, GET_USER_PEOPLE_OPTIONS, GET_USERS_MINIMAL } from "./userActionTypes";

//create user
export const createUser = (userData, history) => dispatch => {
  spsApi
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
  spsApi
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
  spsApi
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
  spsApi
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
  spsApi
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
    type: USERS_LOADING
  };
};

//load people options
export const getUserPeopleOptions = () => dispatch => {
  spsApi
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

//Get User Minimal
export const getUsersMinimal = () => dispatch => {
  dispatch(setUserLoading());
  spsApi
    .get(`/v1/users/minimal`)
    .then(res =>
      dispatch({
        type: GET_USERS_MINIMAL,
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
