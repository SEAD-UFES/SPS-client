import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TextFieldGroup from "components/common/TextFieldGroup";
import TextAreaFieldGroup from "components/common/TextAreaFieldGroup";

import { validateName } from "validation/";
import { validateRoleTypeForm } from "./validateRoleTypeForm";

import { createRoleType, getRoleType, updateRoleType } from "./roleTypeActions";

class RoleTypeCreateUpdate extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: "",
      description: "",
      errors: [],
      mode: "create"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.match.params.roletype_id) {
      this.setState({ mode: "update" });
    }
  }

  componentDidMount() {
    if (this.props.match.params.roletype_id) {
      this.props.getRoleType(this.props.match.params.roletype_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    //errors
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }

    //Load data on form
    if (nextProps.roleTypeStore.roleType !== null) {
      const roleType = nextProps.roleTypeStore.roleType;
      this.setState({
        id: roleType.id,
        name: roleType.name,
        description: roleType.description
      });
    }
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "name":
        valResult = validateName(e.target.value);
        break;
      case "description":
        valResult = validateName(e.target.value);
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

    const roleTypeData = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description
    };

    const valRoleType = validateRoleTypeForm(roleTypeData);
    if (!valRoleType.isValid) {
      this.setState({ errors: valRoleType.errors });
    } else {
      if (this.state.mode === "create") {
        this.props.createRoleType(roleTypeData, roletype_id => {
          this.props.history.push(`/roletypes/${roletype_id}`);
        });
      } else {
        this.props.updateRoleType(roleTypeData, roletype_id => {
          this.props.history.push(`/roletypes/${roletype_id}`);
        });
      }
    }
  }

  render() {
    const { errors } = this.state;

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

    const roletypeForm = (
      <form noValidate onSubmit={this.onSubmit}>
        <div className="form-group">
          <TextFieldGroup type="text" name="name" placeholder="* Nome" value={this.state.name} onChange={this.onChange} error={errors.name} />

          <TextAreaFieldGroup
            type="text"
            name="description"
            placeholder="Descrição"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
          />

          <input type="submit" className="btn btn-info btn-block mt-4" />
        </div>
      </form>
    );

    return (
      <div className="roletypes-create">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/roletypes" className="btn btn-light">
                Voltar para lista de tipos de papel
              </Link>
              <h1 className="display-4 text-center">{this.state.mode === "create" ? "Criar tipo de papel" : "Editar tipo de papel"}</h1>
              <p className="lead text-center">{this.state.mode === "create" ? "Dê entrada nos dados básicos" : "Altere os dados básicos"}</p>

              {alertsList}
              {roletypeForm}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RoleTypeCreateUpdate.propTypes = {
  createRoleType: PropTypes.func.isRequired,
  getRoleType: PropTypes.func.isRequired,
  updateRoleType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roleTypeStore: state.roleTypeStore
});

export default connect(
  mapStateToProps,
  {
    createRoleType,
    getRoleType,
    updateRoleType
  }
)(RoleTypeCreateUpdate);
