import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPermissionAssignment } from "components/permissionAssignments/permissionAssignmentsActions";

class RoleTypePermAssigDelete extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  componentDidMount() {
    if (this.props.match.params.permissionassignment_id) {
      this.props.getPermissionAssignment(
        this.props.match.params.permissionassignment_id
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  render() {
    const { errors } = this.state;

    // const infoTable =
    // permissionAssigmentsStore.permissionAssigment === null || permissionAssigmentsStore.loading ? (
    //   <Spinner />
    // ) : (
    //   <div>
    //     <h4 className="mb-2">Informações</h4>
    //     <table className="table">
    //       <tbody>
    //         <tr>
    //           <td>
    //             <strong>Id:</strong>
    //           </td>
    //           <td>{permissionAssigmentsStore.permissionAssigment.id}</td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <strong>Nome:</strong>
    //           </td>
    //           <td>{roleTypesStore.roleType.name}</td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <strong>Descrição:</strong>
    //           </td>
    //           <td>{roleTypesStore.roleType.description}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // );

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
              {/* {infoTable} */}
              <h1>Item</h1>
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
  permissonAssignmentsStore: state.permissonAssignmentsStore
});

export default connect(
  mapStateToProps,
  {
    getPermissionAssignment
  }
)(RoleTypePermAssigDelete);
