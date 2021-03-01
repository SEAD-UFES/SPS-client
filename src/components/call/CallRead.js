/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import DrawFilter from '../profile/DrawFilter'
import { getCallStatus } from '../../utils/callHelpers'
import AlertError from 'components/common/AlertError'
import VacancyListOnCall from '../vacancy/VacancyListOnCall'
import CalendarListOnCall from '../calendar/CalendarListOnCall'

const CallRead = props => {
  const { location } = props
  const { process, call, errorStore } = props

  const renderBreadcrumb = (process, call) => {
    return (
      <>
        <div className='breadcrumb'>
          <span>Você está em:</span>
          <Link to='/processes' className='breadcrumb-link'>
            Processos Seletivos
          </Link>

          <i className='fas fa-greater-than' />
          <Link to={`/processes/read/${process ? process.id : null}`} className='breadcrumb-link'>
            {process ? `Edital ${process.number}/${process.year}` : 'Edital 000/0000'}
          </Link>

          <i className='fas fa-greater-than' />
          <span>{call ? `Chamada ${call.number}` : 'Chamada'}</span>
        </div>
      </>
    )
  }

  const renderTitle = call => {
    return <h1>Chamada {call ? call.number : null}</h1>
  }

  const renderUpdateButton = (process, call, location) => {
    return (
      <div className='btn-right'>
        <DrawFilter permission='call_update' course_id={process ? process.course_id : null}>
          <Link
            className='btn btn-primary'
            title='Atualizar chamada'
            to={{
              pathname: `/call/update/${call ? call.id : null}`,
              prevLocation: location
            }}>
            <i className='fas fa-cog' /> Atualizar
          </Link>
        </DrawFilter>
      </div>
    )
  }

  const renderInfo = call => {
    return (
      <section>
        <p>
          <strong>Abertura: </strong>
          {call ? moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss ').format('DD/MM/YYYY') : null}
        </p>
        <p>
          <strong>Encerramento: </strong>
          {call ? moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss ').format('DD/MM/YYYY') : null}
        </p>
        <p>
          <strong>Status: </strong>
          {getCallStatus(call)}
        </p>
      </section>
    )
  }

  const renderCalendars = (process, call) => {
    return (
      <CalendarListOnCall
        call={call ? call : null}
        process_id={process ? process.id : null}
        course_id={process ? process.course_id : null}
      />
    )
  }

  const renderVacancies = (process, call) => {
    return (
      <VacancyListOnCall
        call={call ? call : null}
        process_id={process ? process.id : null}
        course_id={process ? process.course_id : null}
      />
    )
  }

  return (
    <div className='view-page'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='main'>
          {renderTitle(call)}
          {renderUpdateButton(process, call, location)}
          <AlertError errors={errorStore} />
          {renderInfo(call)}
          {renderCalendars(process, call)}
          {renderVacancies(process, call)}
        </div>
      </div>
    </div>
  )
}

export default CallRead
