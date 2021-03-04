/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loginUser } from './authActions'
import { getCurrentProfile } from '../profile/profileActions'
import { clearErrors } from '../../actions/errorActions'
import TextFieldGroup from '../common/TextFieldGroup'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      login: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      this.props.clearErrors()
      if (this.props.location.prevLocation) {
        this.props.history.push(this.props.location.prevLocation.pathname)
      } else {
        this.props.history.push('/processes')
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.authStore.isAuthenticated) {
      this.props.clearErrors()
      if (this.props.location.prevLocation) {
        this.props.history.push(this.props.location.prevLocation.pathname)
      } else {
        this.props.history.push('/processes')
      }
    }

    //Tratando errors de autenticação do servidor.
    if (nextProps.errors.code) {
      let errors = {}

      switch (nextProps.errors.code) {
        case 'auth-01':
          errors.login = 'Token de acesso expirado'
          break
        case 'auth-02':
          errors.login = 'Ocorreu uma falha na autenticação'
          break
        case 'auth-03':
          errors.login = 'Requisição Inválida.'
          break
        case 'auth-04':
          errors.login = 'Login não encontrado ou senha inválida'
          break
        case 'auth-05':
          errors.login = 'Login não encontrado ou senha inválida'
          break
        case 'auth-06':
          errors.login = 'Erro interno no servidor, contate os administradores.'
          break
        case 'auth-07':
          errors.login = 'A autenticação falhou.'
          break
        case 'auth-08':
          errors.login = 'Você não tem permissão para acessar este recurso.'
          break
        case 'auth-09':
          errors.login = 'Usuário não autorizado, contate os administradores.'
          break
        default:
          errors.login = 'Erro não catalogado, contate os administradores.'
          break
      }

      this.setState({ errors: errors })
    }
  }

  onChange(e) {
    //validação do campo login
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }
    switch (e.target.name) {
      case 'login':
        valResult = { error: '', isValid: true }
        break
      case 'password':
        valResult = { error: '', isValid: true }
        break
      default:
        break
    }

    if (!valResult.isValid) {
      errors = { ...errors, login: valResult.error }
    } else {
      delete errors.login
    }

    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const userData = {
      login: this.state.login,
      password: this.state.password
    }
    this.props.clearErrors()
    this.props.loginUser(userData)
  }

  renderLogin(errors) {
    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          type='text'
          name='login'
          label='E-mail'
          value={this.state.login}
          onChange={this.onChange}
          error={errors.login}
        />
        <TextFieldGroup
          type='password'
          name='password'
          label='Senha'
          value={this.state.password}
          onChange={this.onChange}
          error={errors.password}
        />
        <input type='submit' className='btn btn-primary' />
        <Link to={'/recover/request'}>Esqueci minha senha.</Link>
      </form>
    )
  }

  render() {
    const { errors } = this.state

    return (
      <div className='login' id='main'>
        <div className='container'>
          <div className='form-container'>
            <h1>Entrar</h1>
            {this.renderLogin(errors)}
          </div>
        </div>
      </div>
    )
  }
}

// "loginUser" and "auth" are required to the Login component
Login.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  authStore: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  authStore: state.authStore, //last auth because the auth on root reducer?
  errors: state.errorStore
})

export default connect(
  mapStateToProps,
  { loginUser, getCurrentProfile, clearErrors }
)(Login)
