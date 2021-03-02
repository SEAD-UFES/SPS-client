/** @format */

import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TextFieldGroup from '../common/TextFieldGroup'
import CheckBoxFieldGroup from 'components/common/CheckBoxFieldGroup'
import { validateEmailRequired, validatePassword, validatePasswordCheck, isEmpty } from '../../validation'
import { validateProfileEditUserForm } from './validateProfileEditUserForm'

import { getCurrentProfile, updateProfileUser } from './profileActions'
import { clearErrors } from '../../actions/errorActions'

class ProfileUpdateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password2: '',
      changePassword: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    this.props.getCurrentProfile()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //tratando errors do servidor
    if (!isEmpty(nextProps.errors)) {
      let errors = { ...this.props.errors }
      if (nextProps.errors.code === 'users-06') {
        errors.email = nextProps.errors.userMessage
      }

      this.setState({ errors: errors })
    }

    //(Preenchendo / Atualizando) dados do formulario
    if (isEmpty(nextProps.errors) && nextProps.profileStore.profile) {
      const profile = nextProps.profileStore.profile

      const login = !isEmpty(profile.login) ? profile.login : ''

      //Set state
      this.setState({
        email: login
      })
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }
    switch (e.target.name) {
      case 'email':
        valResult = validateEmailRequired(e.target.value)
        break
      case 'password':
        valResult = validatePassword(e.target.value)
        //validate the field password Check to
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

  onCheck(e) {
    //validação local dos campos
    const changePassword = !this.state.changePassword
    let errors = this.state.errors
    switch (e.target.name) {
      case 'changePassword':
        if (changePassword) {
          //validate password
          if (this.state.password || this.state.password2) {
            let passVal = validatePassword(this.state.password)
            if (!passVal.isValid) {
              errors = { ...errors, password: passVal.error }
            } else {
              delete errors.password2
            }
          }
          //validate password2
          if (this.state.password || this.state.password2) {
            let pass2Val = validatePasswordCheck(this.state.password2, this.state.password)
            if (!pass2Val.isValid) {
              errors = { ...errors, password2: pass2Val.error }
            } else {
              delete errors.password2
            }
          }
        } else {
          delete errors.password
          delete errors.password2
        }
        break
      default:
        break
    }

    this.setState({
      [e.target.name]: !this.state[e.target.name],
      errors: errors
    })
  }

  onSubmit(e) {
    e.preventDefault()

    //Validação final do formulário
    const userData = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      changePassword: this.state.changePassword
    }
    const valProfileUserEdit = validateProfileEditUserForm(userData)

    //Executar o resultado da validação
    if (!valProfileUserEdit.isValid) {
      this.setState({ errors: valProfileUserEdit.errors })
    } else {
      let updateUserData = {
        User: {
          login: this.state.email
        }
      }

      if (this.state.changePassword) {
        updateUserData.User.password = this.state.password
      }

      const profile = this.props.profileStore.profile

      this.props.updateProfileUser(profile.id, updateUserData, this.props.history)
    }
  }

  renderUpdateUserForm(errors) {
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <TextFieldGroup
          label='Email: *'
          placeholder='* Endereço de email'
          type='email'
          name='email'
          value={this.state.email}
          onChange={this.onChange}
          error={errors.email}
          info='Email principal para comunicação e acesso a plataforma'
        />

        <CheckBoxFieldGroup
          id='changePassword'
          name='changePassword'
          text='Atualizar senha:'
          value='Altere a senha do usuário'
          checked={this.state.changePassword}
          error={errors.changePassword}
          onChange={this.onCheck}
        />

        <TextFieldGroup
          label='Senha: *'
          placeholder='* Senha'
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.onChange}
          error={errors.password}
          disabled={!this.state.changePassword}
        />

        <TextFieldGroup
          label='Repita a senha: *'
          placeholder='* Repita a senha'
          type='password'
          name='password2'
          value={this.state.password2}
          onChange={this.onChange}
          error={errors.password2}
          disabled={!this.state.changePassword}
        />

        <input value='Atualizar' title='Atualizar dados do usuário' type='submit' className='btn btn-primary' />
      </form>
    )
  }

  render() {
    const renderBreadcrumb = () => {
      return (
        <>
          <div className='breadcrumb'>
            <span>Você está em:</span>
            <Link to='/dashboard' className='breadcrumb-link'>
              Área pessoal
            </Link>

            <i className='fas fa-greater-than' />
            <Link to={`/profile`} className='breadcrumb-link'>
              Perfil
            </Link>

            <i className='fas fa-greater-than' />
            <span>Atualizar dados de usuário</span>
          </div>
        </>
      )
    }

    const { errors } = this.state
    return (
      <div className='profile-update-user'>
        <div className='container'>
          {renderBreadcrumb()}
          <div className='form-container' id='main'>
            <h1>Atualizar dados de usuário</h1>
            {this.renderUpdateUserForm(errors)}
          </div>
        </div>
      </div>
    )
  }
}

ProfileUpdateUser.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfileUser: PropTypes.func.isRequired,
  profileStore: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profileStore: state.profileStore,
  errors: state.errorStore
})

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateProfileUser, clearErrors }
)(withRouter(ProfileUpdateUser))
