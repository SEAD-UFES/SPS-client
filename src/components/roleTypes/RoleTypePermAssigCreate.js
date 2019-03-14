import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SelectListGroup from "components/common/SelectListGroup";

import { getRoleTypes } from "./roleTypesActions";
import { getPermissionTypes } from "components/permissionTypes/permissionTypesActions";

class RoleTypePermAssigCreate extends Component {
  constructor() {
    super();
    this.state = {
      roleType_id: "",
      permissionType_id: "",
      errors: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getRoleTypes();
    this.props.getPermissionTypes();
  }

  componentWillReceiveProps(nextProps) {
    //errors
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };

    switch (e.target.name) {
      case "name":
        break;
      default:
        break;
    }

    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error };
    } else {
      delete errors[e.target.name];
    }

    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors
    });
  }
  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { errors } = this.state;
    const permissionTypes = this.props.permissionTypesStore.permissionTypes;

    const roleTypeOptions = [];

    const permissionOptions = [
      { label: "* Selecione a papel", value: "" }
    ].concat(
      permissionTypes
        ? permissionTypes.map(permissionType => {
            return {
              label: permissionType.name,
              value: permissionType.id
            };
          })
        : []
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

    const permAssigForm = (
      <form noValidate onSubmit={this.onSubmit}>
        <div className="form-group">
          <SelectListGroup
            placeholder="* Selecione o usuário"
            name="roleType_id"
            value={this.state.permissionType_id}
            options={roleTypeOptions}
            onChange={this.onChange}
            error={errors.user_id}
          />

          <SelectListGroup
            placeholder="* Selecione o papel"
            name="permissionType_id"
            value={this.state.permissionType_id}
            options={permissionOptions}
            onChange={this.onChange}
            error={errors.permissionType_id}
          />

          <input type="submit" className="btn btn-info btn-block mt-4" />
        </div>
      </form>
    );

    return (
      <div className="roleassignments-create-permassig">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/roletypes/roleType_id`} className="btn btn-light">
                Voltar para tipo de papel
              </Link>
              <h1 className="display-4 text-center">
                Criar atribuição de permissão
              </h1>
              <p className="lead text-center">Dê entrada nos dados básicos</p>

              {alertsList}
              {permAssigForm}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RoleTypePermAssigCreate.propTypes = {
  getRoleTypes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roleTypesStore: state.roleTypesStore,
  permissionTypesStore: state.permissionTypesStore
});

export default connect(
  mapStateToProps,
  {
    getRoleTypes,
    getPermissionTypes
  }
)(RoleTypePermAssigCreate);
