/** @format */

import jwt_decode from 'jwt-decode'

import spsApi, { setAuthTokenV2 } from 'apis/spsServer'

import { GET_ERRORS } from '../../actions/types'
import { SET_CURRENT_USER } from './authActionTypes'

import { clearCurrentProfile } from 'components/profile/profileActions'

//Register
export const registerUser = (userData, history) => dispatch => {
  spsApi
    .post('/v1/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

//Login
export const loginUser = userData => dispatch => {
  spsApi
    .post('/v1/auth', userData)
    .then(res => {
      const { access_token } = res.data

      //Set token on local storage
      localStorage.setItem('jwtToken', access_token)

      //set token for axios to send requests with (Autorization = token) header
      setAuthTokenV2(spsApi, access_token)

      //decode token to get user data && dispatch action to set user
      const decoded = jwt_decode(access_token)

      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

//Set User on auth
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

//Log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem('jwtToken')

  //Remove auth header from axios future requets
  setAuthTokenV2(spsApi, false)

  //set current user to {}
  dispatch(setCurrentUser({}))

  //clear profile data
  clearCurrentProfile()
}
