export const permissionCheck = (userRoles, permission, options) => {
  //check if is admin
  if (adminCheck(userRoles, permission, options)) {
    return true;
  }

  //search for permission on global roles
  if (globalUserRolesCheck(userRoles, permission, options)) {
    return true;
  }

  //search for permission on any courses
  if (anyCourseCheck(userRoles, permission, options)) {
    return true;
  }

  //search for permission on specific course roles
  if (specificCourseCheck(userRoles, permission, options)) {
    return true;
  }

  return false;
};

const adminCheck = (userRoles, permission, options) => {
  let havePermission = false;
  //search for admin global role
  const filterAdministrator = value => {
    return value.Course === null && value.RoleType.name === "Administrador";
  };
  const userRoleAdmin = userRoles.filter(filterAdministrator);
  if (userRoleAdmin.length > 0) {
    havePermission = true;
  }
  return havePermission;
};

const globalUserRolesCheck = (userRoles, permission, options) => {
  let havePermission = false;

  const filterGlobalUserRoles = value => {
    return value.RoleType.global === true && value.RoleType.name !== "Administrador";
  };

  const globalRoleAssignments = userRoles.filter(filterGlobalUserRoles);

  if (globalRoleAssignments.length > 0) {
    globalRoleAssignments.map(userRole => {
      if (userRole.RoleType.Permissions.length > 0) {
        const filterPermission = value => {
          return value.name === permission;
        };
        const permissionFound = userRole.RoleType.Permissions.filter(filterPermission);
        if (permissionFound.length > 0) {
          havePermission = true;
        }
      }
      return null;
    });
  }

  return havePermission;
};

const anyCourseCheck = (userRoles, permission, options) => {
  let havePermission = false;

  if (options.anyCourse === true) {
    const filterAllCourseUserRoles = value => {
      return value.Course !== null && value.RoleType.name !== "Administrador";
    };
    const AllCourseUserRoles = userRoles.filter(filterAllCourseUserRoles);
    if (AllCourseUserRoles.length > 0) {
      AllCourseUserRoles.map(userRole => {
        if (userRole.RoleType.Permissions.length > 0) {
          const filterPermission = value => {
            return value.name === permission;
          };
          const permissionFound = userRole.RoleType.Permissions.filter(filterPermission);
          if (permissionFound.length > 0) {
            havePermission = true;
          }
        }
        return null;
      });
    }
  }

  return havePermission;
};

const specificCourseCheck = (userRoles, permission, options) => {
  let havePermission = false;

  //search for permission on specific course roles
  if (options.course_id) {
    const filterSpecificRoleAssignments = value => {
      return value.Course && value.Course.id === options.course_id;
    };
    const specificRoleAssignments = userRoles.filter(filterSpecificRoleAssignments);
    if (specificRoleAssignments.length > 0) {
      specificRoleAssignments.map(userRole => {
        if (userRole.RoleType.Permissions.length > 0) {
          const filterPermission = value => {
            return value.name === permission;
          };
          const PermissionFound = userRole.RoleType.Permissions.filter(filterPermission);
          if (PermissionFound.length > 0) {
            havePermission = true;
          }
        }
        return null;
      });
    }
  }

  return havePermission;
};
