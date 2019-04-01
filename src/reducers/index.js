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
import permissionAssignmentsReducer from "components/permissionAssignments/permissionAssignmentsReducer";
import processPublicationTypesReducer from "components/processPublicationTypes/processPublicationTypesReducer";
import processPublicationsReducer from "components/processPublications/processPublicationsReducer";
import processCallVacanciesReducer from "components/processCallsVacancies/processCallVacanciesReducer";

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
  permissionTypesStore: permissionTypesReducer,
  permissionAssignmentsStore: permissionAssignmentsReducer,
  processPublicationTypesStore: processPublicationTypesReducer,
  processPublicationsStore: processPublicationsReducer,
  processCallVacanciesStore: processCallVacanciesReducer

  //post: postReducer
});
