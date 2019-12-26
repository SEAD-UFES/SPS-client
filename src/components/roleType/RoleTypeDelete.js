import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getRoleType } from "./roleTypeActions";
import Spinner from "components/common/Spinner";
import { deleteRoleType } from "./roleTypeActions";

class RoleTypeDelete extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.roletype_id) {
      this.props.getRoleType(this.props.match.params.roletype_id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  onSubmit() {
    this.props.deleteRoleType(this.props.match.params.roletype_id, () => {
      this.props.history.push(`/parameters/roletypes`);
    });
  }

  render() {
    const { roleTypeStore } = this.props;
    const { errors } = this.state;

    const infoTable =
      roleTypeStore.roleType === null || roleTypeStore.loading ? (
        <Spinner />
      ) : (
        <div>
          <p>
            <strong>Id: </strong>
          {roleTypeStore.roleType.id}
          </p>
          <p>
            <strong>Nome: </strong>
          {roleTypeStore.roleType.name}
          </p>
          <p>
            <strong>Descrição: </strong>
          {roleTypeStore.roleType.description}
          </p>
          <p>
            <strong>Escopo: </strong>
            {roleTypeStore.roleType.global ? "Global" : "Curso"}
          </p>
        </div>
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
          <div className="breadcrumb">              
            <span>Você está em:</span>
            <Link to="/parameters" className="breadcrumb-link">
              Parâmetros
            </Link>
            <i className="fas fa-greater-than"></i>
            <Link to="/parameters/roletypes" className="breadcrumb-link">
              Tipos de papel
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>{this.state.mode === 'create' ? 'Novo tipo de papel' : 'Editar tipo de papel'}</span>
          </div>

          <div className="form-container" id="main">
              <h1>Excluir tipo de Papel</h1>

              {alertsList}

              {/* <p className="lead text-center">Você solicitou excluir o item:</p> */}
              {infoTable}
              <p className="lead">Confirma a operação?</p>

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
    );
  }
}

RoleTypeDelete.propTypes = {
  getRoleType: PropTypes.func.isRequired,
  deleteRoleType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roleTypeStore: state.roleTypeStore
});

export default connect(
  mapStateToProps,
  {
    getRoleType,
    deleteRoleType
  }
)(RoleTypeDelete);
