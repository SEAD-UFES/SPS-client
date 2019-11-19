import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getProcess } from './processActions'
import { getNoticeList } from 'components/notice/noticeActions'
import Spinner from '../common/Spinner'
import DrawFilter from '../profile/DrawFilter'
import CallCard from 'components/call/CallCard'
import PublicationCard from 'components/publication/PublicationCard'
import NoticeCard from 'components/notice/NoticeCard'

class ProcessView extends Component {
  componentDidMount() {
    this.props.getProcess(this.props.match.params.id)
    this.props.getNoticeList({ selectiveProcess_id: this.props.match.params.id })
  }

  renderProcessName(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }

    return <React.Fragment>{`Edital ${process.number}/${process.year}`}</React.Fragment>
  }

  renderInfoTable(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }

    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Informações</h4>
            </div>
            <div className="col">
              <div className="text-right">
                <DrawFilter permission="selectiveprocess_update" course_id={process.Course.id}>
                  <Link className="text-primary" to={`/processes/${process.id}/edit`}>
                    <i className="fas fa-cog" /> Editar
                  </Link>
                </DrawFilter>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <table className="table table-hover mt-0 mb-0">
            <tbody>
              <tr>
                <td>
                  <strong>Nível:</strong>
                </td>
                <td>{process.Course.GraduationType.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Curso:</strong>
                </td>
                <td>{process.Course.name}</td>
              </tr>
              <DrawFilter permission="selectiveprocess_create" course_id={process.Course.id}>
                <tr>
                  <td>
                    <strong>Visibilidade:</strong>
                  </td>
                  <td>{process.visible ? 'Processo visível' : 'Processo oculto'}</td>
                </tr>
              </DrawFilter>
              <tr>
                <td>
                  <strong>Descrição:</strong>
                </td>
                <td>{process.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderCalls(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }
    return <CallCard process={process} course_id={process.id} />
  }

  renderPublications(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }
    return <PublicationCard process={process} course_id={process.id} />
  }

  renderNoticeCard(noticeStore, processStore) {
    if (noticeStore.notices === null || noticeStore.loading || processStore.process === null || processStore.loading) {
      return <Spinner />
    }

    const notices = noticeStore.notices.filter(notice => notice.selectiveProcess_id === processStore.process.id)
    const notice = notices.length > 0 ? notices[0] : null

    if (notice) {
      return <NoticeCard noticeStore={noticeStore} processStore={processStore} />
    } else {
      return (
        <DrawFilter permission="notice_read" course_id={processStore.process.Course.id}>
          <NoticeCard noticeStore={noticeStore} processStore={processStore} />
        </DrawFilter>
      )
    }
  }

  renderOther(noticeStore, processStore) {
    if (noticeStore.notices === null || noticeStore.loading || processStore.process === null || processStore.loading) {
      return <Spinner />
    }

    const notices = noticeStore.notices.filter(notice => notice.selectiveProcess_id === processStore.process.id)
    const notice = notices.length > 0 ? notices[0] : null

    if (notice) {
      if (notice.override) {
        return (
          <DrawFilter permission="notice_read" course_id={processStore.process.Course.id}>
            <React.Fragment>
              {this.renderPublications(processStore.process, processStore.loading)}
              {this.renderCalls(processStore.process, processStore.loading)}
            </React.Fragment>
          </DrawFilter>
        )
      } else {
        return (
          <React.Fragment>
            {this.renderPublications(processStore.process, processStore.loading)}
            {this.renderCalls(processStore.process, processStore.loading)}
          </React.Fragment>
        )
      }
    } else {
      return (
        <React.Fragment>
          {this.renderPublications(processStore.process, processStore.loading)}
          {this.renderCalls(processStore.process, processStore.loading)}
        </React.Fragment>
      )
    }
  }

  render() {
    const { process, loading } = this.props.processStore
    const processStore = this.props.processStore
    const noticeStore = this.props.noticeStore

    return (
      <div className="process-view" id="main">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/processes" className="btn btn-light">
                Voltar para lista de processos
              </Link>
              <h1 className="display-4"> {this.renderProcessName(process, loading)}</h1>
              {this.renderInfoTable(process, loading)}
              {this.renderNoticeCard(noticeStore, processStore)}
              {this.renderOther(noticeStore, processStore)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProcessView.propTypes = {
  getProcess: PropTypes.func.isRequired,
  processStore: PropTypes.object.isRequired,
  authStore: PropTypes.object.isRequired,
  getNoticeList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  processStore: state.processStore,
  authStore: state.authStore,
  noticeStore: state.noticeStore
})

export default connect(mapStateToProps, {
  getProcess,
  getNoticeList
})(ProcessView)
