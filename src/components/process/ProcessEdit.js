/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import CheckBoxFieldGroup from 'components/common/CheckBoxFieldGroup'
import { isEmpty, validateProcessNumber, validateYearRequired, validateDescription, validateId } from '../../validation'
import { validateProcessForm } from './validateProcessForm'
import { clearErrors } from '../../actions/errorActions'
import { getProcess, updateProcess } from './processActions'
import { getCourses } from '../course/courseActions'
import AlertError from 'components/common/AlertError'

class ProcessEdit extends Component {
  constructor() {
    super()
    this.state = {
      number: '',
      year: '',
      course_id: '',
      description: '',
      visible: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    if (this.props.match.params.id) {
      this.props.getProcess(this.props.match.params.id)
    }

    this.props.getCourses()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //Tratando errors
    if (
      nextProps.errorStore &&
      nextProps.errorStore.data &&
      nextProps.errorStore.data.devMessage &&
      nextProps.errorStore.data.devMessage.errors
    ) {
      let errors = nextProps.errorStore.data.devMessage.errors
      this.setState({ errors: errors })
    }

    //(Preenchendo / Atualizando) dados do formulario
    if (isEmpty(nextProps.errorStore) && nextProps.processStore.process) {
      const process = nextProps.processStore.process
      this.setState({
        number: process.number,
        year: process.year,
        course_id: process.course_id,
        description: process.description,
        visible: process.visible
      })
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }
    switch (e.target.name) {
      case 'number':
        valResult = validateProcessNumber(e.target.value)
        break
      case 'year':
        valResult = validateYearRequired(e.target.value)
        break
      case 'course_id':
        valResult = validateId(e.target.value)
        break
      case 'description':
        valResult = validateDescription(e.target.value)
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
    let errors = this.state.errors
    switch (e.target.name) {
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

    const processData = {
      number: this.state.number,
      year: this.state.year,
      course_id: this.state.course_id,
      description: this.state.description,
      visible: this.state.visible
    }

    const valProcess = validateProcessForm(processData)
    if (!valProcess.isValid) {
      this.setState({ errors: valProcess.errors })
    } else {
      this.props.updateProcess(this.props.match.params.id, processData, this.props.history)
    }
  }

  renderForm(state, errors, courseOptions) {
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <div className='form-lateral'>
          <TextFieldGroup
            type='text'
            name='number'
            label='Número'
            value={this.state.number}
            onChange={this.onChange}
            error={errors.number}
          />

          <TextFieldGroup
            type='text'
            name='year'
            label='Ano'
            value={this.state.year}
            onChange={this.onChange}
            error={errors.year}
          />
        </div>

        <SelectListGroup
          placeholder=''
          name='course_id'
          label='Curso'
          value={this.state.course_id}
          options={courseOptions}
          onChange={this.onChange}
          error={errors.course_id}
        />

        <TextAreaFieldGroup
          placeholder='* Descrição'
          name='description'
          label='Descrição'
          value={this.state.description}
          onChange={this.onChange}
          error={errors.description}
          info='Apresentação básica do processo seletivo'
        />

        <CheckBoxFieldGroup
          id='visible-checkbox'
          name='visible'
          text='Visibilidade'
          value='Tornar processo visível'
          checked={this.state.visible}
          error={errors.visible}
          onChange={this.onCheck}
        />

        <input type='submit' className='btn btn-primary' title='Atualizar processo seletivo' value='Atualizar' />
      </form>
    )
  }

  render() {
    const { errors } = this.state
    const { courseStore } = this.props

    const courseOptions = [{ label: 'Escolha o curso', value: '' }].concat(
      courseStore.courses
        ? courseStore.courses.map(course => {
            return {
              label: course.name,
              value: course.id
            }
          })
        : []
    )

    return (
      <div className='process-edit'>
        <div className='container'>
          <div className='breadcrumb'>
            <span>Você está em:</span>
            <Link to='/processes' className='breadcrumb-link'>
              Processos Seletivos
            </Link>
            <i className='fas fa-greater-than' />
            <Link to={`/processes/read/${this.props.match.params.id}`} className='breadcrumb-link'>
              {this.props.processStore.process
                ? `Edital ${this.props.processStore.process.number}/${this.props.processStore.process.year}`
                : 'Edital 000/0000'}
            </Link>
            <i className='fas fa-greater-than' />
            <span>Atualizar</span>
          </div>

          <div className='form-container' id='main'>
            <h1>Atualizar processo</h1>
            <AlertError errors={this.props.errorStore} />
            {this.renderForm(this.state, errors, courseOptions)}
          </div>
        </div>
      </div>
    )
  }
}

// "registerUser" and "auth" are required to the Register component
ProcessEdit.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  getProcess: PropTypes.func.isRequired,
  updateProcess: PropTypes.func.isRequired,
  errorStore: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  errorStore: state.errorStore,
  processStore: state.processStore,
  courseStore: state.courseStore
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { clearErrors, getProcess, updateProcess, getCourses }
)(withRouter(ProcessEdit))
