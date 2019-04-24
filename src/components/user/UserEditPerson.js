import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { validateName, validateSurname, validateDate, validateCpfRequired, isEmpty } from "../../validation";
import { validateProfileEditPersonForm } from "components/profile/validateProfileEditPersonForm";
import { clearErrors } from "../../actions/errorActions";
import { getUser, updatePerson, getUserPeopleOptions } from "./userActions";

class UserEditPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      birthdate: "",
      cpf: "",
      nationality: "",
      rgNumber: "",
      rgDispatcher: "",
      ethnicity: "",
      gender: "",
      civilStatus: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params.id) {
      this.props.getUser(this.props.match.params.id);
    }
    this.props.getUserPeopleOptions();
  }

  componentWillReceiveProps(nextProps) {
    //tratando errors do servidor
    if (!isEmpty(nextProps.errorStore)) {
      if (nextProps.errorStore.devMessage.errors[0].message === "cpf must be unique") {
        let errors = { ...this.state.errors };
        errors.cpf = "cpf já cadastrado na base de dados";
        this.setState({ errors: errors });
      }
    }

    //(Preenchendo / Atualizando) dados do formulario
    if (isEmpty(nextProps.errors) && nextProps.userStore.user) {
      const user = nextProps.userStore.user;

      //preenchendo campos caso não existam
      if (user.Person) {
        user.Person.name = !isEmpty(user.Person.name) ? user.Person.name : "";
        user.Person.surname = !isEmpty(user.Person.surname) ? user.Person.surname : "";
        user.Person.birthdate = !isEmpty(user.Person.birthdate) ? moment(user.Person.birthdate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD") : "";
        user.Person.nationality = !isEmpty(user.Person.nationality) ? user.Person.nationality : "";
        user.Person.rgNumber = !isEmpty(user.Person.rgNumber) ? user.Person.rgNumber : "";
        user.Person.rgDispatcher = !isEmpty(user.Person.rgDispatcher) ? user.Person.rgDispatcher : "";
        user.Person.ethnicity = !isEmpty(user.Person.ethnicity) ? user.Person.ethnicity : "";
        user.Person.gender = !isEmpty(user.Person.gender) ? user.Person.gender : "";
        user.Person.civilStatus = !isEmpty(user.Person.civilStatus) ? user.Person.civilStatus : "";

        //Atualizando estado do componente
        this.setState({
          name: user.Person.name,
          surname: user.Person.surname,
          birthdate: user.Person.birthdate,
          cpf: user.Person.cpf,
          nationality: user.Person.nationality,
          rgNumber: user.Person.rgNumber,
          rgDispatcher: user.Person.rgDispatcher,
          ethnicity: user.Person.ethnicity,
          gender: user.Person.gender,
          civilStatus: user.Person.civilStatus
        });
      }
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "name":
        valResult = validateName(e.target.value);
        break;
      case "surname":
        valResult = validateSurname(e.target.value);
        break;
      case "birthdate":
        valResult = validateDate(e.target.value);
        break;
      case "cpf":
        valResult = validateCpfRequired(e.target.value);
        break;
      default:
        break;
    }
    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error };
    } else {
      delete errors[e.target.name];
    }

    //atualizando dados no state
    this.setState({ [e.target.name]: e.target.value, errors: errors });
  }

  onCheck(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let personData = {
      name: this.state.name,
      surname: this.state.surname,
      birthdate: this.state.birthdate ? this.state.birthdate : null,
      cpf: this.state.cpf,
      nationality: this.state.nationality,
      rgNumber: this.state.rgNumber,
      rgDispatcher: this.state.rgDispatcher,
      ethnicity: this.state.ethnicity ? this.state.ethnicity : null,
      gender: this.state.gender ? this.state.gender : null,
      civilStatus: this.state.civilStatus ? this.state.civilStatus : null
    };

    const valProfileEditPerson = validateProfileEditPersonForm(personData);

    if (!valProfileEditPerson.isValid) {
      this.setState({ errors: valProfileEditPerson.errors });
    } else {
      const user = this.props.userStore.user;
      this.props.updatePerson(user.id, personData, this.props.history);
    }
  }

  render() {
    const { errors } = this.state;
    const options = this.props.userStore.options;

    const colorOptions = [{ label: "Escolha cor/etnia", value: "" }].concat(
      options
        ? options.ethnicity.values.map(color => {
            return {
              label: `${color.charAt(0).toUpperCase()}${color.slice(1)}`,
              value: color
            };
          })
        : []
    );

    const genderOptions = [{ label: "Escolha gênero", value: "" }].concat(
      options
        ? options.gender.values.map(color => {
            return {
              label: `${color.charAt(0).toUpperCase()}${color.slice(1)}`,
              value: color
            };
          })
        : []
    );

    const civilStateOptions = [{ label: "Escolha estado civil", value: "" }].concat(
      options
        ? options.civilStatus.values.map(color => {
            return {
              label: `${color.charAt(0).toUpperCase()}${color.slice(1)}`,
              value: color
            };
          })
        : []
    );

    return (
      <div className="user-edit-person">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/users" className="btn btn-light">
                Voltar para perfil
              </Link>
              <h1 className="display-4 text-center">Editar perfil</h1>
              <p className="lead text-center">Atualize suas informações pessoais</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup placeholder="* Nome" type="text" name="name" value={this.state.name} onChange={this.onChange} error={errors.name} />

                <TextFieldGroup
                  placeholder="* Sobrenome"
                  type="text"
                  name="surname"
                  value={this.state.surname}
                  onChange={this.onChange}
                  error={errors.surname}
                />

                <h6>Data de nascimento</h6>
                <TextFieldGroup
                  placeholder="Data de nascimento"
                  type="date"
                  name="birthdate"
                  value={this.state.birthdate}
                  onChange={this.onChange}
                  error={errors.birthdate}
                />

                <TextFieldGroup placeholder="* C.P.F." type="text" name="cpf" value={this.state.cpf} onChange={this.onChange} error={errors.cpf} />

                <TextFieldGroup
                  placeholder="Nacionalidade"
                  type="text"
                  name="nationality"
                  value={this.state.nationality}
                  onChange={this.onChange}
                  error={errors.nationality}
                />

                <h6>Dados de RG</h6>
                <div className="row">
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="Número do RG"
                      type="text"
                      name="rgNumber"
                      value={this.state.rgNumber}
                      onChange={this.onChange}
                      error={errors.rgNumber}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="Expeditor do RG"
                      type="text"
                      name="rgDispatcher"
                      value={this.state.rgDispatcher}
                      onChange={this.onChange}
                      error={errors.rgDispatcher}
                    />
                  </div>
                </div>

                <SelectListGroup
                  placeholder="Escolha cor/etnia"
                  name="ethnicity"
                  value={this.state.ethnicity}
                  options={colorOptions}
                  onChange={this.onChange}
                  error={errors.ethnicity}
                />

                <SelectListGroup
                  placeholder="Escolha gênero"
                  name="gender"
                  value={this.state.gender}
                  options={genderOptions}
                  onChange={this.onChange}
                  error={errors.gender}
                />

                <SelectListGroup
                  placeholder="Escolha estado civil"
                  name="civilStatus"
                  value={this.state.civilStatus}
                  options={civilStateOptions}
                  onChange={this.onChange}
                  error={errors.civilStatus}
                />

                <input value="Enviar" type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserEditPerson.propsTypes = {
  clearErrors: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getPeopleOptions: PropTypes.func.isRequired,
  getUserPeopleOptions: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userStore: state.userStore,
  errors: state.errorStore
});

export default connect(
  mapStateToProps,
  {
    clearErrors,
    getUser,
    updatePerson,
    getUserPeopleOptions
  }
)(withRouter(UserEditPerson));
