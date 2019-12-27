import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Spinner from 'components/common/Spinner'
import { getNotice, deleteNotice } from 'components/notice/noticeActions'
import AlertError from 'components/common/AlertError'
import { clearErrors } from 'actions/errorActions'
import { getProcess } from 'components/process/processActions'

class NoticeDelete extends Component {
  constructor() {
    super()
    this.state = { errors: [] }
    this.onSubmit = this.onSubmit.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.props.clearErrors()
    //get process if needed
    if (
      this.props.process === null ||
      typeof this.props.process === 'undefined' ||
      this.props.process.id !== this.props.match.params.process_id
    ) {
      this.props.getProcess(this.props.match.params.process_id)
    }
  }

  componentDidMount() {
    this.props.getNotice(this.props.match.params.notice_id)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //error handling
    if (nextProps.errors) {
      let errors = nextProps.errors
      this.setState({ errors: errors })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const { notice } = this.props
    this.props.deleteNotice(notice.id, () => {
      this.props.history.push(`/processes/${this.props.match.params.process_id}`)
    })
  }

  renderChoices() {
    return (
      <div className="row">
        <div className="col">
          <input type="button" value="Excluir" className="btn btn-primary btn-block mt-4" onClick={this.onSubmit} />
        </div>
        <div className="col">
          <input
            type="button"
            value="Cancelar"
            className="btn btn-secondary btn-block mt-4"
            onClick={() => {
              this.props.history.goBack()
            }}
          />
        </div>
      </div>
    )
  }

  renderInfo(notice, loading) {
    if (notice === null || loading) {
      return <Spinner />
    }

    return (
      <div>
        <p>
          <strong>Título: </strong>
          {notice.title}
        </p>
        <p>
          <strong>Id: </strong>
          {notice.id}
        </p>

        {this.renderChoices()}
      </div>
    )
  }

  render() {
    const { notice, loading, errorStore } = this.props

    return (
      <div className="notice-delete">
        <div className="container">
          <div className="breadcrumb">
            <span>Você está em:</span>
            <Link to="/processes" className="breadcrumb-link">
              Processos Seletivos
            </Link>
            <i className="fas fa-greater-than"></i>
            <Link to={`/processes/${this.props.match.params.process_id}`} className="breadcrumb-link">
              {this.props.process
                ? `Edital ${this.props.process.number}/${this.props.process.year}`
                : 'Edital 000/0000'}
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>Excluir notícia</span>
          </div>

          <div className="form-container" id="main">
            <h1>Excluir notícia</h1>
            <AlertError errors={errorStore} />
            {this.renderInfo(notice, loading)}
          </div>
        </div>
      </div>
    )
  }
}

NoticeDelete.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getNotice: PropTypes.func.isRequired,
  deleteNotice: PropTypes.func.isRequired,
  notice: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  errorStore: PropTypes.object.isRequired
}

const loadNotice = (state, ownProps) => {
  const notices = state.noticeStore.notices.filter(notice => notice.id === ownProps.match.params.notice_id)
  if (notices.length > 0) {
    return notices[0]
  } else {
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  notice: loadNotice(state, ownProps),
  loading: state.noticeStore.loading,
  errorStore: state.errorStore,
  process: state.processStore.process
})

export default connect(mapStateToProps, {
  clearErrors,
  getNotice,
  deleteNotice,
  getProcess
})(NoticeDelete)
