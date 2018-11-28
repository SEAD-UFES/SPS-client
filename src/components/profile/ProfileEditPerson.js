import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
  validateName,
  validateSurname,
  validateDate,
  validateCpfRequired,
  isEmpty
} from "../../validation";
import { getCurrentProfile } from "../../actions/profileActions";

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
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    //tratando errors do servidor
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    //(Preenchendo / Atualizando) dados do formulario
    if (isEmpty(nextProps.errors) && nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const data = new Date(profile.person.birthdate);
      console.log(data.toString());

      const data2 = moment(profile.person.birthdate);
      console.log(data2._d);

      // const birthdate = !isEmpty(profile.person.birthdate)
      //   ? moment(profile.user.birthdate).format("YYYY-MM-DD")
      //   : "";

      this.setState({
        name: profile.person.name,
        surname: profile.person.surname,
        cpf: profile.person.cpf
      });
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

    const personData = {
      name: this.state.name,
      surname: this.state.surname,
      birthdate: moment(this.state.birthdate),
      cpf: this.state.cpf,
      nationality: this.state.nationality,
      rgNumber: this.state.rgNumber,
      rgDispatcher: this.state.rgDispatcher,
      ethnicity: this.state.ethnicity,
      gender: this.state.gender,
      civilStatus: this.state.civilStatus
    };

    console.log(personData);
  }

  render() {
    const { errors } = this.state;
    const { colors, genders, civilStates } = {
      colors: ["branco", "negro", "pardo", "amarelo", "indigena"],
      genders: ["masculino", "feminino", "outros"],
      civilStates: ["solteiro", "casado", "separado", "divorciado", "viúvo"]
    };

    const colorOptions = [{ label: "Escolha cor/etnia", value: "" }].concat(
      colors.map(color => {
        return {
          label: `${color.charAt(0).toUpperCase()}${color.slice(1)}`,
          value: color
        };
      })
    );

    const genderOptions = [{ label: "Escolha gênero", value: "" }].concat(
      genders.map(gender => {
        return {
          label: `${gender.charAt(0).toUpperCase()}${gender.slice(1)}`,
          value: gender
        };
      })
    );

    const civilStateOptions = [
      { label: "Escolha estado civil", value: "" }
    ].concat(
      civilStates.map(civState => {
        return {
          label: `${civState.charAt(0).toUpperCase()}${civState.slice(1)}`,
          value: civState
        };
      })
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
              <p className="lead text-center">
                Atualize suas informações pessoais
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Nome"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

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

                <TextFieldGroup
                  placeholder="* C.P.F."
                  type="text"
                  name="cpf"
                  value={this.state.cpf}
                  onChange={this.onChange}
                  error={errors.cpf}
                />

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
                      name="rgExpeditor"
                      value={this.state.rgDispatcher}
                      onChange={this.onChange}
                      error={errors.rgDispatcher}
                    />
                  </div>
                </div>

                <SelectListGroup
                  placeholder="Escolha cor/etnia"
                  name="color"
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
                  placeholder="Escolha cor/etnia"
                  name="civilState"
                  value={this.state.civilStatus}
                  options={civilStateOptions}
                  onChange={this.onChange}
                  error={errors.civilStatus}
                />

                <input
                  value="Enviar"
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileEditPerson.propsTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(ProfileEditPerson);
