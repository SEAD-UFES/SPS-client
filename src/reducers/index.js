import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import processReducer from "../components/process/processReducer";
import courseReducer from "components/course/courseReducer";
import assignmentReducer from "components/assignment/assignmentReducer";
import regionReducer from "components/region/regionReducer";
import restrictionReducer from "components/restriction/restrictionReducer";
import roleTypesReducer from "components/roleTypes/roleTypesReducer";
import roleAssignmentsReducer from "components/roleAssignments/roleAssignmentsReducer";
import permissionReducer from "components/permission/permissionReducer";
import rolePermissionReducer from "components/rolePermission/rolePermissionReducer";
import processPublicationTypesReducer from "components/processPublicationTypes/processPublicationTypesReducer";
import publicationReducer from "components/publication/publicationReducer";
import callReducer from "components/call/callReducer";
import stepReducer from "components/step/stepReducer";
import vacancyReducer from "components/vacancy/vacancyReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  user: userReducer,
  process: processReducer,
  courseStore: courseReducer,
  assignmentStore: assignmentReducer,
  regionStore: regionReducer,
  restrictionStore: restrictionReducer,
  roleTypesStore: roleTypesReducer,
  roleAssignmentsStore: roleAssignmentsReducer,
  permissionStore: permissionReducer,
  rolePermissionStore: rolePermissionReducer,
  processPublicationTypesStore: processPublicationTypesReducer,
  processPublicationsStore: publicationReducer,
  callStore: callReducer,
  stepStore: stepReducer,
  vacancyStore: vacancyReducer
});
