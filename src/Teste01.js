import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextFieldGroup from 'components/common/TextFieldGroup'
import TextAreaFieldGroup from 'components/common/TextAreaFieldGroup'

import CheckBoxFieldGroup from 'components/common/CheckBoxFieldGroup'
import { validateNoticeForm, validateTitle, validateContent } from 'components/notice/validateNoticeForm'
import AlertError from 'components/common/AlertError'
import { createNotice } from 'components/notice/noticeActions'
import { clearErrors } from 'actions/errorActions'

import TextAreaFieldCKEditor4 from 'components/common/TextAreaFieldCKEditor4'
import TextAreaFieldTinyMCE from 'components/common/TextAreaFieldTinyMCE'

class Teste extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      content: '',
      visible: false,
      override: false,
      //errors
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.props.clearErrors()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //If receive errors from server
    if (nextProps.errorStore) {
      let errorStore = nextProps.errorStore
      if (errorStore.code === 'notices-01' && errorStore.data && errorStore.data.devMessage) {
        this.setState({ errors: errorStore.data.devMessage.errors })
      }
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }
    switch (e.target.name) {
      case 'title':
        valResult = validateTitle(e.target.value)
        break
      case 'content':
        valResult = validateContent(e.target.value)
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

    const noticeData = {
      selectiveProcess_id: this.props.match.params.process_id,
      title: this.state.title,
      content: this.state.content,
      visible: this.state.visible,
      override: this.state.override
    }

    const valNotice = validateNoticeForm(noticeData)

    if (!valNotice.isValid) {
      this.setState({ errors: valNotice.errors })
    } else {
      this.props.createNotice(noticeData, () => {
        this.props.history.push(`/processes/${noticeData.selectiveProcess_id}`)
      })
    }
  }

  renderForm(errors) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Criar notícia</h4>
        </div>

        <div className="card-body">
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="text"
              name="title"
              label="Título: *"
              placeholder="Título"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
            />

            <TextAreaFieldGroup
              placeholder="Conteúdo"
              name="content"
              label="Conteúdo: *"
              value={this.state.content}
              onChange={this.onChange}
              error={errors.content}
              info="Mensagem para os candidatos em potencial."
            />

            <CheckBoxFieldGroup
              id="visible-checkbox"
              name="visible"
              text="Visibilidade:"
              value="Tornar visível para os usuários"
              checked={this.state.visible}
              error={errors.visible}
              info=""
              onChange={this.onCheck}
            />

            <CheckBoxFieldGroup
              id="override-checkbox"
              name="override"
              text="Sobreposição:"
              value="Sobrepor o conteúdo do sistema"
              checked={this.state.override}
              error={errors.override}
              info=""
              onChange={this.onCheck}
            />

            <input type="submit" className="btn btn-primary btn-block mt-4" />
          </form>
        </div>
      </div>
    )
  }

  onChange_ckeditor4 = event => {
    this.setState({ content: event.editor.getData() })
  }

  renderCKEditor4(errors) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">CKEditor4</h4>
        </div>

        <div className="card-body">
          <form noValidate onSubmit={this.onSubmit}>
            <TextAreaFieldCKEditor4
              placeholder="Conteúdo"
              name="content"
              label="Conteúdo: *"
              value={this.state.content}
              onChange={this.onChange_ckeditor4}
              error={errors.content}
              info="Mensagem para os candidatos em potencial."
            />
          </form>
        </div>
      </div>
    )
  }

  onChange_TinyMCE = event => {
    console.log('Content was updated:', event.target.getContent())
  }

  renderTinyMCE(errors) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">TinyMCE</h4>
        </div>

        <div className="card-body">
          <TextAreaFieldTinyMCE
            placeholder="Conteúdo"
            name="content"
            label="Conteúdo: *"
            value={this.state.content}
            onChange={this.onChange_TinyMCE}
            error={errors.content}
            info="Mensagem para os candidatos em potencial."
          />
        </div>
      </div>
    )
  }

  render() {
    const { errors } = this.state

    return (
      <div className="notice-create">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4">Testes</h1>
              <AlertError errors={this.props.errorStore} />
              {this.renderForm(errors)}
              {this.renderCKEditor4(errors)}
              {this.renderTinyMCE(errors)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Teste.proptypes = {
  createNotice: PropTypes.func.isRequired,
  errorStore: PropTypes.object.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  errorStore: state.errorStore
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(mapStateToProps, { createNotice, clearErrors })(withRouter(Teste))
