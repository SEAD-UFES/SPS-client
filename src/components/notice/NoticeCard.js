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
              <Link
                className="icon-edit"
                to={`/processes/${processStore.process.id}/notices/${notices[0].id}/update`}>
                <i class="fas fa-pencil-alt"></i>
              </Link>
            </DrawFilter>
            <DrawFilter permission="notice_delete" course_id={processStore.process.Course.id}>
              {' '}
              <Link
                className="icon-delete"
                to={`/processes/${processStore.process.id}/notices/${notices[0].id}/delete`}>
                <i class="fas fa-trash"></i>
              </Link>
            </DrawFilter>
          </React.Fragment>
        )
      } else {
        return (
          <DrawFilter permission="notice_create" course_id={processStore.process.Course.id}>
            <Link className="btn btn-add" to={`/processes/${processStore.process.id}/notices/create`}>
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
      <section class="quadro">
        <h4>{renderTitle(notices)}</h4>
        <div className="admin-buttons">{renderOptions(notices)}</div>

        <div>
          <span dangerouslySetInnerHTML={{ __html: renderBody(notices) }} />
        </div>
      </section>
    )
  }

  render() {
    return this.renderNotice(this.props.noticeStore, this.props.processStore)
  }
}

export default NoticeCard
