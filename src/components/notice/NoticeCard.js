import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import DrawFilter from '../profile/DrawFilter'
import Spinner from 'components/common/Spinner'

class NoticeCard extends Component {
  renderNotice(noticeStore, processStore) {
    if (noticeStore.notices === null || noticeStore.loading || processStore.process === null || processStore.loading) {
      return <Spinner />
    }

    const notices = noticeStore.notices.filter(notice => notice.selectiveProcess_id === processStore.process.id)

    const renderOptions = notices => {
      if (notices.length > 0) {
        return (
          <React.Fragment>
            <DrawFilter permission="notice_update" course_id={processStore.process.Course.id}>
              <Link className="text-info" to={`/processes/${processStore.process.id}/notices/${notices[0].id}/update`}>
                <i className="fas fa-cog" /> Editar
              </Link>
            </DrawFilter>
            <DrawFilter permission="notice_delete" course_id={processStore.process.Course.id}>
              {' '}
              <Link
                className="text-danger"
                to={`/processes/${processStore.process.id}/notices/${notices[0].id}/delete`}>
                <i className="fas fa-times-circle" /> Excluir
              </Link>
            </DrawFilter>
          </React.Fragment>
        )
      } else {
        return (
          <DrawFilter permission="notice_create" course_id={processStore.process.Course.id}>
            <Link className="text-success" to={`/processes/${processStore.process.id}/notices/create`}>
              <i className="fas fa-plus-circle" /> Adicionar
            </Link>
          </DrawFilter>
        )
      }
    }

    const renderTitle = notices => {
      if (notices.length > 0) {
        return notices[0].title
      } else {
        return 'Notícia'
      }
    }

    const renderBody = notices => {
      if (notices.length > 0) {
        return notices[0].content
      } else {
        return 'Sem notícia para exibir.'
      }
    }

    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">{renderTitle(notices)}</h4>
            </div>
            <div className="col">
              <div className="float-right">{renderOptions(notices)}</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <span dangerouslySetInnerHTML={{ __html: renderBody(notices) }} />
        </div>
      </div>
    )
  }

  render() {
    return this.renderNotice(this.props.noticeStore, this.props.processStore)
  }
}

export default NoticeCard