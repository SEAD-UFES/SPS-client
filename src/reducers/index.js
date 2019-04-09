import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import processReducer from "./processReducer";
import courseReducer from "components/course/courseReducer";
import assignmentReducer from "components/assignment/assignmentReducer";
import regionsReducer from "components/parameters/regions/regionsReducer";
import restrictionsReducer from "components/parameters/restrictions/restrictionsReducer";
import roleTypesReducer from "components/roleTypes/roleTypesReducer";
import roleAssignmentsReducer from "components/roleAssignments/roleAssignmentsReducer";
import permissionTypesReducer from "components/permissionTypes/permissionTypesReducer";
import permissionAssignmentsReducer from "components/permissionAssignments/permissionAssignmentsReducer";
import processPublicationTypesReducer from "components/processPublicationTypes/processPublicationTypesReducer";
import processPublicationsReducer from "components/processPublications/processPublicationsReducer";
import processCallVacanciesReducer from "components/processCallsVacancies/processCallVacanciesReducer";
import processCallStepsReducer from "components/processCallsSteps/processCallStepsReducer";
import processCallsReducer from "components/processCalls/processCallsReducer";

//import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  user: userReducer,
  process: processReducer,
  courseStore: courseReducer,
  assignmentStore: assignmentReducer,
  regionsStore: regionsReducer,
  restrictionsStore: restrictionsReducer,
  roleTypesStore: roleTypesReducer,
  roleAssignmentsStore: roleAssignmentsReducer,
  permissionTypesStore: permissionTypesReducer,
  permissionAssignmentsStore: permissionAssignmentsReducer,
  processPublicationTypesStore: processPublicationTypesReducer,
  processPublicationsStore: processPublicationsReducer,
  processCallVacanciesStore: processCallVacanciesReducer,
  processCallStepsStore: processCallStepsReducer,
  processCallsStore: processCallsReducer

  //post: postReducer
});
