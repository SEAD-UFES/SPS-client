/** @format */

import { combineReducers } from 'redux'

//Reducers V1
import errorReducer from './reducers/error'
import authReducer from '../components/auth/authReducer'
import profileReducer from '../components/profile/profileReducer'
import userReducer from '../components/user/userReducer'
import processReducer from '../components/process/processReducer'
import courseReducer from '../components/course/courseReducer'
import assignmentReducer from '../components/assignment/assignmentReducer'
import regionReducer from '../components/region/regionReducer'
import restrictionReducer from '../components/restriction/restrictionReducer'
import roleTypesReducer from '../components/roleType/roleTypeReducer'
import userRoleReducer from '../components/userRole/userRoleReducer'
import permissionReducer from '../components/permission/permissionReducer'
import rolePermissionReducer from '../components/rolePermission/rolePermissionReducer'
import publicationReducer from '../components/publication/publicationReducer'
import publicationTypeReducer from '../components/publicationType/publicationTypeReducer'
import stepReducer from '../components/step/stepReducer'
import stepTypeReducer from '../components/stepType/stepTypeReducer'
import graduationTypeReducer from '../components/graduationType/graduationTypeReducer'
//Reducers V2
import callReducerV2 from './reducers/call'
import vacancyReducer from './reducers/vacancy'
import assignmentReducerV2 from './reducers/assignment'
import regionReducerV2 from './reducers/region'
import restrictionReducerV2 from './reducers/restriction'
import calendarReducer from './reducers/calendar'
import inscriptionEventReducer from './reducers/inscriptionEvent'

export default combineReducers({
  //Stores V1
  errorStore: errorReducer,
  authStore: authReducer,
  profileStore: profileReducer,
  userStore: userReducer,
  processStore: processReducer,
  courseStore: courseReducer,
  assignmentStore: assignmentReducer,
  regionStore: regionReducer,
  restrictionStore: restrictionReducer,
  roleTypeStore: roleTypesReducer,
  userRoleStore: userRoleReducer,
  permissionStore: permissionReducer,
  rolePermissionStore: rolePermissionReducer,
  publicationStore: publicationReducer,
  publicationTypeStore: publicationTypeReducer,
  stepStore: stepReducer,
  stepTypeStore: stepTypeReducer,
  graduationTypeStore: graduationTypeReducer,
  //Stores V2
  callStoreV2: callReducerV2,
  vacancyStore: vacancyReducer,
  assignmentStoreV2: assignmentReducerV2,
  regionStoreV2: regionReducerV2,
  restrictionStoreV2: restrictionReducerV2,
  calendarStore: calendarReducer,
  inscriptionEventStore: inscriptionEventReducer
})
