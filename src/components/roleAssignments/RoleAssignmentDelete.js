import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getRoleAssignment } from "./roleAssignmentsActions";
import Spinner from "components/common/Spinner";
import { deleteRoleAssignment } from "./roleAssignmentsActions";

class RoleAssignmentDelete extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.roleassignment_id) {
      this.props.getRoleAssignment(this.props.match.params.roleassignment_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  onSubmit() {
    this.props.deleteRoleAssignment(
      this.props.match.params.roleassignment_id,
      () => {
        this.props.history.push(`/roleassignments`);
      }
    );
  }

  render() {
    const { roleAssignmentsStore } = this.props;
    const { errors } = this.state;

    const infoTable =
      roleAssignmentsStore.roleAssignment === null ||
      roleAssignmentsStore.loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Informações</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Id:</strong>
                </td>
                <td>{roleAssignmentsStore.roleAssignment.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Login:</strong>
                </td>
                <td>{roleAssignmentsStore.roleAssignment.User.login}</td>
              </tr>
              <tr>
                <td>
                  <strong>Papel:</strong>
                </td>
                <td>{roleAssignmentsStore.roleAssignment.RoleType.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Curso:</strong>
                </td>
                <td>
                  {roleAssignmentsStore.roleAssignment.Course ? (
                    roleAssignmentsStore.roleAssignment.Course.name
                  ) : (
                    <span className="text-muted">n/a</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      <div className="roleassignments">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/roleassignments/${
                  this.props.match.params.roleassignment_id
                }`}
                className="btn btn-light"
              >
                Voltar para lista de atribuição de papeis
              </Link>

              <h1 className="display-4 mb-4 text-center">
                Excluir atribuição de papel
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
                      this.props.history.push(`/roleassignments`);
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

RoleAssignmentDelete.propTypes = {
  getRoleAssignment: PropTypes.func.isRequired,
  deleteRoleAssignment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roleAssignmentsStore: state.roleAssignmentsStore
});

export default connect(
  mapStateToProps,
  {
    getRoleAssignment,
    deleteRoleAssignment
  }
)(RoleAssignmentDelete);
