import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import {
  isEmpty,
  validateName,
  validateSurname,
  validateCpfRequired,
  validateEmailRequired,
  validatePassword,
  validatePasswordCheck
} from '../../validation'
import { validateRegisterForm } from 'components/auth/validateRegisterForm'

import { createUser } from './userActions'

class UserCreate extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      surname: '',
      cpf: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let errors = nextProps.errors.devMessage
      errors.email = nextProps.errors.devMessage.login
      delete errors.login

      this.setState({ errors: errors })
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
      case 'cpf':
        valResult = validateCpfRequired(e.target.value)
        break
      case 'email':
        valResult = validateEmailRequired(e.target.value)
        break
      case 'password':
        valResult = validatePassword(e.target.value)
        let pass2Val = validatePasswordCheck(this.state.password2, e.target.value)
        if (!pass2Val.isValid) {
          errors = { ...errors, password2: pass2Val.error }
        } else {
          delete errors.password2
        }
        break
      case 'password2':
        valResult = validatePasswordCheck(e.target.value, this.state.password)
        break
      default:
        break
    }
    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error }
    } else {
      delete errors[e.target.name]
    }

    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors
    })
  }

  onSubmit(e) {
    e.preventDefault()

    //Validação final do campos
    const registerData = {
      cpf: this.state.cpf,
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    const valRegister = validateRegisterForm(registerData)
    if (!valRegister.isValid) {
      this.setState({ errors: valRegister.errors })
    } else {
      //Tentativa de criar o usário no servidor
      if (isEmpty(this.state.errors)) {
        const newUserData = {
          cpf: this.state.cpf,
          name: this.state.name,
          surname: this.state.surname,
          User: {
            login: this.state.email,
            password: this.state.password,
            userType: 'sead'
          }
        }
        this.props.createUser(newUserData, this.props.history)
      }
    }
  }

  renderCreateUser(errors) {
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <div className="form-lateral">
          <TextFieldGroup
            type="text"
            name="name"
            label="Nome"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <TextFieldGroup
            type="text"
            name="surname"
            label="Sobrenome"
            value={this.state.surname}
            onChange={this.onChange}
            error={errors.surname}
          />
        </div>
        <TextFieldGroup
          type="text"
          name="cpf"
          label="CPF"
          value={this.state.cpf}
          onChange={this.onChange}
          error={errors.cpf}
        />
        <TextFieldGroup
          type="text"
          name="email"
          label="E-mail"
          value={this.state.email}
          onChange={this.onChange}
          error={errors.email}
        />

        <div className="form-spacing">
          <TextFieldGroup
            type="password"
            name="password"
            label="Senha"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
          <TextFieldGroup
            type="password"
            name="password2"
            label="Confirmar senha"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Cadastrar"/>
      </form>
    )
  }

  render() {
    const { errors } = this.state

    return (
      <div className="register">
        <div className="container">
          <div className="breadcrumb">              
            <span>Você está em:</span>
            <Link to="/parameters" className="breadcrumb-link">
              Parâmetros
            </Link>
            <i className="fas fa-greater-than"></i>
            <Link to="/users" className="breadcrumb-link">
              Usuários
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>Novo usuário</span>
          </div>
          <div className="form-container" id="main">
            <h1>Novo usuário</h1>
            {this.renderCreateUser(errors)}
          </div>
        </div>
      </div>
    )
  }
}

// "registerUser" and "auth" are required to the Register component
UserCreate.proptypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  auth: state.auth, //last auth because the auth on root reducer?
  errors: state.errorStore
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(mapStateToProps, { createUser })(withRouter(UserCreate))
