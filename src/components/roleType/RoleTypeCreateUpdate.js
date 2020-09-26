/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import TextFieldGroup from 'components/common/TextFieldGroup'
import TextAreaFieldGroup from 'components/common/TextAreaFieldGroup'
import CheckBoxFieldGroup from 'components/common/CheckBoxFieldGroup'

import { validateName } from 'validation/'
import { validateRoleTypeForm } from './validateRoleTypeForm'

import { createRoleType, getRoleType, updateRoleType } from './roleTypeActions'

class RoleTypeCreateUpdate extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      name: '',
      description: '',
      global: false,
      errors: [],
      mode: 'create'
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  UNSAFE_componentWillMount() {
    if (this.props.match.params.roletype_id) {
      this.setState({ mode: 'update' })
    }
  }

  componentDidMount() {
    if (this.props.match.params.roletype_id) {
      this.props.getRoleType(this.props.match.params.roletype_id)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //errors
    if (nextProps.errors) {
      let errors = nextProps.errors
      this.setState({ errors: errors })
    }

    //Load data on form
    if (nextProps.roleTypeStore.roleType !== null) {
      const roleType = nextProps.roleTypeStore.roleType
      this.setState({
        id: roleType.id,
        name: roleType.name,
        global: roleType.global,
        description: roleType.description
      })
    }
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }
    switch (e.target.name) {
      case 'name':
        valResult = validateName(e.target.value)
        break
      case 'description':
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

  onCheck(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  onSubmit(e) {
    e.preventDefault()

    let roleTypeData = {
      name: this.state.name,
      global: this.state.global,
      description: this.state.description
    }

    //Só incluo o id se ele não for nulo.
    if (this.state.id) roleTypeData.id = this.state.id

    const valRoleType = validateRoleTypeForm(roleTypeData)
    if (!valRoleType.isValid) {
      this.setState({ errors: valRoleType.errors })
    } else {
      if (this.state.mode === 'create') {
        this.props.createRoleType(roleTypeData, roletype_id => {
          this.props.history.push(`/parameters/roletypes/${roletype_id}`)
        })
      } else {
        this.props.updateRoleType(roleTypeData, roletype_id => {
          this.props.history.push(`/parameters/roletypes/${roletype_id}`)
        })
      }
    }
  }

  render() {
    const { errors } = this.state

    const alertsList = (
      <div>
        {errors.serverError ? (
          <div className='alert alert-danger' role='alert'>
            <strong>Erro!</strong> Erro do servidor
          </div>
        ) : (
          ''
        )}
        {errors.anotherError ? (
          <div className='alert alert-danger' role='alert'>
            <strong>Erro!</strong> Erro desconhecido
          </div>
        ) : (
          ''
        )}
      </div>
    )

    const roletypeForm = (
      <form noValidate onSubmit={this.onSubmit}>
        <TextFieldGroup
          type='text'
          name='name'
          label='Nome'
          value={this.state.name}
          onChange={this.onChange}
          error={errors.name}
        />

        <TextAreaFieldGroup
          type='text'
          name='description'
          label='Descrição'
          value={this.state.description}
          onChange={this.onChange}
          error={errors.description}
        />

        <CheckBoxFieldGroup
          id='global'
          name='global'
          value='Papel global'
          checked={this.state.global}
          onChange={this.onCheck}
        />

        <input type='submit' className='btn btn-primary' value='Salvar' />
      </form>
    )

    return (
      <div className='roletypes-create'>
        <div className='container'>
          <div className='breadcrumb'>
            <span>Você está em:</span>
            <Link to='/parameters' className='breadcrumb-link'>
              Parâmetros
            </Link>
            <i className='fas fa-greater-than' />
            <Link to='/parameters/roletypes' className='breadcrumb-link'>
              Tipos de papel
            </Link>
            <i className='fas fa-greater-than' />
            <span>{this.state.mode === 'create' ? 'Novo tipo de papel' : 'Editar tipo de papel'}</span>
          </div>

          <div className='form-container' id='main'>
            <h1>{this.state.mode === 'create' ? 'Novo tipo de papel' : 'Editar tipo de papel'}</h1>
            {/* <p className="lead text-center">
              {this.state.mode === 'create' ? 'Dê entrada nos dados básicos' : 'Altere os dados básicos'}
            </p> */}

            {alertsList}
            {roletypeForm}
          </div>
        </div>
      </div>
    )
  }
}

RoleTypeCreateUpdate.propTypes = {
  createRoleType: PropTypes.func.isRequired,
  getRoleType: PropTypes.func.isRequired,
  updateRoleType: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  roleTypeStore: state.roleTypeStore
})

export default connect(
  mapStateToProps,
  {
    createRoleType,
    getRoleType,
    updateRoleType
  }
)(RoleTypeCreateUpdate)
