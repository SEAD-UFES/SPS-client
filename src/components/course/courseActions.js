import { GET_ERRORS } from "../../actions/types";
import { GET_COURSE, GET_COURSES, COURSES_LOADING } from "./courseActionTypes";

import axios from "axios";

export const createCourse = (courseData, callback_ok) => dispatch => {
  axios
    .post("/v1/courses", courseData)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getCourse = course_id => dispatch => {
  axios
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
  axios
    .put(`/v1/courses/${courseData.id}`, courseData)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteCourse = (course_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/courses/${course_id}`)
    .then(res => {
      callback_ok();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//courses loading
export const setCoursesLoading = () => {
  return {
    type: COURSES_LOADING
  };
};

export const getCourses = () => dispatch => {
  dispatch(setCoursesLoading());
  axios
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