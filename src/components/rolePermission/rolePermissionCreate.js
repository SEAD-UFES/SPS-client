import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import SelectListGroup from 'components/common/SelectListGroup'
import { isEmpty, validateName } from 'validation'
import { validateRolePermissionForm } from './validateRolePermissionForm'

import { getRoleTypes } from '../roleType/roleTypeActions'
import { getPermissions } from 'components/permission/permissionActions'
import { createRolePermission } from 'components/rolePermission/rolePermissionActions'
import { comparePermissionByName } from 'utils/compareBy'

class rolePermissionCreate extends Component {
  constructor() {
    super()
    this.state = {
      roleType_id: '',
      permissionType_id: '',

      roleType: {},
      errors: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  UNSAFE_componentWillMount() {
    //define roleType_id
    if (this.props.location.state && this.props.location.state.roleType) {
      this.setState({
        roleType_id: this.props.location.state.roleType.id,
        roleType: this.props.location.state.roleType
      })
    } else if (this.props.match.params.roletype_id) {
      this.setState({ roleType_id: this.props.match.params.roletype_id })
    }
  }

  componentDidMount() {
    if (!(this.props.location.state && this.props.location.state.roleType)) {
      this.props.getRoleTypes()
    }
    this.props.getPermissions()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //Errors
    if (nextProps.errors) {
      let errors = nextProps.errors
      this.setState({ errors: errors })
    }
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }

    switch (e.target.name) {
      case 'roleType_id':
        valResult = validateName(e.target.value)
        break
      case 'permissionType_id':
        valResult = validateName(e.target.value)
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

    const rolePermissionData = {
      roleType_id: this.state.roleType_id,
      permission_id: this.state.permissionType_id
    }

    const valRoleType = validateRolePermissionForm(rolePermissionData)
    if (!valRoleType.isValid) {
      this.setState({ errors: valRoleType.errors })
    } else {
      this.props.createRolePermission(rolePermissionData, () => {
        this.props.history.push(`/parameters/roletypes/${this.state.roleType_id}`)
      })
    }
  }

  render() {
    const { errors } = this.state
    const permissions = this.props.permissionStore.permissions
    const roleTypes = !isEmpty(this.state.roleType) ? [this.state.roleType] : this.props.roleTypeStore.roleTypes

    const roleTypeOptions = [{ label: '* Selecione a papel', value: '' }].concat(
      roleTypes
        ? roleTypes.map(roleType => {
            return {
              label: roleType.name,
              value: roleType.id
            }
          })
        : []
    )

    const permissionOptions = [{ label: '* Selecione a papel', value: '' }].concat(
      permissions
        ? permissions.sort(comparePermissionByName).map(permission => {
            return {
              label: permission.name,
              value: permission.id
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

    const permAssigForm = (
      <form noValidate onSubmit={this.onSubmit}>
        <div className="form-group">
          <SelectListGroup
            placeholder="* Selecione o usuário"
            name="roleType_id"
            value={this.state.roleType_id}
            options={roleTypeOptions}
            onChange={this.onChange}
            error={errors.roleType_id}
            disabled={this.state.roleType ? true : false}
          />

          <SelectListGroup
            placeholder="* Selecione o papel"
            name="permissionType_id"
            value={this.state.permissionType_id}
            options={permissionOptions}
            onChange={this.onChange}
            error={errors.permissionType_id}
          />

          <input type="submit" className="btn btn-primary btn-block mt-4" />
        </div>
      </form>
    )

    return (
      <div className="rolePermission-create">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/parameters/roletypes/${this.props.match.params.roletype_id}`} className="btn btn-light">
                Voltar para tipo de papel
              </Link>
              <h1 className="display-4 text-center">Criar atribuição de permissão</h1>
              <p className="lead text-center">Dê entrada nos dados básicos</p>

              {alertsList}
              {permAssigForm}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

rolePermissionCreate.propTypes = {
  getRoleTypes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  roleTypeStore: state.roleTypeStore,
  permissionStore: state.permissionStore
})

export default connect(mapStateToProps, {
  getRoleTypes,
  getPermissions,
  createRolePermission
})(rolePermissionCreate)
