import { combineReducers } from 'redux'

import errorReducer from './errorReducer'
import authReducer from '../components/auth/authReducer'
import profileReducer from '../components/profile/profileReducer'
import userReducer from '../components/user/userReducer'
import processReducer from '../components/process/processReducer'
import courseReducer from 'components/course/courseReducer'
import assignmentReducer from 'components/assignment/assignmentReducer'
import regionReducer from 'components/region/regionReducer'
import restrictionReducer from 'components/restriction/restrictionReducer'
import roleTypesReducer from 'components/roleType/roleTypeReducer'
import userRoleReducer from 'components/userRole/userRoleReducer'
import permissionReducer from 'components/permission/permissionReducer'
import rolePermissionReducer from 'components/rolePermission/rolePermissionReducer'
import publicationReducer from 'components/publication/publicationReducer'
import publicationTypeReducer from 'components/publicationType/publicationTypeReducer'
import callReducer from 'components/call/callReducer'
import stepReducer from 'components/step/stepReducer'
import stepTypeReducer from 'components/stepType/stepTypeReducer'
import vacancyReducer from 'components/vacancy/vacancyReducer'
import graduationTypeReducer from 'components/graduationType/graduationTypeReducer'
import noticeReducer from 'components/notice/noticeReducer'

export default combineReducers({
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
  callStore: callReducer,
  stepStore: stepReducer,
  stepTypeStore: stepTypeReducer,
  vacancyStore: vacancyReducer,
  graduationTypeStore: graduationTypeReducer,
  noticeStore: noticeReducer
})
