/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import DrawFilter from '../profile/DrawFilter'
import AlertError from 'components/common/AlertError'
import Spinner from '../common/Spinner'
import CallListOnProcess from '../call/CallListOnProcess'
import PublicationCard from 'components/publication/PublicationCard'

const ProcessRead = props => {
  const { location } = props
  //   const { process, call, errorStore } = props

  //dummy
  const process = null
  const loading = null
  const errorStore = {}

  const renderBreadcrumb = process => {
    return (
      <>
        <div className='breadcrumb'>
          <span>Você está em:</span>
          <Link to='/processes' className='breadcrumb-link'>
            Processos Seletivos
          </Link>

          <i className='fas fa-greater-than' />
          <Link to={`/processes2/read/${process ? process.id : null}`} className='breadcrumb-link'>
            {process ? `Edital ${process.number}/${process.year}` : 'Edital'}
          </Link>
        </div>
      </>
    )
  }

  const renderTitle = process => {
    return <h1>Edital {process ? `${process.number}/${process.year}` : null}</h1>
  }

  const renderUpdateButton = (process, location) => {
    return (
      <div className='btn-right'>
        <DrawFilter permission='selectiveprocess_update' course_id={process ? process.course_id : null}>
          <Link
            className='btn btn-primary'
            to={{
              pathname: `/process/update/${process ? process.id : null}`,
              prevLocation: location
            }}>
            <i className='fas fa-cog' /> Editar
          </Link>
        </DrawFilter>
      </div>
    )
  }

  const renderInfo = (process, loading) => {
    if (process === null || loading) {
      return <Spinner />
    }

    return (
      <section id='info'>
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

          <DrawFilter permission='selectiveprocess_create' course_id={process.Course.id}>
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

  const renderPublications = (process, loading) => {
    if (process === null || loading) {
      return <Spinner />
    }
    return <PublicationCard process={process} course_id={process.course_id} />
  }

  const renderCalls = (process, loading) => {
    if (process === null || loading) {
      return <Spinner />
    }
    return <CallListOnProcess process={process} course_id={process.course_id} />
  }

  return (
    <div className='process-view'>
      <div className='container'>
        {renderBreadcrumb(process)}
        <div className='main'>
          {renderTitle(process)}
          {renderUpdateButton(process, location)}
          <AlertError errors={errorStore} />
          {renderInfo(process)}
          {renderPublications(process, loading)}
          {renderCalls(process, loading)}
        </div>
      </div>
    </div>
  )
}

export default ProcessRead
