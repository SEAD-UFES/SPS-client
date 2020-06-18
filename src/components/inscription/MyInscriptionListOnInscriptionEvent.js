/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import DrawFilter from '../../components/profile/DrawFilter'
import { checkNested } from '../../utils/objectHelpers'

const MyInscriptionListOnInscriptionEvent = props => {
  const { calendar, course_id, iEvent } = props

  const renderCreateButton = iEvent => {
    return (
      <div className='btn-right'>
        <Link
          className='btn btn-terciary'
          to={`/inscription-event/read/${iEvent ? iEvent.id : null}/inscription/create`}>
          <i className='fas fa-plus-circle' /> Inscrever-se
        </Link>
      </div>
    )
  }

  const renderMyInscriptionList = (calendar, course_id) => {
    return (
      <div>
        {checkNested(calendar, 'inscriptionEvents') && calendar.inscriptionEvents.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Número</span>
              <span>Data</span>
              <span>Vaga</span>
              <span />
            </div>
            {calendar.inscriptionEvents.map(IE => {
              return (
                <li key={IE.id}>
                  <h3>000</h3>
                  <p>00/00/0000</p>
                  <p>xxxx - yyyy - zzzz</p>
                  <p className='text-right'>
                    <DrawFilter permission='inscriptionevent_read' course_id={course_id}>
                      <Link className='btn-icon laranja' to={`/inscription-event/read/${IE.id}`}>
                        <i className='fas fa-eye' />
                      </Link>
                    </DrawFilter>{' '}
                    <DrawFilter permission='inscriptionevent_delete' course_id={course_id}>
                      <Link className='btn-icon' to={`/inscription-event/delete/${IE.id}`}>
                        <i className='fas fa-trash' />
                      </Link>
                    </DrawFilter>
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className='mb-0'>Você não tem inscrições cadastradas.</p>
        )}
      </div>
    )
  }

  return (
    <section id='inscriptionEvents' className='quadro'>
      <h4>Minhas inscrições</h4>
      {renderCreateButton(iEvent)}
      {renderMyInscriptionList(calendar, course_id)}
    </section>
  )
}

export default MyInscriptionListOnInscriptionEvent
