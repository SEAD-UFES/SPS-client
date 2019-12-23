import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TextFieldGroup from '../common/TextFieldGroup'
import CheckBoxFieldGroup from '../common/CheckBoxFieldGroup'

import { validateEmailRequired, validatePassword, validatePasswordCheck, isEmpty } from '../../validation'
import { validateProfileEditUserForm } from 'components/profile/validateProfileEditUserForm'
import { clearErrors } from '../../actions/errorActions'
import { getUser, updateUser } from './userActions'

class UserEditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password2: '',
      active: '',
      changePassword: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    if (this.props.match.params.id) {
      this.props.getUser(this.props.match.params.id)
    }
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
    if (isEmpty(nextProps.errors) && nextProps.userStore.user) {
      const user = nextProps.userStore.user

      const login = !isEmpty(user.login) ? user.login : ''
      const active = user.authorized ? true : false

      //Set state
      this.setState({
        email: login,
        active: active
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
    const valUserEditUser = validateProfileEditUserForm(userData)

    //Executar o resultado da validação
    if (!valUserEditUser.isValid) {
      this.setState({ errors: valUserEditUser.errors })
    } else {
      let updateUserData = {
        login: this.state.email,
        authorized: this.state.active
      }
      if (this.state.changePassword) {
        updateUserData.password = this.state.password
      }

      const user = this.props.userStore.user

      this.props.updateUser(user.id, updateUserData, this.props.history)
    }
  }

  renderEditUser(errors) {
    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          label="Email"
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          error={errors.email}
          info="Email principal para comunicação e acesso a plataforma"
        />

        <CheckBoxFieldGroup
          id="active"
          name="active"
          text="Ativo"
          value="Este usuário está ativo."
          checked={this.state.active}
          error={errors.active}
          onChange={this.onCheck}
        />

        <CheckBoxFieldGroup
          id="changePassword"
          name="changePassword"
          text="Alterar senha"
          value="Desejo alterar a senha de acesso."
          checked={this.state.changePassword}
          error={errors.changePassword}
          onChange={this.onCheck}
        />

        <TextFieldGroup
          label="Senha"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          error={errors.password}
          disabled={!this.state.changePassword}
        />

        <TextFieldGroup
          label="Repita a senha"
          type="password"
          name="password2"
          value={this.state.password2}
          onChange={this.onChange}
          error={errors.password2}
          disabled={!this.state.changePassword}
        />

        <input type="submit" className="btn btn-primary" value="Salvar" />
      </form>
    )
  }

  render() {
    const { errors } = this.state

    return (
      <div className="user-edit-user">
        <div className="container">
          <div className="breadcrumb">
            <span>Você está em:</span>
            <Link to="/parameters" className="breadcrumb-link">
              Parâmetros
            </Link>
            <i class="fas fa-greater-than"></i>
            <Link to="/users" className="breadcrumb-link">
              Usuários
            </Link>
            <i class="fas fa-greater-than"></i>
            <Link to={`/users/${this.props.match.params.id}`} className="breadcrumb-link">
              Usuário X
            </Link>
            <i class="fas fa-greater-than"></i>
            <span>Editar dados de acesso</span>
          </div>

          <div className="form-container" id="main">
            <h1>Editar dados de acesso</h1>
            {this.renderEditUser(errors)}
          </div>
        </div>
      </div>
    )
  }
}

UserEditUser.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  userStore: state.userStore,
  errors: state.errorStore
})

export default connect(mapStateToProps, { getUser, updateUser, clearErrors })(withRouter(UserEditUser))
