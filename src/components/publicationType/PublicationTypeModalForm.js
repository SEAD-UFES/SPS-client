/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextFieldGroup from '../common/TextFieldGroup'
import { isEmpty, validateName } from '../../validation'
import { validatePublicationTypeForm } from './validatePublicationTypeForm'
import { clearErrors } from '../../actions/errorActions'

class PublicationTypeModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //component options
      mode: this.props.mode ? this.props.mode : 'add',

      //item data
      id: this.props.item ? this.props.item.id : null,
      name: this.props.item ? this.props.item.name : '',
      //errors
      errors: []
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  componentDidMount() {
    window.$(`#${this.props.targetName}`).on('hidden.bs.modal', this.resetState)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //error management
    if (!isEmpty(nextProps.errors)) {
      let newErrors = []
      switch (nextProps.errors.code) {
        case 'assignments-02':
          newErrors = {}
          if (nextProps.errors.devMessage.name === 'SequelizeUniqueConstraintError') {
            if (nextProps.errors.devMessage.errors[0].message === 'name must be unique') {
              newErrors.name = 'Já existe uma curso com esse nome.'
              this.setState({ errors: newErrors })
            }
          }
          break
        default:
          return null
      }
    } else {
      this.setState({ errors: [] })
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

  onSubmit() {
    //building assignment
    let publicationTypeData = {
      id: this.state.id,
      name: this.state.name
    }

    //Form validation:
    const valAssignment = validatePublicationTypeForm(publicationTypeData)
    if (!valAssignment.isValid) {
      this.setState({ errors: valAssignment.errors })
    } else {
      //if add stance
      if (this.state.mode === 'add') {
        delete publicationTypeData.id
        this.props.addFunction(publicationTypeData, () => {
          window.$(`#${this.props.targetName}`).modal('hide')
          this.setState({ name: '' })
          this.props.reloadFunction()
        })
      }

      //if edit stance
      if (this.state.mode === 'edit') {
        this.props.editFunction(publicationTypeData, () => {
          window.$(`#${this.props.targetName}`).modal('hide')
          this.props.reloadFunction()
        })
      }
    }
  }

  resetState() {
    this.setState({
      id: this.props.item ? this.props.item.id : null,
      name: this.props.item ? this.props.item.name : '',
      //errors
      errors: []
    })
    this.props.clearErrors()
  }

  render() {
    const { errors } = this.state
    return (
      <div
        className='modal fade'
        id={this.props.targetName}
        tabIndex='-1'
        role='dialog'
        aria-labelledby={`${this.props.targetName}-ModalLabel`}
        aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id={`${this.props.targetName}-ModalLabel`}>
                {this.props.mode === 'edit' ? 'Atualizar tipo de publicação' : 'Adicionar tipo de publicação'}
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form className=''>
                <div className=''>
                  <div className='form-group'>
                    <TextFieldGroup
                      type='text'
                      name='name'
                      label='Nome'
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <input
                type='submit'
                className='btn btn-primary'
                onClick={this.onSubmit}
                value={this.props.mode === 'edit' ? 'Atualizar' : 'Adicionar'}
              />

              <button type='button' className='btn btn-secondary' data-dismiss='modal'>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PublicationTypeModalForm.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errorStore
})

export default connect(
  mapStateToProps,
  { clearErrors }
)(PublicationTypeModalForm)
