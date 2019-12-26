import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import CheckBoxFieldGroup from '../common/CheckBoxFieldGroup'
import { validateNoticeForm, validateTitle, validateContent } from './validateNoticeForm'
import AlertError from 'components/common/AlertError'
import { getNotice, updateNotice } from './noticeActions'
import { clearErrors } from 'actions/errorActions'
import { isEmpty } from '../../validation'

// import TextAreaFieldTinyMCE from 'components/common/TextAreaFieldTinyMCE'
import TextAreaFieldGroup from 'components/common/TextAreaFieldGroup'

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

  UNSAFE_componentWillMount() {
    this.props.clearErrors()
  }

  componentDidMount() {
    if (this.props.match.params.notice_id) {
      this.props.getNotice(this.props.match.params.notice_id)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
          this.setState({ ...notice })
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

  onChange_TinyMCE = event => {
    const value = event.target.getContent()
    let errors = this.state.errors
    let valResult = validateContent(value)

    if (!valResult.isValid) {
      errors = { ...errors, content: valResult.error }
    } else {
      delete errors.content
    }

    this.setState({ content: value, errors: errors })
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
      <form noValidate onSubmit={this.onSubmit}>
        <TextFieldGroup
          type="text"
          name="title"
          label="Título"
          value={this.state.title}
          onChange={this.onChange}
          error={errors.title}
        />

        <TextAreaFieldGroup
          name="content"
          label="Conteúdo"
          value={this.state.content}
          onChange={this.onChange}
          error={errors.content}
          info="Mensagem para os candidatos em potencial"
        />

        {/* <TextAreaFieldTinyMCE
          placeholder="Conteúdo"
          name="content"
          label="Conteúdo"
          value={this.state.content}
          onChange={this.onChange_TinyMCE}
          error={errors.content}
          info="Mensagem para os candidatos em potencial."
        /> */}

        <CheckBoxFieldGroup
          id="visible-checkbox"
          name="visible"
          text="Visibilidade"
          value="Tornar visível para os usuários"
          checked={this.state.visible}
          error={errors.visible}
          info=""
          onChange={this.onCheck}
        />

        <CheckBoxFieldGroup
          id="override-checkbox"
          name="override"
          text="Sobreposição"
          value="Sobrepor o conteúdo do sistema"
          checked={this.state.override}
          error={errors.override}
          info=""
          onChange={this.onCheck}
        />

        <input type="submit" className="btn btn-primary" value="Editar" />
      </form>
    )
  }

  render() {
    const { errors } = this.state

    return (
      <div className="notice-update">
        <div className="container">
          <div className="breadcrumb">
            <span>Você está em:</span>
            <Link to="/processes" className="breadcrumb-link">
              Processos Seletivos
            </Link>
            <i className="fas fa-greater-than"></i>
            <Link to={`/processes/${this.props.match.params.process_id}`} className="breadcrumb-link">
              Edital XXX/XXXX
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>Editar notícia</span>
          </div>

          <div className="form-container" id="main">
            <h1>Editar notícia</h1>
            <AlertError errors={this.props.errorStore} />
            {this.renderForm(errors)}
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
export default connect(mapStateToProps, { getNotice, updateNotice, clearErrors })(withRouter(NoticeUpdate))
