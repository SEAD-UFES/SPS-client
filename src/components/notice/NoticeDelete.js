import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Spinner from 'components/common/Spinner'
import { getNotice, deleteNotice } from 'components/notice/noticeActions'
import AlertError from 'components/common/AlertError'
import { clearErrors } from 'actions/errorActions'

class NoticeDelete extends Component {
  constructor() {
    super()
    this.state = { errors: [] }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {
    this.props.clearErrors()
  }

  componentDidMount() {
    this.props.getNotice(this.props.match.params.notice_id)
  }

  componentWillReceiveProps(nextProps) {
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
          <input type="button" value="Excluir" className="btn btn-danger btn-block mt-4" onClick={this.onSubmit} />
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
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Excluir notícia</h4>
        </div>
        <div className="card-body">
          <table className="table table-hover mb-0">
            <tbody>
              <tr>
                <td>
                  <strong>Id:</strong>
                </td>
                <td>{notice.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Título:</strong>
                </td>
                <td>{notice.title}</td>
              </tr>
            </tbody>
          </table>
          {this.renderChoices()}
        </div>
      </div>
    )
  }

  render() {
    const { notice, loading, errorStore } = this.props

    return (
      <div className="notice-delete">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4">Notícia</h1>
              <AlertError errors={errorStore} />
              {this.renderInfo(notice, loading)}
            </div>
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
  errorStore: state.errorStore
})

export default connect(
  mapStateToProps,
  {
    clearErrors,
    getNotice,
    deleteNotice
  }
)(NoticeDelete)
