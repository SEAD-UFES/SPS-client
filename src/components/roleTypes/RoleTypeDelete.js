import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getRoleType } from "./roleTypesActions";
import Spinner from "components/common/Spinner";
import { deleteRoleType } from "./roleTypesActions";

class RoleTypeDelete extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.roletype_id) {
      this.props.getRoleType(this.props.match.params.roletype_id);
    }
  }

  onSubmit() {
    this.props.deleteRoleType(this.props.match.params.roletype_id, () => {
      this.props.history.push(`/roletypes`);
    });
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
                  <strong>Id:</strong>
                </td>
                <td>{roleTypesStore.roleType.id}</td>
              </tr>
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
                Excluir tipo de Papel
              </h1>
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
                      this.props.history.push(
                        `/roletypes/${roleTypesStore.roleType.id}`
                      );
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

RoleTypeDelete.propTypes = {
  getRoleType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roleTypesStore: state.roleTypesStore
});

export default connect(
  mapStateToProps,
  {
    getRoleType,
    deleteRoleType
  }
)(RoleTypeDelete);
