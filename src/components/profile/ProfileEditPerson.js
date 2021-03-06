import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import { validateName, validateSurname, validateDate, validateCpfRequired, isEmpty } from '../../validation'
import { validateProfileEditPersonForm } from './validateProfileEditPersonForm'
import { getCurrentProfile, getPeopleOptions, updateProfilePerson } from './profileActions'
import { clearErrors } from '../../actions/errorActions'

class ProfileEditPerson extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      surname: '',
      birthdate: '',
      cpf: '',
      nationality: '',
      rgNumber: '',
      rgDispatcher: '',
      ethnicity: '',
      gender: '',
      civilStatus: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    this.props.getCurrentProfile()
    this.props.getPeopleOptions()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //tratando errors do servidor
    if (!isEmpty(nextProps.errors)) {
      if (nextProps.errors.devMessage.errors[0].message === 'cpf must be unique') {
        let errors = { ...this.state.errors }
        errors.cpf = 'cpf já cadastrado na base de dados'
        this.setState({ errors: errors })
      }
    }

    //(Preenchendo / Atualizando) dados do formulario
    if (isEmpty(nextProps.errors) && nextProps.profileStore.profile) {
      const profile = nextProps.profileStore.profile

      //preenchendo de Person se existirem
      if (profile.Person) {
        profile.Person.name = !isEmpty(profile.Person.name) ? profile.Person.name : ''
        profile.Person.surname = !isEmpty(profile.Person.surname) ? profile.Person.surname : ''
        profile.Person.birthdate = !isEmpty(profile.Person.birthdate)
          ? moment(profile.Person.birthdate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
          : ''
        profile.Person.nationality = !isEmpty(profile.Person.nationality) ? profile.Person.nationality : ''
        profile.Person.rgNumber = !isEmpty(profile.Person.rgNumber) ? profile.Person.rgNumber : ''
        profile.Person.rgDispatcher = !isEmpty(profile.Person.rgDispatcher) ? profile.Person.rgDispatcher : ''
        profile.Person.ethnicity = !isEmpty(profile.Person.ethnicity) ? profile.Person.ethnicity : ''
        profile.Person.gender = !isEmpty(profile.Person.gender) ? profile.Person.gender : ''
        profile.Person.civilStatus = !isEmpty(profile.Person.civilStatus) ? profile.Person.civilStatus : ''

        //Atualizando estado do componente
        this.setState({
          name: profile.Person.name,
          surname: profile.Person.surname,
          birthdate: profile.Person.birthdate,
          cpf: profile.Person.cpf,
          nationality: profile.Person.nationality,
          rgNumber: profile.Person.rgNumber,
          rgDispatcher: profile.Person.rgDispatcher,
          ethnicity: profile.Person.ethnicity,
          gender: profile.Person.gender,
          civilStatus: profile.Person.civilStatus
        })
      }
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }
    switch (e.target.name) {
      case 'name':
        valResult = validateName(e.target.value)
        break
      case 'surname':
        valResult = validateSurname(e.target.value)
        break
      case 'birthdate':
        valResult = validateDate(e.target.value)
        break
      case 'cpf':
        valResult = validateCpfRequired(e.target.value)
        break
      default:
        break
    }
    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error }
    } else {
      delete errors[e.target.name]
    }
    //atualizando dados no state
    this.setState({ [e.target.name]: e.target.value, errors: errors })
  }

  onCheck(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const profile = this.props.profileStore.profile

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
    }

    const valProfileEditPerson = validateProfileEditPersonForm(personData)

    if (!valProfileEditPerson.isValid) {
      console.log(personData)
      console.log(valProfileEditPerson.errors)
      this.setState({ errors: valProfileEditPerson.errors })
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
      }

      this.props.updateProfilePerson(profile.id, updatepersonData, this.props.history)
    }
  }

  renderEditPerson(errors, colorOptions, genderOptions, civilStateOptions) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Editar dados pessoais</h4>
        </div>
        <div className="card-body">
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              label="Nome: *"
              placeholder="* Nome"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />

            <TextFieldGroup
              label="Sobrenome: *"
              placeholder="* Sobrenome"
              type="text"
              name="surname"
              value={this.state.surname}
              onChange={this.onChange}
              error={errors.surname}
            />

            <TextFieldGroup
              label="Nascimento: *"
              placeholder="Data de nascimento"
              type="date"
              name="birthdate"
              value={this.state.birthdate}
              onChange={this.onChange}
              error={errors.birthdate}
            />

            <TextFieldGroup
              label="C.P.F.: *"
              placeholder="* C.P.F."
              type="text"
              name="cpf"
              value={this.state.cpf}
              onChange={this.onChange}
              error={errors.cpf}
            />

            <TextFieldGroup
              label="Nascionalidade: *"
              placeholder="Nacionalidade"
              type="text"
              name="nationality"
              value={this.state.nationality}
              onChange={this.onChange}
              error={errors.nationality}
            />

            <TextFieldGroup
              label="RG - Número:"
              placeholder="Número do RG"
              type="text"
              name="rgNumber"
              value={this.state.rgNumber}
              onChange={this.onChange}
              error={errors.rgNumber}
            />

            <TextFieldGroup
              label="RG - Expeditor:"
              placeholder="Expeditor do RG"
              type="text"
              name="rgDispatcher"
              value={this.state.rgDispatcher}
              onChange={this.onChange}
              error={errors.rgDispatcher}
            />

            <SelectListGroup
              label="Etnia:"
              placeholder="Escolha cor/etnia"
              name="ethnicity"
              value={this.state.ethnicity}
              options={colorOptions}
              onChange={this.onChange}
              error={errors.ethnicity}
            />

            <SelectListGroup
              label="Gênero:"
              placeholder="Escolha gênero"
              name="gender"
              value={this.state.gender}
              options={genderOptions}
              onChange={this.onChange}
              error={errors.gender}
            />

            <SelectListGroup
              label="Estado civil:"
              placeholder="Escolha estado civil"
              name="civilStatus"
              value={this.state.civilStatus}
              options={civilStateOptions}
              onChange={this.onChange}
              error={errors.civilStatus}
            />

            <input value="Enviar" type="submit" className="btn btn-primary btn-block mt-4" />
          </form>
        </div>
      </div>
    )
  }

  render() {
    const { errors } = this.state
    const options = this.props.profileStore.options

    const colorOptions = [{ label: 'Escolha cor/etnia', value: '' }].concat(
      options
        ? options.ethnicity.values.map(color => {
            return {
              label: `${color.charAt(0).toUpperCase()}${color.slice(1)}`,
              value: color
            }
          })
        : []
    )

    const genderOptions = [{ label: 'Escolha gênero', value: '' }].concat(
      options
        ? options.gender.values.map(color => {
            return {
              label: `${color.charAt(0).toUpperCase()}${color.slice(1)}`,
              value: color
            }
          })
        : []
    )

    const civilStateOptions = [{ label: 'Escolha estado civil', value: '' }].concat(
      options
        ? options.civilStatus.values.map(color => {
            return {
              label: `${color.charAt(0).toUpperCase()}${color.slice(1)}`,
              value: color
            }
          })
        : []
    )

    return (
      <div className="profile-edit-Person">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/profile" className="btn btn-light">
                Voltar
              </Link>
              <h1 className="display-4">Perfil</h1>
              {this.renderEditPerson(errors, colorOptions, genderOptions, civilStateOptions)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileEditPerson.propsTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPeopleOptions: PropTypes.func.isRequired,
  profileStore: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profileStore: state.profileStore,
  errors: state.errorStore
})

export default connect(mapStateToProps, { getCurrentProfile, updateProfilePerson, getPeopleOptions, clearErrors })(
  withRouter(ProfileEditPerson)
)
