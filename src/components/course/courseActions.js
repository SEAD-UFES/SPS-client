import spsApi from "apis/spsServer";

import { GET_ERRORS } from "../../actions/types";
import { GET_COURSE, GET_COURSES, COURSES_LOADING } from "./courseActionTypes";

export const createCourse = (courseData, callback_ok) => dispatch => {
  spsApi
    .post("/v1/courses", courseData)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      if (err.response) {
        let errors = {};
        errors.serverError = true;
        errors.data = err.response.data;
        dispatch({
          type: GET_ERRORS,
          payload: errors
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { anotherError: true }
        });
      }
    });
};

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
    );
};

export const updateCourse = (courseData, callback_ok) => dispatch => {
  spsApi
    .put(`/v1/courses/${courseData.id}`, courseData)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      if (err.response) {
        let errors = {};
        errors.serverError = true;
        errors.data = err.response.data;
        dispatch({
          type: GET_ERRORS,
          payload: errors
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { anotherError: true }
        });
      }
    });
};

export const deleteCourse = (course_id, callback_ok) => dispatch => {
  spsApi
    .delete(`/v1/courses/${course_id}`)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      if (err.response) {
        let errors = {};
        errors.serverError = true;
        errors.data = err.response.data;
        dispatch({
          type: GET_ERRORS,
          payload: errors
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { anotherError: true }
        });
      }
    });
};

//courses loading
export const setCoursesLoading = () => {
  return {
    type: COURSES_LOADING
  };
};

export const getCourses = () => dispatch => {
  dispatch(setCoursesLoading());
  spsApi
    .get("/v1/courses")
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
    );
};
