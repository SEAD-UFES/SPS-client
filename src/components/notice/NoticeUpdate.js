import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import CheckBoxFieldGroup from '../common/CheckBoxFieldGroup'
import { validateNoticeForm, validateTitle, validateContent } from './validateNoticeForm'
import AlertError from 'components/common/AlertError'
import { getNotice, updateNotice } from './noticeActions'
import { clearErrors } from 'actions/errorActions'
import { isEmpty } from '../../validation'

class NoticeUpdate extends Component {
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

  componentWillMount() {
    this.props.clearErrors()
  }

  componentDidMount() {
    if (this.props.match.params.notice_id) {
      this.props.getNotice(this.props.match.params.notice_id)
    }
  }

  componentWillReceiveProps(nextProps) {
    //If receive errors from server
    if (nextProps.errorStore) {
      let errorStore = nextProps.errorStore
      if (errorStore.code === 'notices-01' && errorStore.data && errorStore.data.devMessage) {
        this.setState({ errors: errorStore.data.devMessage.errors })
      }
    }

    //load data on state
    if (isEmpty(nextProps.errorStore) && nextProps.noticeStore) {
      if (!nextProps.noticeStore.loading) {
        const notices = nextProps.noticeStore.notices.filter(notice => notice.id === this.props.match.params.notice_id)
        if (notices.length > 0) {
          const notice = notices[0]
          this.setState(notice)
        }
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
      id: this.props.match.params.notice_id,
      selectiveProcess_id: this.props.match.params.process_id,
      title: this.state.title,
      content: this.state.content,
      visible: this.state.visible,
      override: this.state.override
    }

    const valNotice = validateNoticeForm(noticeData, this.props.match.params.process_id)

    if (!valNotice.isValid) {
      this.setState({ errors: valNotice.errors })
    } else {
      this.props.updateNotice(noticeData, () => {
        this.props.history.push(`/processes/${noticeData.selectiveProcess_id}`)
      })
    }
  }

  renderForm(errors) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Editar notícia</h4>
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
              value="Tornar processo visível"
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

            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    )
  }

  render() {
    const { errors } = this.state

    return (
      <div className="notice-update">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4">Notícia</h1>
              <AlertError errors={this.props.errorStore} />
              {this.renderForm(errors)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NoticeUpdate.proptypes = {
  getNotice: PropTypes.func.isRequired,
  updateNotice: PropTypes.func.isRequired,
  errorStore: PropTypes.object.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  noticeStore: state.noticeStore,
  errorStore: state.errorStore
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { getNotice, updateNotice, clearErrors }
)(withRouter(NoticeUpdate))
