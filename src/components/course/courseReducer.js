import { COURSES_LOADING, GET_COURSES, FIND_COURSE } from './courseActionTypes'
import { compareCourseByName } from 'utils/compareBy'

const initialState = {
  loading: false,
  courses: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case COURSES_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_COURSES:
      return {
        ...state,
        loading: false,
        courses: action.payload.sort(compareCourseByName)
      }
    case FIND_COURSE:
      //filter actual state
      let filtred_courses = []
      if (state.courses) {
        filtred_courses = state.courses.filter(course => {
          return course.id !== action.payload.id
        })
      }
      //create new courses
      let new_courses = [action.payload]
      if (filtred_courses) {
        new_courses = [...new_courses, ...filtred_courses].sort(compareCourseByName)
      }

      return {
        ...state,
        loading: false,
        courses: new_courses
      }
    default:
      return state
  }
}
