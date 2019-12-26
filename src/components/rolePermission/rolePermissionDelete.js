import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "components/common/Spinner";
import { getRolePermission, deleteRolePermission } from "components/rolePermission/rolePermissionActions";

class rolePermissionDelete extends Component {
  constructor() {
    super();
    this.state = {
      rolePermission: null,
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  UNSAFE_componentWillMount() {
    if (this.props.location.state && this.props.location.state.rolePermission) {
      this.setState({
        rolePermission: this.props.location.state.rolePermission
      });
    }
  }

  componentDidMount() {
    if (this.props.match.params.permissionassignment_id) {
      this.props.getRolePermission(this.props.match.params.permissionassignment_id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //errors
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  onSubmit() {
    this.props.deleteRolePermission(this.props.match.params.permissionassignment_id, () => {
      this.props.history.push(`/parameters/roletypes/${this.props.match.params.roletype_id}`);
    });
  }

  createInfoTable = rolePermission => {
    return (
      <div>
        <h4 className="mb-2">Informações</h4>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <strong>Id:</strong>
              </td>
              <td>{rolePermission.id}</td>
            </tr>
            <tr>
              <td>
                <strong>Papel:</strong>
              </td>
              <td>{rolePermission.RoleType.name}</td>
            </tr>
            <tr>
              <td>
                <strong>Permissão:</strong>
              </td>
              <td>{rolePermission.Permission.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  render() {
    const { errors } = this.state;
    const { rolePermissionStore } = this.props;

    const rolePermission = this.state.rolePermission ? this.state.rolePermission : null;

    const infoTable = rolePermission ? (
      this.createInfoTable(rolePermission)
    ) : rolePermissionStore.rolePermission === null || rolePermissionStore.loading ? (
      <Spinner />
    ) : (
      this.createInfoTable(rolePermissionStore.rolePermission)
    );

    const alertsList = (
      <div>
        {errors.serverError ? (
          <div className="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro do servidor
          </div>
        ) : (
          ""
        )}
        {errors.anotherError ? (
          <div className="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro desconhecido
          </div>
        ) : (
          ""
        )}
      </div>
    );

    return (
      <div className="roletypes">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/parameters/roletypes/${this.props.match.params.roletype_id}`} className="btn btn-light">
                Voltar para tipo de papel
              </Link>

              <h1 className="display-4 mb-4 text-center">Excluir atribuição de permissão</h1>

              {alertsList}

              <p className="lead text-center">Você solicitou excluir o item:</p>
              {infoTable}
              <p className="lead text-center">Confirma a operação?</p>

              <div className="row">
                <div className="col">
                  <input type="button" value="Excluir" className="btn btn-primary btn-block mt-4" onClick={this.onSubmit} />
                </div>
                <div className="col">
                  <input
                    type="button"
                    value="Cancelar"
                    className="btn btn-secondary btn-block mt-4"
                    onClick={() => {
                      this.props.history.goBack();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

rolePermissionDelete.propTypes = {
  getRolePermission: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  rolePermissionStore: state.rolePermissionStore
});

export default connect(
  mapStateToProps,
  {
    getRolePermission,
    deleteRolePermission
  }
)(rolePermissionDelete);
