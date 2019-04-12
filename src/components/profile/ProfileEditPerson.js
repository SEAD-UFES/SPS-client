import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { validateName, validateSurname, validateDate, validateCpfRequired, isEmpty, validateProfileEditPersonForm } from "../../validation";
import { getCurrentProfile, getPeopleOptions, updateProfilePerson } from "./profileActions";
import { clearErrors } from "../../actions/errorActions";

class ProfileEditPerson extends Component {
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
    this.props.getCurrentProfile();
    this.props.getPeopleOptions();
  }

  componentWillReceiveProps(nextProps) {
    //tratando errors do servidor
    if (!isEmpty(nextProps.errors)) {
      if (nextProps.errors.devMessage.errors[0].message === "cpf must be unique") {
        let errors = { ...this.state.errors };
        errors.cpf = "cpf já cadastrado na base de dados";
        this.setState({ errors: errors });
      }
    }

    //(Preenchendo / Atualizando) dados do formulario
    if (isEmpty(nextProps.errors) && nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //preenchendo de person se existirem
      if (profile.person) {
        profile.person.name = !isEmpty(profile.person.name) ? profile.person.name : "";
        profile.person.surname = !isEmpty(profile.person.surname) ? profile.person.surname : "";
        profile.person.birthdate = !isEmpty(profile.person.birthdate) ? moment(profile.person.birthdate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD") : "";
        profile.person.nationality = !isEmpty(profile.person.nationality) ? profile.person.nationality : "";
        profile.person.rgNumber = !isEmpty(profile.person.rgNumber) ? profile.person.rgNumber : "";
        profile.person.rgDispatcher = !isEmpty(profile.person.rgDispatcher) ? profile.person.rgDispatcher : "";
        profile.person.ethnicity = !isEmpty(profile.person.ethnicity) ? profile.person.ethnicity : "";
        profile.person.gender = !isEmpty(profile.person.gender) ? profile.person.gender : "";
        profile.person.civilStatus = !isEmpty(profile.person.civilStatus) ? profile.person.civilStatus : "";

        //Atualizando estado do componente
        this.setState({
          name: profile.person.name,
          surname: profile.person.surname,
          birthdate: profile.person.birthdate,
          cpf: profile.person.cpf,
          nationality: profile.person.nationality,
          rgNumber: profile.person.rgNumber,
          rgDispatcher: profile.person.rgDispatcher,
          ethnicity: profile.person.ethnicity,
          gender: profile.person.gender,
          civilStatus: profile.person.civilStatus
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

    const profile = this.props.profile.profile;

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
      console.log(personData);
      console.log(valProfileEditPerson.errors);
      this.setState({ errors: valProfileEditPerson.errors });
    } else {
      let updatepersonData = {
        Person: {
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
        }
      };

      this.props.updateProfilePerson(profile.user.id, updatepersonData, this.props.history);
    }
  }

  render() {
    const { errors } = this.state;
    const options = this.props.profile.options;

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
      <div className="profile-edit-person">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/profile" className="btn btn-light">
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

ProfileEditPerson.propsTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPeopleOptions: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateProfilePerson, getPeopleOptions, clearErrors }
)(withRouter(ProfileEditPerson));
