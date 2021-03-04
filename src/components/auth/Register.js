/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import { cpfEventMask } from '../../utils/eventMasks'
import { checkNested } from '../../utils/objectHelpers'

import {
  isEmpty,
  validateName,
  validateSurname,
  validateCpfRequired,
  validateEmailRequired,
  validatePassword,
  validatePasswordCheck
} from '../../validation'
import { validateRegisterForm } from './validateRegisterForm'
import { validateMotherName } from '../../validation/person'

import { registerUser } from './authActions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      surname: '',
      cpf: '',
      motherName: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      registerOK: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.errorStore)) {
      const serverErrors = checkNested(nextProps, 'errorStore', 'data', 'devMessage', 'errors')
        ? nextProps.errorStore.data.devMessage.errors
        : {}
      let errors = { ...serverErrors }
      if (errors.login) {
        errors.email = errors.login
        delete errors.login
      }
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
        cpfEventMask(e)
        valResult = validateCpfRequired(e.target.value)
        break
      case 'motherName':
        const motherNameError = validateMotherName(e.target.value)
        valResult = { isValid: motherNameError ? false : true, error: motherNameError }
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
      name: this.state.name,
      surname: this.state.surname,
      cpf: this.state.cpf,
      motherName: this.state.motherName,
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
          User: {
            login: this.state.email,
            password: this.state.password,
            userType: 'sead'
          },
          Person: {
            cpf: this.state.cpf,
            name: this.state.name,
            surname: this.state.surname,
            motherName: this.state.motherName
          }
        }

        this.props.registerUser(newUserData, {
          callbackOk: () => {
            this.setState({ registerOK: true })
            //this.props.history.push('/login')
          }
        })
      }
    }
  }

  renderRegister(errors) {
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <div className='form-lateral'>
          <TextFieldGroup
            type='text'
            name='name'
            label='Nome'
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <TextFieldGroup
            type='text'
            name='surname'
            label='Sobrenome'
            value={this.state.surname}
            onChange={this.onChange}
            error={errors.surname}
          />
        </div>

        <TextFieldGroup
          type='text'
          name='cpf'
          label='CPF'
          placeholder='___.___.___-__'
          value={this.state.cpf}
          onChange={this.onChange}
          error={errors.cpf}
        />

        <TextFieldGroup
          type='text'
          name='motherName'
          label='Nome da mãe'
          placeholder=''
          value={this.state.motherName}
          onChange={this.onChange}
          error={errors.motherName}
        />

        <TextFieldGroup
          type='text'
          name='email'
          label='Email'
          value={this.state.email}
          onChange={this.onChange}
          error={errors.email}
        />

        <div className='form-spacing'>
          <TextFieldGroup
            type='password'
            name='password'
            label='Senha'
            info='Mínimo de 6 caractéres'
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
          <TextFieldGroup
            type='password'
            name='password2'
            label='Confirmar senha'
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />
        </div>

        <input type='submit' title='Efetuar registro' className='btn btn-primary' value='Cadastrar' />
      </form>
    )
  }

  renderRegisterOkMessage() {
    return (
      <>
        {this.renderBreadcrumb()}
        <h1 className='display-4'>Cadastro efetuado com sucesso!</h1>
        <div>
          <p>
            Para acessar efetuar login na plataforma{' '}
            <Link tile='Acessar perfil' to={'/login'}>
              clique aqui
            </Link>
            .
          </p>
        </div>
      </>
    )
  }

  renderBreadcrumb() {
    return (
      <>
        <div className='breadcrumb'>
          <span>Você está em:</span>
          <span>Cadastro</span>

          {this.state.registerOK ? (
            <>
              <i className='fas fa-greater-than' /> <span>Sucesso</span>
            </>
          ) : (
            ''
          )}
        </div>
      </>
    )
  }

  //true render method
  render() {
    const { errors } = this.state

    if (!this.state.registerOK) {
      return (
        <div className='register' id='main'>
          <div className='container'>
            {this.renderBreadcrumb()}
            <div className='form-container'>
              <h1>Cadastro</h1>
              {this.renderRegister(errors)}
            </div>
          </div>
        </div>
      )
    }

    if (this.state.registerOK) {
      return (
        <div className='view-page'>
          <div className='container'>
            <div className='main mb-4'>{this.renderRegisterOkMessage()}</div>
          </div>
        </div>
      )
    }
  }
}

// "registerUser" and "auth" are required to the Register component
Register.proptypes = {
  registerUser: PropTypes.func.isRequired,
  authStore: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  authStore: state.authStore, //last auth because the auth on root reducer?
  errorStore: state.errorStore
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register))
