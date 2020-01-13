/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import { validateProcessNumber, validateYearRequired, validateDescription, validateId } from '../../validation'
import { validateProcessForm } from './validateProcessForm'
import { createProcess } from './processActions'
import { getCourses } from '../course/courseActions'
import { clearErrors } from '../../actions/errorActions'
import CheckBoxFieldGroup from 'components/common/CheckBoxFieldGroup'
import AlertError from 'components/common/AlertError'

class ProcessCreate extends Component {
  constructor() {
    super()
    this.state = {
      number: '',
      year: new Date().getFullYear().toString(),
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
    this.props.getCourses()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errorStore) {
      let errors = nextProps.errorStore
      this.setState({ errors: errors })
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
      this.props.createProcess(processData, this.props.history)
    }
  }

  renderForm(state, errors, courseOptions) {
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <div className="form-lateral">
          <TextFieldGroup
            type="text"
            name="number"
            label="Número"
            value={this.state.number}
            onChange={this.onChange}
            error={errors.number}
          />

          <TextFieldGroup
            type="text"
            name="year"
            label="Ano"
            value={this.state.year}
            onChange={this.onChange}
            error={errors.year}
          />
        </div>

        <SelectListGroup
          placeholder=""
          name="course_id"
          label="Curso"
          value={this.state.course_id}
          options={courseOptions}
          onChange={this.onChange}
          error={errors.course_id}
        />

        <TextAreaFieldGroup
          name="description"
          label="Descrição"
          value={this.state.description}
          onChange={this.onChange}
          error={errors.description}
          info="Apresentação básica do processo seletivo"
        />

        <CheckBoxFieldGroup
          id="visible-checkbox"
          name="visible"
          text="Visibilidade"
          value="Tornar processo visível"
          checked={this.state.visible}
          error={errors.visible}
          onChange={this.onCheck}
        />

        <input type="submit" className="btn btn-primary" value="Cadastrar" />
      </form>
    )
  }

  render() {
    const { courseStore } = this.props
    const { errors } = this.state

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
      <div className="register">
        <div className="container">
          <div className="breadcrumb">
            <span>Você está em:</span>
            <Link to="/processes" className="breadcrumb-link">
              Processos Seletivos
            </Link>
            <i className="fas fa-greater-than" />
            <span>Novo processo</span>
          </div>

          <div className="form-container" id="main">
            <h1>Novo processo</h1>
            <AlertError errors={this.props.errorStore} />
            {this.renderForm(this.state, errors, courseOptions)}
          </div>
        </div>
      </div>
    )
  }
}

// "registerUser" and "auth" are required to the Register component
ProcessCreate.proptypes = {
  createProcess: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  errorStore: PropTypes.object.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  courseStore: state.courseStore,
  errorStore: state.errorStore
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { createProcess, getCourses, clearErrors }
)(withRouter(ProcessCreate))
