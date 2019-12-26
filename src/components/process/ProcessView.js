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

  renderProcessEdit(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }

    return (
      <div className="btn-right">
        <DrawFilter permission="selectiveprocess_update" course_id={process.Course.id}>
          <Link className="btn btn-primary" to={`/processes/${process.id}/edit`}>
            <i className="fas fa-cog" /> Editar
          </Link>
        </DrawFilter>
      </div>
    )
  }

  renderInfoTable(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }

    return (
      <section id="info">
        <div>
          <p>{process.description}</p>
        </div>

        <div>
          <p>
            <strong>Nível: </strong>
            {process.Course.GraduationType.name}
          </p>

          <p>
            <strong>Curso: </strong>
            {process.Course.name}
          </p>

          <DrawFilter permission="selectiveprocess_create" course_id={process.Course.id}>
            <p>
              <strong>Visibilidade: </strong>
              {process.visible ? 'Processo visível' : 'Processo oculto'}
            </p>
          </DrawFilter>

          <p>
            <strong>Atribuições: </strong>
            {process.Assignments.length > 0
              ? process.Assignments.map((assignment, key) => {
                  if (key === 0) {
                    return assignment.name
                  } else {
                    return `, ${assignment.name}`
                  }
                })
              : 'Atribuições não definidas'}
          </p>
        </div>
      </section>
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
      <div className="process-view">
        <div className="container">
          <div className="breadcrumb">
            <span>Você está em:</span>
            <Link to="/processes" className="breadcrumb-link">
              Processos Seletivos
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>{this.renderProcessName(process, loading)}</span>
          </div>

          <div id="main">
            <h1>{this.renderProcessName(process, loading)}</h1>
            {this.renderProcessEdit(process, loading)}
            {this.renderInfoTable(process, loading)}
            {this.renderNoticeCard(noticeStore, processStore)}
            {this.renderOther(noticeStore, processStore)}
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
