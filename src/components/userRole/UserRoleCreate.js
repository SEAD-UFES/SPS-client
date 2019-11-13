import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import SelectListGroup from 'components/common/SelectListGroup'
import { isEmpty } from 'validation'

import { validateName } from 'validation/'
import { validateUserRoleForm } from './validateUserRoleForm'

import { createUserRole } from './userRoleActions'
import { getUsersMinimal } from 'components/user/userActions'
import { getRoleTypes } from 'components/roleType/roleTypeActions'
import { getCourses } from 'components/course/courseActions'

class UserRoleCreate extends Component {
  constructor() {
    super()
    this.state = {
      user_id: '',
      roleType_id: '',
      global: false,
      course_id: '',
      errors: []
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getUsersMinimal()
    this.props.getRoleTypes()
    this.props.getCourses()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //errors
    if (nextProps.errors) {
      let errors = nextProps.errors
      this.setState({ errors: errors })
    }
  }

  setGlobal(roleType_id) {
    const { roleTypes } = this.props.roleTypeStore
    if (roleTypes) {
      const roleType_found = roleTypes.find(rt => {
        return rt.id === roleType_id
      })
      if (roleType_found && roleType_found.global) {
        this.setState({ global: true, course_id: '' })
      } else {
        this.setState({ global: false })
      }
    }
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }
    switch (e.target.name) {
      case 'user_id':
        valResult = validateName(e.target.value)
        break
      case 'roleType_id':
        valResult = validateName(e.target.value)
        this.setGlobal(e.target.value)
        break
      case 'course_id':
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

  onCheck(e) {}

  onSubmit(e) {
    e.preventDefault()

    const userRoleData = {
      user_id: this.state.user_id,
      roleType_id: this.state.roleType_id,
      course_id: !isEmpty(this.state.course_id) ? this.state.course_id : null
    }

    const valUserRole = validateUserRoleForm(userRoleData)
    if (!valUserRole.isValid) {
      this.setState({ errors: valUserRole.errors })
    } else {
      this.props.createUserRole(userRoleData, () => {
        this.props.history.goBack()
      })
    }
  }

  render() {
    const { errors } = this.state
    const users = this.props.userStore.usersMinimal
    const { roleTypes } = this.props.roleTypeStore
    const { courses } = this.props.courseStore

    const userOptions = [{ label: '* Selecione o usuário', value: '' }].concat(
      users
        ? users.map(user => {
            return {
              label: user.login,
              value: user.id
            }
          })
        : []
    )

    const roleTypeOptions = [{ label: '* Selecione a papel', value: '' }].concat(
      roleTypes
        ? roleTypes.map(roleType => {
            return {
              label: `${roleType.name}${roleType.global ? ` - Global` : ``}`,
              value: roleType.id
            }
          })
        : []
    )

    const courseOptions = [{ label: 'Selecione o curso (opcional)', value: '' }].concat(
      courses
        ? courses.map(course => {
            return {
              label: course.name,
              value: course.id
            }
          })
        : []
    )

    const alertsList = (
      <div>
        {errors.serverError ? (
          <div class="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro do servidor
          </div>
        ) : (
          ''
        )}
        {errors.anotherError ? (
          <div class="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro desconhecido
          </div>
        ) : (
          ''
        )}
      </div>
    )

    const userroleForm = (
      <form noValidate onSubmit={this.onSubmit}>
        <div className="form-group">
          <SelectListGroup
            placeholder="* Selecione o usuário"
            name="user_id"
            value={this.state.user_id}
            options={userOptions}
            onChange={this.onChange}
            error={errors.user_id}
          />

          <SelectListGroup
            placeholder="* Selecione o papel"
            name="roleType_id"
            value={this.state.roleType_id}
            options={roleTypeOptions}
            onChange={this.onChange}
            error={errors.roleType_id}
          />

          {!this.state.global ? (
            <SelectListGroup
              placeholder="* Selecione o curso"
              name="course_id"
              value={this.state.course_id}
              options={courseOptions}
              onChange={this.onChange}
              error={errors.course_id}
            />
          ) : null}

          <input type="submit" className="btn btn-primary btn-block mt-4" />
        </div>
      </form>
    )

    return (
      <div className="userRole-create">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/parameters/roleassignments" className="btn btn-light">
                Voltar para lista de atribuições de papel
              </Link>
              <h1 className="display-4 text-center">Criar atribuição de papel</h1>
              <p className="lead text-center">Dê entrada nos dados básicos</p>

              {alertsList}
              {userroleForm}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UserRoleCreate.propTypes = {
  createUserRole: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userRoleStore: state.userRoleStore,
  userStore: state.userStore,
  roleTypeStore: state.roleTypeStore,
  courseStore: state.courseStore
})

export default connect(mapStateToProps, {
  createUserRole,
  getUsersMinimal,
  getRoleTypes,
  getCourses
})(UserRoleCreate)
