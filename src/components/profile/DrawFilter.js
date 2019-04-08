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
    const AdminRole = Roles.filter(filterAdministrator);
    if (AdminRole.length > 0) {
      this.setState({ canDraw: true });
      return null;
    }

    //search for permission on global roles
    const filterGlobalRoleAssignments = value => {
      return value.Course === null && value.RoleType.name !== "Administrador";
    };
    const globalRoleAssignments = Roles.filter(filterGlobalRoleAssignments);
    if (globalRoleAssignments.length > 0) {
      globalRoleAssignments.map(roleAssignment => {
        if (roleAssignment.RoleType.Permissions.length > 0) {
          const filterPermission = value => {
            return value.name === permission;
          };
          const permissionFound = roleAssignment.RoleType.Permissions.filter(filterPermission);
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
      const filterAllCoursesRoleAssignments = value => {
        return value.Course !== null && value.RoleType.name !== "Administrador";
      };
      const AllCoursesRoleAssignments = Roles.filter(filterAllCoursesRoleAssignments);
      if (AllCoursesRoleAssignments.length > 0) {
        AllCoursesRoleAssignments.map(roleAssignment => {
          if (roleAssignment.RoleType.Permissions.length > 0) {
            const filterPermission = value => {
              return value.name === permission;
            };
            const permissionFound = roleAssignment.RoleType.Permissions.filter(filterPermission);
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
        specificRoleAssignments.map(roleAssignment => {
          if (roleAssignment.RoleType.Permissions.length > 0) {
            const filterPermission = value => {
              return value.name === permission;
            };
            const PermissionFound = roleAssignment.RoleType.Permissions.filter(filterPermission);
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
