import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import authReducer from "../components/auth/authReducer";
import profileReducer from "../components/profile/profileReducer";
import userReducer from "./userReducer";
import processReducer from "../components/process/processReducer";
import courseReducer from "components/course/courseReducer";
import assignmentReducer from "components/assignment/assignmentReducer";
import regionReducer from "components/region/regionReducer";
import restrictionReducer from "components/restriction/restrictionReducer";
import roleTypesReducer from "components/roleType/roleTypeReducer";
import userRoleReducer from "components/userRole/userRoleReducer";
import permissionReducer from "components/permission/permissionReducer";
import rolePermissionReducer from "components/rolePermission/rolePermissionReducer";
import publicationTypeReducer from "components/publicationType/publicationTypeReducer";
import publicationReducer from "components/publication/publicationReducer";
import callReducer from "components/call/callReducer";
import stepReducer from "components/step/stepReducer";
import vacancyReducer from "components/vacancy/vacancyReducer";

export default combineReducers({
  errors: errorReducer,
  authStore: authReducer,
  profileStore: profileReducer,
  user: userReducer,
  processStore: processReducer,
  courseStore: courseReducer,
  assignmentStore: assignmentReducer,
  regionStore: regionReducer,
  restrictionStore: restrictionReducer,
  roleTypeStore: roleTypesReducer,
  userRoleStore: userRoleReducer,
  permissionStore: permissionReducer,
  rolePermissionStore: rolePermissionReducer,
  publicationTypeStore: publicationTypeReducer,
  publicationStore: publicationReducer,
  callStore: callReducer,
  stepStore: stepReducer,
  vacancyStore: vacancyReducer
});
