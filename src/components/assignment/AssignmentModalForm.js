import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextFieldGroup from '../common/TextFieldGroup'
import TextFieldAreaGroup from '../common/TextAreaFieldGroup'
import { isEmpty, validateName } from '../../validation'
import { validateAssignmentForm } from './validateAssignmentForm'
import { clearErrors } from '../../actions/errorActions'

class AssignmentModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //component options
      mode: this.props.mode ? this.props.mode : 'add',

      //item data
      id: this.props.item ? this.props.item.id : null,
      name: this.props.item ? this.props.item.name : '',
      description: this.props.item ? (this.props.item.description ? this.props.item.description : '') : '',
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

  onSubmit() {
    //building assignment
    const assignmentData = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description
    }

    //Form validation:
    const valAssignment = validateAssignmentForm(assignmentData)
    if (!valAssignment.isValid) {
      this.setState({ errors: valAssignment.errors })
    } else {
      //if add stance
      if (this.state.mode === 'add') {
        this.props.addFunction(assignmentData, () => {
          window.$(`#${this.props.targetName}`).modal('hide')
          this.setState({ name: '', description: '' })
          this.props.reloadFunction()
        })
      }

      //if edit stance
      if (this.state.mode === 'edit') {
        this.props.editFunction(assignmentData, () => {
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
      description: this.props.item ? (this.props.item.description ? this.props.item.description : '') : '',
      //errors
      errors: []
    })
    this.props.clearErrors()
  }

  render() {
    const { errors } = this.state
    return (
      <div
        className="modal fade"
        id={this.props.targetName}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={`${this.props.targetName}-ModalLabel`}
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${this.props.targetName}-ModalLabel`}>
                {this.props.mode === 'edit' ? 'Editar atribuição' : 'Adicionar atribuição'}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="">
                <div className="">
                  <div className="form-group">
                    <TextFieldGroup
                      type="text"
                      name="name"
                      label="Nome"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />

                    <TextFieldAreaGroup
                      type="text"
                      name="description"
                      label="Descrição"
                      value={this.state.description}
                      onChange={this.onChange}
                      error={errors.description}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <input
                type="submit"
                className="btn btn-primary"
                onClick={this.onSubmit}
                value={this.props.mode === 'edit' ? 'Atualizar' : 'Adicionar'}
              />

              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AssignmentModalForm.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errorStore
})

export default connect(mapStateToProps, { clearErrors })(AssignmentModalForm)
