import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/v1/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login
export const loginUser = userData => dispatch => {
  axios
    .post("/v1/auth", userData)
    .then(res => {
      const { access_token } = res.data;

      //Set token on local storage
      localStorage.setItem("jwtToken", access_token);

      //set token for axios to send requests with (Autorization = token) header
      setAuthToken(access_token);

      //decode token to get user data && dispatch action to set user
      const decoded = jwt_decode(access_token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set User on auth
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");

  //Remove auth header from axios future requets
  setAuthToken(false);

  //set current user to {}
  dispatch(setCurrentUser({}));
};
