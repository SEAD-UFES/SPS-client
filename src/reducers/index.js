import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import processReducer from "./processReducer";
import coursesReducer from "components/parameters/courses/coursesReducer";
import assignmentsReducer from "components/parameters/assignments/assignmentsReducer";

//import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  user: userReducer,
  process: processReducer,
  coursesStore: coursesReducer,
  assignmentsStore: assignmentsReducer
  //post: postReducer
});
