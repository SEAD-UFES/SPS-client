import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class DrawFilter extends Component {
  constructor() {
    super();
    this.state = {
      canDraw: false
    };
  }

  componentWillMount() {
    const { profile, loading } = this.props.profile;
    if (profile !== null && loading !== true) {
      this.canDraw(profile.Roles, this.props.permission, { course_id: this.props.course_id, anyCourse: this.props.anyCourse });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      const { profile, loading } = nextProps.profile;
      if (profile !== null && loading !== true) {
        this.canDraw(profile.Roles, this.props.permission, { course_id: this.props.course_id, anyCourse: this.props.anyCourse });
      }
    }
  }

  canDraw(Roles, permission, options) {
    //search for admin global role
    const filterAdministrator = value => {
      return value.Course === null && value.RoleType.name === "Administrador";
    };
    const userRoleAdmin = Roles.filter(filterAdministrator);
    if (userRoleAdmin.length > 0) {
      this.setState({ canDraw: true });
      return null;
    }

    //search for permission on global roles
    const filterGlobalUserRoles = value => {
      return value.Course === null && value.RoleType.name !== "Administrador";
    };
    const globalRoleAssignments = Roles.filter(filterGlobalUserRoles);
    if (globalRoleAssignments.length > 0) {
      globalRoleAssignments.map(userRole => {
        if (userRole.RoleType.Permissions.length > 0) {
          const filterPermission = value => {
            return value.name === permission;
          };
          const permissionFound = userRole.RoleType.Permissions.filter(filterPermission);
          if (permissionFound.length > 0) {
            this.setState({ canDraw: true });
            return null;
          }
        }
        return null;
      });
    }

    //search for permission on any courses
    if (options.anyCourse === true) {
      const filterAllCourseUserRoles = value => {
        return value.Course !== null && value.RoleType.name !== "Administrador";
      };
      const AllCourseUserRoles = Roles.filter(filterAllCourseUserRoles);
      if (AllCourseUserRoles.length > 0) {
        AllCourseUserRoles.map(userRole => {
          if (userRole.RoleType.Permissions.length > 0) {
            const filterPermission = value => {
              return value.name === permission;
            };
            const permissionFound = userRole.RoleType.Permissions.filter(filterPermission);
            if (permissionFound.length > 0) {
              this.setState({ canDraw: true });
              return null;
            }
          }
          return null;
        });
      }
    }

    //search for permission on specific course roles
    if (options.course_id) {
      const filterSpecificRoleAssignments = value => {
        return value.Course.id === options.course_id;
      };
      const specificRoleAssignments = Roles.filter(filterSpecificRoleAssignments);
      if (specificRoleAssignments.length > 0) {
        specificRoleAssignments.map(userRole => {
          if (userRole.RoleType.Permissions.length > 0) {
            const filterPermission = value => {
              return value.name === permission;
            };
            const PermissionFound = userRole.RoleType.Permissions.filter(filterPermission);
            if (PermissionFound.length > 0) {
              this.setState({ canDraw: true });
              return null;
            }
          }
          return null;
        });
      }
    }
  }

  render() {
    return this.state.canDraw ? this.props.children : null;
  }
}

DrawFilter.proptypes = {
  profile: PropTypes.object.required
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(DrawFilter);
