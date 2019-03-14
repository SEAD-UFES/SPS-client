import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import processReducer from "./processReducer";
import coursesReducer from "components/parameters/courses/coursesReducer";
import assignmentsReducer from "components/parameters/assignments/assignmentsReducer";
import regionsReducer from "components/parameters/regions/regionsReducer";
import restrictionsReducer from "components/parameters/restrictions/restrictionsReducer";
import roleTypesReducer from "components/roleTypes/roleTypesReducer";
import roleAssignmentsReducer from "components/roleAssignments/roleAssignmentsReducer";
import permissionTypesReducer from "components/permissionTypes/permissionTypesReducer";

//import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  user: userReducer,
  process: processReducer,
  coursesStore: coursesReducer,
  assignmentsStore: assignmentsReducer,
  regionsStore: regionsReducer,
  restrictionsStore: restrictionsReducer,
  roleTypesStore: roleTypesReducer,
  roleAssignmentsStore: roleAssignmentsReducer,
  permissionTypesStore: permissionTypesReducer
  //post: postReducer
});
