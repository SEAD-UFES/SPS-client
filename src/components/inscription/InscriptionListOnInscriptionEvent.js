/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { checkNested } from '../../utils/objectHelpers'

const InscriptionListOnInscriptionEvent = props => {
  const { course_id, iEvent, inscriptions } = props

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

  const renderInscriptionList = (inscriptions, course_id) => {
    return (
      <div>
        {inscriptions && inscriptions.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Número</span>
              <span>Data</span>
              <span>Vaga</span>
              <span />
            </div>
            {inscriptions.map(ins => {
              return (
                <li key={ins.id}>
                  <h3>{ins.number}</h3>
                  <p>{ins.createdAt}</p>
                  <p>
                    {checkNested(ins, 'vacancy', 'assignment', 'name') ? `${ins.vacancy.assignment.name}` : ''}
                    {checkNested(ins, 'vacancy', 'region', 'name') ? ` - ${ins.vacancy.region.name}` : ' - sem região'}
                    {checkNested(ins, 'vacancy', 'restriction', 'name')
                      ? ` - ${ins.vacancy.restriction.name}`
                      : '- sem restrição'}
                  </p>
                  <p className='text-right'>
                    <Link className='btn-icon' to={`/inscription/delete/${ins.id}`}>
                      <i className='fas fa-trash' />
                    </Link>
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
      <h4>Lista de inscritos</h4>
      {renderCreateButton(iEvent)}
      {renderInscriptionList(inscriptions, course_id)}
    </section>
  )
}

export default InscriptionListOnInscriptionEvent
