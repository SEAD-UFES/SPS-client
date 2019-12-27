import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { spsServerUrl } from 'apis/spsServer'
import TextFieldGroup from 'components/common/TextFieldGroup'
import SelectListGroup from 'components/common/SelectListGroup'
import TextAreaFieldGroup from 'components/common/TextAreaFieldGroup'
import CheckBoxFieldGroup from 'components/common/CheckBoxFieldGroup'

import { getProcess } from 'components/process/processActions'
import { getPublicationTypes } from 'components/publicationType/publicationTypeActions'
import { getPublication, updatePublication } from 'components/publication/publicationActions'

import { validateDateRequired, validateName } from 'validation'
import { validatePublicationForm } from './validatePublicationForm'
import AlertError from 'components/common/AlertError'
// import TextAreaFieldTinyMCE from 'components/common/TextAreaFieldTinyMCE'

class PublicationUpdate extends Component {
  constructor() {
    super()

    this.state = {
      id: '',
      creation_date: '',
      selectiveProcess_id: '',
      call_id: '',
      step_id: '',
      title: '',
      publicationType_id: '',
      description: '',
      valid: true,

      fileName: '',

      file: null,
      fileUrl: null,

      selectiveProcess: '',
      lock_process: false,
      lock_call: false,

      errors: []
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  UNSAFE_componentWillMount() {
    //handling process on state
    if (this.props.location.state && this.props.location.state.selectiveProcess) {
      this.setState({
        selectiveProcess_id: this.props.location.state.selectiveProcess.id,
        selectiveProcess: this.props.location.state.selectiveProcess,
        lock_process: true
      })
    } else {
      if (this.props.match.params.process_id) {
        this.setState({
          selectiveProcess_id: this.props.match.params.process_id,
          lock_process: true
        })
        this.props.getProcess(this.props.match.params.process_id)
      }
      if (this.props.match.params.call_id) {
        this.setState({
          call_id: this.props.match.params.call_id,
          lock_call: true
        })
      }
    }

    //handling publication on state. Else load
    if (this.props.location.state && this.props.location.state.publication) {
      this.setState({
        id: this.props.location.state.publication.id,
        creation_date: moment(this.props.location.state.publication.date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
        selectiveProcess_id: this.props.location.state.publication.selectiveProcess_id,
        call_id: this.props.location.state.publication.call_id ? this.props.location.state.publication.call_id : '',
        step_id: this.props.location.state.publication.step_id ? this.props.location.state.publication.step_id : '',
        title: this.props.location.state.publication.title,
        publicationType_id: this.props.location.state.publication.publicationType_id
          ? this.props.location.state.publication.publicationType_id
          : '',
        description: this.props.location.state.publication.description
          ? this.props.location.state.publication.description
          : '',
        valid: this.props.location.state.publication.valid,
        fileName: this.props.location.state.publication.file
      })
    } else {
      if (this.props.match.params.publication_id) {
        this.props.getPublication(this.props.match.params.publication_id)
      }
    }
  }

  componentDidMount() {
    this.props.getPublicationTypes()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //Errors
    if (nextProps.errors) {
      let errors = nextProps.errors
      this.setState({ errors: errors })
    }

    //Load process on State if dont have
    if (!this.state.selectiveProcess) {
      if (nextProps.process) {
        const process = nextProps.process.process
        const loading = nextProps.process.loading

        if (process !== null && loading === false) {
          this.setState({
            selectiveProcess_id: process.id,
            selectiveProcess: process
          })
        }
      }
    }

    //load publication on state if needed.
    if (!(this.props.location.state && this.props.location.state.publication)) {
      if (nextProps.publicationStore) {
        const publication = nextProps.publicationStore.publication
        const loading = nextProps.publicationStore.loading
        if (publication !== null && loading === false) {
          this.setState({
            id: publication.id,
            creation_date: moment(publication.date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
            selectiveProcess_id: publication.selectiveProcess_id,
            call_id: publication.call_id ? publication.call_id : '',
            step_id: publication.step_id ? publication.step_id : '',
            title: publication.title,
            publicationType_id: publication.publicationType_id ? publication.publicationType_id : '',
            description: publication.description ? publication.description : '',
            valid: publication.valid,
            fileName: publication.file
          })
        }
      }
    }
  }

  onCheck(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }

    switch (e.target.name) {
      case 'creation_date':
        valResult = validateDateRequired(e.target.value)
        break
      case 'selectiveProcess_id':
        valResult = validateName(e.target.value)
        break
      case 'publicationType_id':
        valResult = validateName(e.target.value)
        break
      case 'title':
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

  onChange_TinyMCE = event => {
    const value = event.target.getContent()
    let errors = this.state.errors

    this.setState({ description: value, errors: errors })
  }

  onSubmit(e) {
    e.preventDefault()

    let publicationData = {
      id: this.state.id,
      date: this.state.creation_date,
      selectiveProcess_id: this.state.selectiveProcess_id,
      call_id: this.state.call_id ? this.state.call_id : null,
      step_id: this.state.step_id ? this.state.step_id : null,
      title: this.state.title,
      description: this.state.description ? this.state.description : null,
      publicationType_id: this.state.publicationType_id,
      file: this.state.file,
      valid: this.state.valid
    }

    const valRoleType = validatePublicationForm(publicationData, { verifyFile: false })
    if (!valRoleType.isValid) {
      this.setState({ errors: valRoleType.errors })
    } else {
      delete publicationData.file
      publicationData.date = moment(publicationData.date, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 00:00:00'
      this.props.updatePublication(publicationData, () => {
        this.props.history.push(`/processes/${this.state.selectiveProcess_id}`)
      })
    }
  }

  renderForm(errors, processOptions, callOptions, stepOptions, processPublicationTypeOptions) {
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <TextFieldGroup
          type="date"
          name="creation_date"
          label="Data"
          placeholder="__/__/__"
          value={this.state.creation_date}
          onChange={this.onChange}
          error={errors.creation_date}
        />

        <TextFieldGroup
          type="title"
          name="title"
          label="Título"
          placeholder="Título da publicação"
          value={this.state.title}
          onChange={this.onChange}
          error={errors.title}
        />

        <div className="form-group row">
          <label className="col-lg-2 col-form-label form-control-label font-weight-bold">Arquivo</label>
          <div className="col-lg-10">
            <div className="mt-2">
              <a className="" href={`${spsServerUrl}/v1/publications/download/${this.state.fileName}`}>
                <i className="fas fa-file" /> {this.state.fileName}
              </a>
            </div>
          </div>
        </div>

        <div className="form-spacing">
          <SelectListGroup
            placeholder="Selecione o processo seletivo"
            name="selectiveProcess_id"
            label="Processo"
            value={this.state.selectiveProcess_id}
            options={processOptions}
            onChange={this.onChange}
            error={errors.selectiveProcess_id}
            disabled={this.state.lock_process ? true : false}
          />

          <SelectListGroup
            placeholder="Selecione o tipo de publicação"
            name="publicationType_id"
            label="Tipo"
            value={this.state.publicationType_id}
            options={processPublicationTypeOptions}
            onChange={this.onChange}
            error={errors.publicationType_id}
          />

          <CheckBoxFieldGroup
            id="valid-checkbox"
            name="valid"
            text="Validade"
            value="Este documento é a versão mais recente de seu tipo."
            checked={this.state.valid}
            error={errors.valid}
            info="Documentos mais antigos devem ser atualizados manualmente."
            onChange={this.onCheck}
          />

          {this.state.selectiveProcess_id ? (
            <SelectListGroup
              placeholder="Selecione a chamada"
              name="call_id"
              label="Chamada"
              value={this.state.call_id}
              options={callOptions}
              onChange={this.onChange}
              error={errors.call_id}
              disabled={this.state.lock_call ? true : false}
            />
          ) : (
            ''
          )}

          {this.state.call_id ? (
            <SelectListGroup
              placeholder="Selecione a etapa"
              name="step_id"
              label="Etapa"
              value={this.state.step_id}
              options={stepOptions}
              onChange={this.onChange}
              error={errors.step_id}
            />
          ) : (
            ''
          )}

          <TextAreaFieldGroup
            type="text"
            name="description"
            label="Observações"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
            info="Corpo da mensagem da publicação, se houver"
          />

          {/* <TextAreaFieldTinyMCE
              placeholder="Conteúdo"
              name="description"
              label="Observações:"
              value={this.state.description}
              onChange={this.onChange_TinyMCE}
              error={errors.description}
              info="corpo da mensagem da publicação, se houver."
            /> */}
        </div>

        <input type="submit" className="btn btn-primary" value="Salvar" />
      </form>
    )
  }

  render() {
    //load raw data
    const { errors, selectiveProcess } = this.state
    const process_id = this.props.match.params.process_id
    const { publicationTypeStore } = this.props

    //mounting data structures
    const publicationTypes =
      publicationTypeStore.publicationTypes !== null && !publicationTypeStore.loading
        ? publicationTypeStore.publicationTypes
        : []

    const processes = selectiveProcess ? [selectiveProcess] : []

    const calls = selectiveProcess ? selectiveProcess.Calls : []

    const steps =
      selectiveProcess && this.state.call_id
        ? selectiveProcess.Calls.filter(item => {
            return item.id === this.state.call_id
          })[0].Steps
        : []

    //mounting render pieces

    const processPublicationTypeOptions = [{ label: 'Selecione o tipo de publicação', value: '' }].concat(
      publicationTypes
        ? publicationTypes.map(procPubTypes => {
            return {
              label: procPubTypes.name,
              value: procPubTypes.id
            }
          })
        : []
    )

    const processOptions = [{ label: 'Selecione o processo seletivo', value: '' }].concat(
      processes
        ? processes.map(process => {
            return {
              label: `${process.number}/${process.year} - ${process.Course.name}`,
              value: process.id
            }
          })
        : []
    )

    const callOptions = [{ label: 'Selecione a chamada', value: '' }].concat(
      calls
        ? calls.map(call => {
            return {
              label: `Chamada ${call.number}`,
              value: `${call.id}`
            }
          })
        : []
    )

    const stepOptions = [{ label: 'Selecione a etapa', value: '' }].concat(
      steps
        ? steps.map(step => {
            return {
              label: `Etapa ${step.number} | ${step.StepType.name}`,
              value: `${step.id}`
            }
          })
        : []
    )

    return (
      <div className="publication-update">
        <div className="container">
          <div className="breadcrumb">
            <span>Você está em:</span>
            <Link to="/processes" className="breadcrumb-link">
              Processos Seletivos
            </Link>
            <i className="fas fa-greater-than"></i>
            <Link to={`/processes/${process_id}`} className="breadcrumb-link">
              {this.state.selectiveProcess
                ? `Edital ${this.state.selectiveProcess.number}/${this.state.selectiveProcess.year}`
                : 'Edital 000/0000'}
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>Editar publicação</span>
          </div>

          <div className="form-container" id="main">
            <h1>Editar publicação</h1>
            <AlertError errors={this.props.errorStore} />
            {this.renderForm(errors, processOptions, callOptions, stepOptions, processPublicationTypeOptions)}
          </div>
        </div>
      </div>
    )
  }
}

PublicationUpdate.proptypes = {
  getProcess: PropTypes.func.isRequired,
  getPublicationTypes: PropTypes.func.isRequired,
  getPublication: PropTypes.func.isRequired,
  updatePublication: PropTypes.func.isRequired,
  errorStore: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  process: state.processStore,
  publicationTypeStore: state.publicationTypeStore,
  publicationStore: state.publicationStore,
  errorStore: state.errorStore
})

export default connect(mapStateToProps, {
  getPublicationTypes,
  getProcess,
  getPublication,
  updatePublication
})(PublicationUpdate)
