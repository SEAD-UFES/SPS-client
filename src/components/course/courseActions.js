import spsApi from 'apis/spsServer'

import { GET_ERRORS } from '../../actions/types'
import { GET_COURSE, GET_COURSES, COURSES_LOADING, FIND_COURSE } from './courseActionTypes'

//courses loading
export const setCoursesLoading = () => {
  return {
    type: COURSES_LOADING
  }
}

export const createCourse = (courseData, callback_ok) => dispatch => {
  spsApi
    .post('/v1/courses', courseData)
    .then(res => {
      callback_ok()
    })
    .catch(err => {
      if (err.response) {
        let errors = {}
        errors.serverError = true
        errors.data = err.response.data
        dispatch({
          type: GET_ERRORS,
          payload: errors
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { anotherError: true }
        })
      }
    })
}

export const getCourse = course_id => dispatch => {
  spsApi
    .get(`/v1/courses/${course_id}`)
    .then(res =>
      dispatch({
        type: GET_COURSE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const updateCourse = (courseData, callback_ok) => dispatch => {
  spsApi
    .put(`/v1/courses/${courseData.id}`, courseData)
    .then(res => {
      callback_ok()
    })
    .catch(err => {
      if (err.response) {
        let errors = {}
        errors.serverError = true
        errors.data = err.response.data
        dispatch({
          type: GET_ERRORS,
          payload: errors
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { anotherError: true }
        })
      }
    })
}

export const deleteCourse = (course_id, callback_ok) => dispatch => {
  spsApi
    .delete(`/v1/courses/${course_id}`)
    .then(res => {
      callback_ok()
    })
    .catch(err => {
      if (err.response) {
        let errors = {}
        errors.serverError = true
        errors.data = err.response.data
        dispatch({
          type: GET_ERRORS,
          payload: errors
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { anotherError: true }
        })
      }
    })
}

export const getCourses = () => dispatch => {
  dispatch(setCoursesLoading())
  spsApi
    .get('/v1/courses')
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const findCourse = (options, callback_ok) => dispatch => {
  dispatch(setCoursesLoading())

  let params = ''

  if (options.process_id) {
    params = `${params}process_id=${options.process_id}`
  }

  if (options.call_id) {
    params = `${params}call_id=${options.call_id}`
  }

  if (options.vacancy_id) {
    params = `${params}vacancy_id=${options.vancancy_id}`
  }

  spsApi
    .get(`/v1/courses/find?${params}`)
    .then(res => {
      dispatch({
        type: FIND_COURSE,
        payload: res.data
      })
      callback_ok(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

export const findCourse2 = async options => {
  let params = ''

  if (options.process_id) {
    params = `${params}process_id=${options.process_id}`
  }

  if (options.call_id) {
    params = `${params}call_id=${options.call_id}`
  }

  if (options.vacancy_id) {
    params = `${params}vacancy_id=${options.vancancy_id}`
  }

  const res = await spsApi.get(`/v1/courses/find?${params}`)
  return res.data
}

const handleErrors = (err, dispatch) => {
  if (err.response) {
    let errors = {}
    errors.data = err.response.data
    errors.serverError = true
    dispatch({
      type: GET_ERRORS,
      payload: errors
    })
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: { anotherError: true }
    })
  }
}
