import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getUserRole, deleteUserRole } from "./userRoleActions";
import Spinner from "components/common/Spinner";

class UserRoleDelete extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.userrole_id) {
      this.props.getUserRole(this.props.match.params.userrole_id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.deleteUserRole(this.props.match.params.userrole_id, () => {
      this.props.history.push(`/parameters/roleassignments`);
    });
  }

  render() {
    const { userRoleStore } = this.props;
    const { errors } = this.state;

    const infoTable =
      userRoleStore.userRole === null || userRoleStore.loading ? (
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
                <td>{userRoleStore.userRole.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Login:</strong>
                </td>
                <td>{userRoleStore.userRole.User.login}</td>
              </tr>
              <tr>
                <td>
                  <strong>Papel:</strong>
                </td>
                <td>{userRoleStore.userRole.RoleType.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Curso:</strong>
                </td>
                <td>
                  {userRoleStore.userRole.RoleType.global ? (
                    "Papel Global"
                  ) : userRoleStore.userRole.Course ? (
                    userRoleStore.userRole.Course.name
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
      <div className="userRole-delete">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/parameters/roleassignments`} className="btn btn-light">
                Voltar para lista de atribuição de papeis
              </Link>

              <h1 className="display-4 mb-4 text-center">Excluir atribuição de papel</h1>

              {alertsList}

              <p className="lead text-center">Você solicitou excluir o item:</p>
              {infoTable}
              <p className="lead text-center">Confirma a operação?</p>

              <div className="row">
                <div className="col">
                  <input type="button" value="Excluir" className="btn btn-danger btn-block mt-4" onClick={this.onSubmit} />
                </div>
                <div className="col">
                  <input
                    type="button"
                    value="Cancelar"
                    className="btn btn-secondary btn-block mt-4"
                    onClick={() => {
                      this.props.history.push(`/parameters/roleassignments`);
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

UserRoleDelete.propTypes = {
  getUserRole: PropTypes.func.isRequired,
  deleteUserRole: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userRoleStore: state.userRoleStore
});

export default connect(
  mapStateToProps,
  {
    getUserRole,
    deleteUserRole
  }
)(UserRoleDelete);
