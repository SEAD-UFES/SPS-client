import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import processReducer from "./processReducer";
import courseReducer from "components/course/courseReducer";
import assignmentReducer from "components/assignment/assignmentReducer";
import regionReducer from "components/region/regionReducer";
import restrictionReducer from "components/restriction/restrictionReducer";
import roleTypesReducer from "components/roleTypes/roleTypesReducer";
import roleAssignmentsReducer from "components/roleAssignments/roleAssignmentsReducer";
import permissionReducer from "components/permission/permissionReducer";
import rolePermissionReducer from "components/rolePermission/rolePermissionReducer";
import processPublicationTypesReducer from "components/processPublicationTypes/processPublicationTypesReducer";
import processPublicationsReducer from "components/processPublications/processPublicationsReducer";
import processCallVacanciesReducer from "components/processCallsVacancies/processCallVacanciesReducer";
import callReducer from "components/call/callReducer";
import stepReducer from "components/step/stepReducer";

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
  processPublicationsStore: processPublicationsReducer,
  processCallVacanciesStore: processCallVacanciesReducer,
  stepStore: stepReducer,
  callStore: callReducer

  //post: postReducer
});
