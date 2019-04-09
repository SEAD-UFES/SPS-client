import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getRoleType } from "./roleTypesActions";
import Spinner from "components/common/Spinner";

class RoleTypeView extends Component {
  componentDidMount() {
    if (this.props.match.params.roletype_id) {
      this.props.getRoleType(this.props.match.params.roletype_id);
    }
  }

  buildPermissionAssignment(roleType, permission) {
    let dryRoleType = JSON.parse(JSON.stringify(roleType));
    delete dryRoleType.Permissions;

    let dryPermission = JSON.parse(JSON.stringify(permission));
    delete dryPermission.RolePermission;

    let permAssig = {};
    permAssig = permission.RolePermission;
    permAssig.RoleType = dryRoleType;
    permAssig.Permission = dryPermission;

    return permAssig;
  }

  render() {
    const { roleTypesStore } = this.props;

    const infoTable =
      roleTypesStore.roleType === null || roleTypesStore.loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Informações</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Nome:</strong>
                </td>
                <td>{roleTypesStore.roleType.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Descrição:</strong>
                </td>
                <td>{roleTypesStore.roleType.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    const permissionsTable =
      roleTypesStore.roleType === null || roleTypesStore.loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Lista de permissões atribuidas</h4>
          {roleTypesStore.roleType.name === "Administrador" ? (
            <p>Administradores podem tudo.</p>
          ) : roleTypesStore.roleType.Permissions.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>
                    <Link
                      className="text-success"
                      to={{
                        pathname: `${this.props.match.url}/create-permassig`,
                        state: { roleType: roleTypesStore.roleType }
                      }}
                    >
                      <i className="fas fa-plus-circle" />
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {roleTypesStore.roleType.Permissions.map(permission => {
                  return (
                    <tr key={permission.id}>
                      <td>{permission.name}</td>
                      <td>
                        <Link
                          className="text-danger"
                          to={{
                            pathname: `/roletypes/${roleTypesStore.roleType.id}/delete-permassig/${permission.RolePermission.id}`,
                            state: {
                              roleType: roleTypesStore.roleType,
                              rolePermission: this.buildPermissionAssignment(roleTypesStore.roleType, permission)
                            }
                          }}
                        >
                          <i className="fas fa-times-circle" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>
              <p>
                Não existem permissões associadas a esse papel.{" "}
                <Link
                  className="text-success"
                  to={{
                    pathname: `${this.props.match.url}/create-permassig`,
                    state: { roleType: roleTypesStore.roleType }
                  }}
                >
                  <i className="fas fa-plus-circle" /> Adicionar
                </Link>
              </p>
            </div>
          )}
        </div>
      );

    return (
      <div className="roletypes">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/roletypes" className="btn btn-light">
                Voltar para lista de tipos de papel
              </Link>
              <h1 className="display-4 mb-4">Tipo de Papel</h1>
              {infoTable}
              {permissionsTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RoleTypeView.propTypes = {
  getRoleType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roleTypesStore: state.roleTypesStore
});

export default connect(
  mapStateToProps,
  {
    getRoleType
  }
)(RoleTypeView);
