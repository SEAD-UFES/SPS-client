import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "components/common/Spinner";
import {
  getPermissionAssignment,
  deletePermissionAssignment
} from "components/permissionAssignments/permissionAssignmentsActions";

class RoleTypePermAssigDelete extends Component {
  constructor() {
    super();
    this.state = {
      permissionAssignment: null,
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (
      this.props.location.state &&
      this.props.location.state.permissionAssignment
    ) {
      this.setState({
        permissionAssignment: this.props.location.state.permissionAssignment
      });
    }
  }

  componentDidMount() {
    if (this.props.match.params.permissionassignment_id) {
      this.props.getPermissionAssignment(
        this.props.match.params.permissionassignment_id
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    //errors
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  onSubmit() {
    this.props.deletePermissionAssignment(
      this.props.match.params.permissionassignment_id,
      () => {
        this.props.history.push(
          `/roletypes/${this.props.match.params.roletype_id}`
        );
      }
    );
  }

  createInfoTable = permissionAssignment => {
    return (
      <div>
        <h4 className="mb-2">Informações</h4>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <strong>Id:</strong>
              </td>
              <td>{permissionAssignment.id}</td>
            </tr>
            <tr>
              <td>
                <strong>Papel:</strong>
              </td>
              <td>{permissionAssignment.RoleType.name}</td>
            </tr>
            <tr>
              <td>
                <strong>Permissão:</strong>
              </td>
              <td>{permissionAssignment.Permission.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  render() {
    const { errors } = this.state;
    const { permissionAssignmentsStore } = this.props;

    const permissionAssignment = this.state.permissionAssignment
      ? this.state.permissionAssignment
      : null;

    const infoTable = permissionAssignment ? (
      this.createInfoTable(permissionAssignment)
    ) : permissionAssignmentsStore.permissionAssignment === null ||
      permissionAssignmentsStore.loading ? (
      <Spinner />
    ) : (
      this.createInfoTable(permissionAssignmentsStore.permissionAssignment)
    );

    const alertsList = (
      <div>
        {errors.serverError ? (
          <div class="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro do servidor
          </div>
        ) : (
          ""
        )}
        {errors.anotherError ? (
          <div class="alert alert-danger" role="alert">
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
              <Link
                to={`/roletypes/${this.props.match.params.roletype_id}`}
                className="btn btn-light"
              >
                Voltar para tipo de papel
              </Link>

              <h1 className="display-4 mb-4 text-center">
                Excluir atribuição de permissão
              </h1>

              {alertsList}

              <p className="lead text-center">Você solicitou excluir o item:</p>
              {infoTable}
              <p className="lead text-center">Confirma a operação?</p>

              <div className="row">
                <div className="col">
                  <input
                    type="button"
                    value="Excluir"
                    className="btn btn-danger btn-block mt-4"
                    onClick={this.onSubmit}
                  />
                </div>
                <div className="col">
                  <input
                    type="button"
                    value="Cancelar"
                    className="btn btn-secondary btn-block mt-4"
                    onClick={() => {
                      this.props.history.push(`/roletypes/xxx`);
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

RoleTypePermAssigDelete.propTypes = {
  getPermissionAssignment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  permissionAssignmentsStore: state.permissionAssignmentsStore
});

export default connect(
  mapStateToProps,
  {
    getPermissionAssignment,
    deletePermissionAssignment
  }
)(RoleTypePermAssigDelete);
