import spsApi from 'apis/spsServer'

import { GET_ERRORS, CLEAR_ERRORS } from '../../actions/types'
import { GET_PROFILE, PROFILE_LOADING, CLEAR_PROFILE, GET_PROFILE_OPTIONS } from './profileActionTypes'
import { logoutUser } from 'components/auth/authActions'

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  spsApi
    .get('/v1/me')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(logoutUser())
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    })
}

//Update profile user data
export const updateProfileUser = (userId, userData, history) => dispatch => {
  spsApi
    .put(`/v1/me`, userData)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS })
      history.push('/profile')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

//Update profile person data
export const updateProfilePerson = (userId, personData, history) => dispatch => {
  spsApi
    .put(`/v1/me`, personData, history)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS })
      history.push('/profile')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

//Update profile person options
export const getPeopleOptions = () => dispatch => {
  spsApi
    .get('/v1/people/options')
    .then(res =>
      dispatch({
        type: GET_PROFILE_OPTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { options: "Don't load the people options" }
      })
    )
}

//Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_PROFILE
  }
}
